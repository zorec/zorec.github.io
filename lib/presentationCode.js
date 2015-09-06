/*
 Example of closure
*/

var pascal = function() {
  var freeUses = 1;
  var support = function() {
    return (freeUses >= 0) ? 'ok' : 'not ok';
  };
  return {
    use: function() {
      freeUses -= 1;
      return support();
    }
  };
};
var P1 = pascal();
console.log(P1.use()); // 'ok'
console.log(typeof P1.freeUses); // 'undefined'
console.log(P1.use()); // 'not ok'

/*
  Example of getter and setter
*/

var JS = {
  name: 'JavaScript',
  version: 'ECMAScript 5',
  get fullName() {
    return this.name + ' (' + this.version + ')';
  },
  set fullName(newName) {
    var start = newName.indexOf('(');
    var end = newName.indexOf(')');
    this.name = newName.substring(0, start);
    this.version = newName.substring(start+1, end);
  }
}
console.log(JS.fullName); // 'JavaScript (ECMAScript 5)'
JS.fullName = 'JavaScript (ECMAScript 6)';
console.log(JS.version); // 'ECMAScript 6'
