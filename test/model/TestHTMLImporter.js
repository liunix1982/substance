'use strict';

var HTMLImporter = require('../../model/HTMLImporter');
var schema = require('./TestSchema');
var TestArticle = require('./TestArticle');

var converters = [
  require('../../packages/paragraph/ParagraphHTMLConverter'),
  require('../../packages/heading/HeadingHTMLConverter'),
  require('../../packages/emphasis/EmphasisHTMLConverter'),
  require('../../packages/strong/StrongHTMLConverter'),
  require('../../packages/link/LinkHTMLConverter'),
  // require('../../packages/table/TableHTMLConverter'),
  // require('../../packages/table/TableSectionHTMLConverter'),
  // require('../../packages/table/TableRowHTMLConverter'),
  // require('../../packages/table/TableCellHTMLConverter'),
  require('../../packages/list/ListHTMLConverter'),
  require('../../packages/list/ListItemHTMLConverter'),
];

function TestHTMLImporter() {
  TestHTMLImporter.super.call(this, {
    schema: schema,
    converters: converters,
    DocumentClass: TestArticle
  });
}

HTMLImporter.extend(TestHTMLImporter, function() {

  this.convertDocument = function(documentEl) {
    var bodyEl = documentEl.find('body');
    this.convertContainer(bodyEl.children, 'main');
  };

});

TestHTMLImporter.converters = converters;

module.exports = TestHTMLImporter;