"use strict";

/*
"Exports" of this module:
 - language
 - js
 - ruby
*/

/*
  OO CONCEPT: MODULARITY
  This file can be concidered as a package, because it is independent from the rest of the application.
  It could be used in other applications.
*/



/*
  OO CONCEPT: ABSTRACTION
  The following objects represent abstractions of real world entities. Real world entities are very complex.
  But this complexity can be reduced, because not all properties are relevant.
  In our demo application, it is not important who designed a language or when it was designed
  (in other working domains it might be essential though).


  Object language is an abstraction of a programming language.
  Objects ruby and js are abstractions of corresponding programming languages.
*/
var language = {
  name: 'abstract language',
  create: function (name) {
    var self = Object.create(this);
    self.name = name;

    return self;
  },
};

language.getName = function() {
  return this.name;
};

language.snippet = function(objects) {
  return this.blocksSnippet(this.objects2blocks(objects));

};

language.objects2blocks = function(objects) {
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

language.blocksSnippet = function(blocks, prefix) {
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

/*
  OO CONCEPT: INHERITANCE (prototypal pattern)
  Inheritance is a pattern of code reuse, which allows to share properties (data or methods)
  and create more specialized objects.
  In prototypal Inheritance, objects are created (cloned) directly from other objects from which they inherit all its properties.
  We only specify differences from its prototype that is an object from which they are created.

  In this case, js and ruby are specialized version of (programming) language and can access all properties on its prototype.

  NOTE: As opposed to classical languages like Java, there is no class.
  Class allows to:
  - create new objects (instances)
  - share data and methods across these instances.

  But in many cases, class is really not neccessary as in this example.

  In this demo app, there exist only one ruby and js object. Then, why do we need class? We can crete these objects
  directly in object notation. And We do not need to share anything across instances.

*/

/* JavaScript */
var js = Object.create(language.create('JavaScript'));

js.variable = function(name, value) {
  return 'var ' + name + ' = ' + value + ';';
};

js.block = function(body) {
  return ['function {', body(), '}'];
};

/**


/**
OO CONCEPT: POLYMORPHISM

Both objects ruby and js define methods variable and block that means we can treat them equally
 e.g. we can call these methods on both languages (js, ruby) without having to concern
 which type of language it is, because they share the same interface.
 But they produce different output, because implementation is language specific.

*/

/* Ruby */
var ruby = Object.create(language.create('Ruby'));

ruby.variable = function(name, value) {
  return name + ' = ' + value;
};

ruby.block = function(body) {
  return ['begin', body(), 'end'];
};

// USAGE OF MODULE:
/*
var blocks = [{a: 'obj1_a'}, {a: 'obj2_a', b: 'obj2_b'}];
console.log(js.snippet(blocks));
console.log(ruby.snippet(blocks));
*/
