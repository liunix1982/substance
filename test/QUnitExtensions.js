'use strict';

var inBrowser = require('../util/inBrowser');
var isEmpty = require('lodash/isEmpty');
var platform = require('../util/platform');

QUnit.assert.fail = function(msg) {
  this.push(false, false, true, msg);
};

QUnit.assert.isEmpty = function(a, msg) {
  this.push(isEmpty(a), false, true, msg);
};

QUnit.assert.isNullOrUndefined = function(a, msg) {
  this.push((a === null)||(a === undefined), false, true, msg);
};

QUnit.assert.isDefinedAndNotNull = function(a, msg) {
  this.push((a !== null)&&(a !== undefined), false, true, msg);
};

// NOTE: this is a shim, that makes sure that the qunit container is
// present, which was not the case when run in karma.
QUnit.uiModule = function(name, hooks) {
  hooks = hooks || {};
  if (inBrowser) {
    var __beforeEach__ = hooks.beforeEach;
    hooks.beforeEach = function(assert) {
      if (!window.document.querySelector('#qunit-fixture')) {
        var fixtureElement = window.document.createElement('div');
        fixtureElement.id = "qunit-fixture";
        window.document.querySelector('body').appendChild(fixtureElement);
      }
      var testEl = window.document.getElementById('qunit-test-output-'+assert.test.testId)
      if (testEl) {
        var assertList = testEl.querySelector('.qunit-assert-list');
        var sandbox = window.document.createElement('div')
        sandbox.className = "sandbox";
        testEl.insertBefore(sandbox, assertList);
        assert.test.sandbox = sandbox;
      }
      if (__beforeEach__) {
        __beforeEach__();
      }
    };
    var __afterEach__ = hooks.__afterEach__;
    hooks.afterEach = function(assert) {
      var sandboxEl = assert.test.sandbox;
      if (sandboxEl) {
        sandboxEl.parentNode.removeChild(sandboxEl);
      }
      if (__afterEach__) {
        __afterEach__();
      }
    };
  }
  QUnit.module(name, hooks);
};

QUnit.browserTest = function() {
  if (inBrowser) {
    QUnit.test.apply(QUnit.test, arguments);
  }
};

QUnit.uiTest = QUnit.browserTest;

QUnit.firefoxTest = function() {
  if (inBrowser && platform.isFF) {
    QUnit.test.apply(QUnit.test, arguments);
  }
};

QUnit.webkitTest = function() {
  if (inBrowser && platform.isWebkit) {
    QUnit.test.apply(QUnit.test, arguments);
  }
};


if (inBrowser) {
  // log errors into the console because there source maps are considered
  QUnit.log(function(details) {
    if (details.message && /(Error|Died on)/.exec(details.message)) {
      console.error(details.message);
    }
  });

  QUnit.setDOMSelection = function(startNode, startOffset, endNode, endOffset) {
    var sel = window.getSelection();
    var range = window.document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    sel.removeAllRanges();
    sel.addRange(range);
  };
}
