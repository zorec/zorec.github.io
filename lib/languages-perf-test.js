(function() {
  'use strict';

  var objects = objectHelper.randomObjects(100);
  objectHelper.chainObjects(objects);

  console.time('Inheritance: prototypal');
  js.snippet(objects);
  ruby.snippet(objects);
  console.timeEnd('Inheritance: prototypal');

  console.time('Inheritance: pseudoclassical');
  js = new JavaScript();
  ruby = new Ruby();
  js.snippet(objects);
  ruby.snippet(objects);
  console.timeEnd('Inheritance: pseudoclassical');


  console.time('Inheritance: functional');
  js = jsF();
  ruby = rubyF();
  js.snippet(objects);
  ruby.snippet(objects);
  console.timeEnd('Inheritance: functional');

  // e.g.
  // Inheritance: prototypal: 117.293ms
  // Inheritance: pseudoclassical: 31.840ms
  // Inheritance: functional: 24.509ms

}());
