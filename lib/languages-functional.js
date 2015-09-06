"use strict";

/*
"Exports" of this module:
 - languageF
 - jsF
 - rubyF
*/

/**
 OO CONCEPT: INHERITANCE (functional pattern)
  As described by Douglas Crockford, functional pattern of inheritance uses simple functions,
  not constructor functions, which require use of new operator
  That's why functional pattern can be combined with functional fea/tures of JavaScript.
  Another advantage is encapsulation (see below). The object is created in function and returned.
  This pattern can be combined with other inheritance patterns that's why it is the most flexible pattern of inheritance.

  In this example, when languageF is called it returns new language object, which is augemented in rubyF and jsF.
  One may argue, that it is not real form of inheritance because changes done to the languageF are not reflected to
  already created objects.
*/

var languageF = function(name) {
  /**
   OO CONCEPT: ENCAPSULATION

   In all other inheritance patterns, name is an accessible property on object and could be
   manipulated by other objects, which breaks encapsulation.

   This is the only pattern that promotes information hidding so that internal details (e.g. how are data stored - lowercase / uppercase)
   can be changed without affecting other objects as long as the interface remains unchanged.
   The way, it is done is that any private variables created within this function (in this case only variable name)
   are not visible from outside.

  */


  var that = {};

  that.getName = function() {
    return name;
  };

  that.snippet = function(objects) {
    return that.blocksSnippet(this.objects2blocks(objects));
  };

  that.objects2blocks = function(objects) {
    var blocks = [],
      topLevelBlocks,
      currentBlock,
      self = this,
      value;
    // build linear blocks without hierarchy
    blocks = objects.map(function(obj) {
      return {
        ref: obj,
        parentBlockIndex: objects.indexOf(Object.getPrototypeOf(obj)),
        variables: Object.keys(obj).map(function(varName) {
          value = obj[varName];
          if (typeof value === 'string') {
            value = '"' + value + '"';
          }
          return self.variable(varName, value);
        }),
        children: []
      };
    });

    // build children relationships
    for (var i = 0, l = blocks.length; i < l; i ++) {
      currentBlock = blocks[i];
      if (currentBlock.parentBlockIndex === -1) {
        continue;
      }
      blocks[currentBlock.parentBlockIndex].children.push(currentBlock);
    }

    topLevelBlocks = blocks.filter(function(block) {
      return block.parentBlockIndex === -1;
    });

    return topLevelBlocks;
  };

  that.blocksSnippet = function(blocks, prefix) {
    var self = this;
    prefix = prefix || '';
    var oldPrefix = prefix;
    prefix += '  ';
    return blocks.map(function(currentBlock) {
      var blockCode = self.block(function() {
        // join variables with children blocks if present
        if (currentBlock.children.length) {
          currentBlock.variables = currentBlock.variables.concat(
            self.blocksSnippet(currentBlock.children, prefix)
          );
        }
        return currentBlock.variables.map(function(line) {
          return prefix + line;
        }).join('\n');
      });
      // NOTE: what about languages like Python which does not have ending mark?
      // if (lastElement[0] != ' ')  {
      // }
      blockCode[blockCode.length - 1] = oldPrefix + blockCode[blockCode.length - 1];
      return blockCode.join('\n');
    }).join('\n');
  };

  return that;
};

/* JavaScript */
var jsF = function() {
  var that = languageF('JavaScript');

  that.variable = function(name, value) {
    return 'var ' + name + ' = ' + value + ';';
  };

  that.block = function(body) {
    return ['function {', body(), '}'];
  };

  return that;
};


/* Ruby */
function rubyF() {
  var that = languageF('Ruby');

  that.variable = function(name, value) {
    return name + ' = ' + value;
  };

  that.block = function(body) {
    return ['begin', body(), 'end'];
  };

  return that;
}


// USAGE OF MODULE:
/*
var js = jsF();
var ruby = rubyF();

var blocks = [{a: 'obj1_a'}, {a: 'obj2_a', b: 'obj2_b'}];
console.log(js.snippet(blocks));
console.log(ruby.snippet(blocks));
*/
