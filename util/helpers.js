'use strict';

/*
 * Mostly taken from lodash.
 *
 * @module Basics/Helpers
 * @static
 * @memberof module:Basics
 */
var Helpers = {};

// Lang helpers

/*
 * See https://lodash.com/docs#isEqual
 * @method isEqual
 */
Helpers.isEqual = require('lodash/isEqual');
/*
 * See https://lodash.com/docs#isObject
 * @method isObject
 */
Helpers.isObject = require('lodash/isObject');
/*
 * See https://lodash.com/docs#isArray
 * @method isArray
 */
Helpers.isArray = require('lodash/isArray');
/*
 * See https://lodash.com/docs#isString
 * @method isString
 */
Helpers.isString = require('lodash/isString');
/*
 * See https://lodash.com/docs#isNumber
 * @method isNumber
 */
Helpers.isNumber = require('lodash/isNumber');
/*
 * See https://lodash.com/docs#isBoolean
 * @method isBoolean
 */
Helpers.isBoolean = require('lodash/isBoolean');
/*
 * See https://lodash.com/docs#isFunction
 * @method isFunction
 */
Helpers.isFunction = require('lodash/isFunction');
/*
 * See https://lodash.com/docs#cloneDeep
 * @method cloneDeep
 */
Helpers.cloneDeep = require('lodash/cloneDeep');

/*
 * See https://lodash.com/docs#clone
 * @method clone
 */
Helpers.clone = require('lodash/clone');

/*
 * See https://lodash.com/docs#isEmpty
 * @method isEmpty
 */
Helpers.isEmpty = require('lodash/isEmpty');

// Function helpers

/*
 * See https://lodash.com/docs#bind
 * @method bind
 */
Helpers.bind = require('lodash/bind');
/*
 * See https://lodash.com/docs#delay
 * @method delay
 */
Helpers.delay = require('lodash/delay');
/*
 * See https://lodash.com/docs#debounce
 * @method debounce
 */
Helpers.debounce = require('lodash/debounce');

// Object helpers

/*
 * See https://lodash.com/docs#extend
 * @method extend
 */
Helpers.extend = require('lodash/extend');
/*
 * See https://lodash.com/docs#omit
 * @method omit
 */
Helpers.omit = require('lodash/omit');
/*
 * See https://lodash.com/docs#values
 * @method values
 */
Helpers.values = require('lodash/values');

// Array helpers

/*
 * See https://lodash.com/docs#last
 * @method last
 */
Helpers.last = require('lodash/last');
/*
 * See https://lodash.com/docs#head
 */
Helpers.first = require('lodash/head');
/*
 * See https://lodash.com/docs#compact
 * @method compact
 */
Helpers.compact = require('lodash/compact');
/*
 * See https://lodash.com/docs#uniq
 * @method uniq
 */
Helpers.uniq = require('lodash/uniq');
/*
 * See https://lodash.com/docs#intersection
 * @method intersection
 */
Helpers.intersection = require('lodash/intersection');
/*
 * See https://lodash.com/docs#union
 * @method union
 */
Helpers.union = require('lodash/union');
/*
 * See https://lodash.com/docs#without
 * @method without
 */
Helpers.without = require('lodash/without');

// Collection helpers

/*
 * See https://lodash.com/docs#each
 * @method each
 */
Helpers.each = require('lodash/forEach');
/*
 * See https://lodash.com/docs#filter
 * @method filter
 */
Helpers.filter = require('lodash/filter');
/*
 * See https://lodash.com/docs#includes
 * @method includes
 */
Helpers.includes = require('lodash/includes');
/*
 * See https://lodash.com/docs#find
 * @method find
 */
Helpers.find = require('lodash/find');
/*
 * See https://lodash.com/docs#map
 * @method map
 */
Helpers.map = require('lodash/map');
/*
 * See https://lodash.com/docs#sortBy
 * @method sortBy
 */
Helpers.sortBy = require('lodash/sortBy');

// String helpers

/*
 * See https://lodash.com/docs#capitalize
 * @method capitalize
 */
Helpers.capitalize = require('lodash/capitalize');

/*
 * Removes all occurrence of value in array using Array.splice
 * I.e., this changes the array instead of creating a new one
 * as _.without() does.
 *
 * @method deleteFromArray
 * @param {Array} array
 * @param value
 */
Helpers.deleteFromArray = require('./deleteFromArray');

/*
 * Alias for {{#crossLink "Helpers/cloneDeep:method"}}{{/crossLink}}.
 * @method deepClone
 */
Helpers.deepclone = Helpers.cloneDeep;

Helpers.uuid = require('./uuid');

Helpers.request = require('./request');

module.exports = Helpers;
