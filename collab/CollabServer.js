'use strict';

var Server = require('./server');
var CollabEngine = require('CollabEngine');

/*
  Implements Substance CollabServer API.
*/
function CollabServer(config) {
  CollabServer.super.apply(this, arguments);

  this.backend = config.backend;
  this.collabEngine = new CollabEngine();
}

CollabServer.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this.onDisconnect = function(collaboratorId) {
    // All documents collaborator is currently collaborating to
    var documentIds = this.collabEngine.getDocumentIds(collaboratorId);
    documentIds.forEach(function(documentId) {
      var collaboratorIds = this.collabEngine.getCollaboratorIds(documentId, collaboratorIds);
      this.broadCast(collaboratorIds, {
        type: 'collaboratorDisconnected',
        collaboratorId: collaboratorId
      });
      // Exit from each document session
      this.collabEngine.exit({
        documentId: documentId,
        collaboratorId: collaboratorId
      });
    }.bind(this));
  };

  /*
    Checks for authentication based on message.sessionToken
  */
  this.authenticate = function(req, res) {
    this.backend.getSession(req.message.sessionToken, function(err, userSession) {
      if (err) {
        res.error(new Error('Not authenticated'));
      } else {
        req.setAuthenticated(userSession);
      }
      this.next(req, res);
    });
  };

  /*
    Override send method to give messages a unique scope
  */
  this.send = function(collaboratorId, message) {
    message.scope = 'hub';
    _super.send.call(this, collaboratorId, message);
  };

  /*
    Execute CollabServer API method based on msg.type
  */
  this.execute = function(req, res) {
    var msg = req.message;
    this[msg.type](req, res);
  };

  /*
    Enter a collab session
  */
  this.enter = function(req, res) {
    var args = req.message;

    this.collabEngine.enter(args, function(err, result) {
      // result: changes, version, change
      if (err) {
        res.error(err);
      } else {
        var collaboratorIds = this.collabEngine.getCollaboratorIds(args.documentId);
        var collaborators = this.collabEngine.getCollaborators(args.documentId);

        // We need to broadcast a new change if there is one
        if (result.change) {
          this.broadCast(collaboratorIds, {
            type: 'update',
            version: result.version,
            change: result.change,
            collaboratorId: args.collaboratorId,
            documentId: args.documentId
          });
        }

        // Notify others that there is a new collaborator
        this.broadCast(collaboratorIds, {
          type: 'collaboratorEntered',
          collaborator: {
            selection: null,
            collaboratorId: args.collaboratorId
          }
        });
        
        // Send the response
        res.send({
          type: 'enterDone',
          version: result.version,
          changes: result.changes,
          collaborators: collaborators
        });
      }
      this.next(req, res);
    }.bind(this));
  };

  /*
    Exit collab session
  */
  this.exit = function(req, res) {
    var args = req.message;
    this.collabEngine.exit({
      collaboratorId: args.collaboratorId,
      documentId: args.documentId
    }, function(err) {
      if (err) {
        res.error(err);
      }
      // Notify client that exit has completed successfully
      res.send({
        type: 'exitDone'
      });
    }.bind(this));
  };

  /*
    Clients send a commit. Change will be applied on server and rebased
    if needed. Then the client 
  */
  this.commit = function(req, res) {
    var args = req.message;

    this.collabEngine.commit(args, function(err, result) {
      // result has changes, version, change
      if (err) {
        res.error(err);
      } else {
        var collaboratorIds = this.collabEngine.getCollaboratorIds(args.documentId);

        // We need to broadcast the change to all collaborators
        this.broadCast(collaboratorIds, {
          type: 'update',
          version: result.version,
          change: result.change,
          collaboratorId: args.collaboratorId,
          documentId: args.documentId
        });

        // confirm the new commit, providing the diff (changes) since last common version
        res.send({
          type: 'commitDone',
          version: result.version,
          changes: result.changes          
        });
      }
      this.next(req, res);
    }.bind(this));
  };
};

Server.extend(CollabServer);
module.exports = CollabServer;
