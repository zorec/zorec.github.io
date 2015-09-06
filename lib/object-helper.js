/*
"Exports" of this module:
 - objectHelper
*/

var objectHelper = {
  // accepts an array of objects whose prototypes are chained chained
  // every object inherits from all preceeding ones
  chainObjects: function(objects) {
    // first object inherits nothing
    var previousPrototype = null;
    for (var i = 0, l = objects.length; i < l; i ++) {
      Object.setPrototypeOf(objects[i], previousPrototype);
      previousPrototype = objects[i];
    }
  },
  PROPERTIES: "abcdefghijklmnopqrstuvwxyz",
  MAX_PROPERTIES_COUNT: 6,
  MAX_VALUE: 100,
  OBJECTS_COUNT: 3,
  randomObjects: function(count) {
    var l = count || this.OBJECTS_COUNT,
      arr = [];
    for (var i = 0; i < l; i ++) {
      arr.push(this.randomObject());
    }
    return arr;
  },
  randomObject: function() {
    // random number 0-6
    var maxPropertiesCount = this.randomNumber(this.MAX_PROPERTIES_COUNT, 1),
      propertiesCount = this.PROPERTIES.length - 1,
      randomObject = {}, randomProperty, randomValue;
    for (var i = 0; i < maxPropertiesCount; i ++) {
      randomProperty = this.PROPERTIES[this.randomNumber(propertiesCount)];
      randomValue = this.randomNumber(this.MAX_VALUE);
      randomObject[randomProperty] = randomValue;
    }
    return randomObject;
  },
  randomNumber(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  deepCopy: function(obj) {
    var deepCopy = {};
    // accessible properties on each object
    for (var prop in obj) {
      deepCopy[prop] = obj[prop];
    }
    return deepCopy;
  },
  isValidPrototype: function (obj, newPrototype) {
    var backupPrototype = Object.getPrototypeOf(obj),
      isValid = true;

    try {
      Object.setPrototypeOf(obj, newPrototype);
    }
    catch (err) {
      // probably cycle in prototype chain
      isValid = false;
    }

    Object.setPrototypeOf(obj, backupPrototype);
    return isValid;
  }
}

// USAGE OF MODULE:
/*
var globalBlock = {a: 'global block'},
  functionBlock = {a: 'function block', b: 'inside whole function block'},
  lastBlock = {a: 'immediately invoked function', c: 'only last block'};

var items = [globalBlock, functionBlock, lastBlock];
objectHelper.chainObjects(items);
*/
