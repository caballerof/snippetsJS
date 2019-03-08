/**
 * @file Examples for show how "this" works in JS
 * @author FJ Caballero <caballero.csoft@gmail.com>
 */

//-------------------- Global binding ----------------------------------//
/**
 * Global binding for this - default - it no apply in strict mode.
 */
var a = 2;

function local() {
  console.log(this.a);
}

local(); // 2

//-------------------- Implicit Binding ----------------------------------//

/**
 *
 * the implicit binding rule says that it's that object which should be used for the function call's this binding.
 */
function implicit() {
  console.log(this.a);
}

var obj = {
  a: 10,
  implicit: implicit
};

obj.implicit(); // 10

// Only the top/last level of an object property reference chain matters to the call-site. For instance:

function implicitTow() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  implicitTow: implicitTow
};

var obj1 = {
  a: 10,
  obj2: obj2
};

obj1.obj2.implicitTow(); // 42

// Implicitly lost - when an implicitly bound function loses that binding

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = 'oops, global'; // `a` also property on global object

bar(); // "oops, global"

//-------------------- Explicit Binding ----------------------------------//

/**
 * call(..) and apply(..)
 * both take, as their first parameter, an object to use for the this, and then invoke the function with that this specified.
 * Since you are directly stating what you want the this to be, we call it explicit binding.
 */
function explicit() {
  console.log(this.a);
}

var obj = {
  a: 2
};

explicit.call(obj); // 2

// Hard Binding - No matter how you later invoke the function bar,
//it will always manually invoke foo with obj. This binding is both explicit and strong, so we call it hard binding.

function hardBinding() {
  console.log(this.a);
}

var objHard = {
  a: 50
};

var objHard2 = {
  a: 100
};

var bar = function() {
  hardBinding.call(objHard);
};

bar(); // 50
setTimeout(bar, 100); // 50

// `bar` hard binds `hardBinding`'s `this` to `objHard`
// so that it cannot be overridden
bar.call(objHard2); // 50

// Since hard binding is such a common pattern,
// it's provided with a built-in utility as of ES5:
// Function.prototype.bind, and it's used like this:

function bindExample(something) {
  console.log(this.a, something);
  return this.a + something;
}

var objExample = {
  a: 2
};

var barExample = bindExample.bind(objExample);

var b = barExample(3); // 2 3
console.log(b); // 5

//-------------------- New Binding ----------------------------------//

/** 
 * So new is the final way that a function call's this can be bound. 
 * We'll call this new binding.
 */
function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2