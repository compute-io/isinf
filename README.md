isinf
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes for each element whether it is infinite.


## Installation

``` bash
$ npm install compute-isinf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var isinf = require( 'compute-isinf' );
```

#### isinf( x[, options] )

Checks element-wise whether numbers in `x` are infinite. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). Correspondingly, the function returns either a single number, an `array` with length equal to that of the input `array` or a `matrix` with equal dimensions as input `x`. Each output element is either `0` or `1`. A value of `1` means that an element is infinite  and `0` means that an element is __not__ infinite.

``` javascript
var matrix = require( 'dstructs-matrix' ),
    data,
    mat,
    out,
    i;

out = isinf( Infinity );
// returns 1

out = isinf( 293 );
// returns 0

data = [ 5, 1/0, 3, 9, -1/0, NaN ]
out = isinf( data );
// returns [ 0, 1, 0, 0, 1, 0 ]


data = new Float64Array( data );
out = isinf( data );
// returns Uint8Array( [0, 1, 0, 0, 1, 0] )

data = new Float64Array( 9 );
for ( i = 1; i < 10; i++ ) {
	data[ i - 1 ] = (i % 3 === 0) ? Infinity : i;
}
mat = matrix( data, [3,3], 'float64' );
/*
	[ 1 2 Infinity
	  4 5 Infinity
	  7 8 Infinity ]
*/

out = isinf( mat );
/*
	[ 0 0 1
	  0 0 1
	  0 0 1 ]
*/
```

When provided an input `array`, the function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing 0/1's indicating whether the corresponding element is infinite. Default: `true`.
*  __accessor__: accessor `function` for accessing numeric values in object `arrays`.

For `matrices`, only the `copy` option is applicable.

To mutate an input `array` or `matrix` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out;

data = [ 1, 2/0, 3 ];

out = isinf( arr, {
	'copy': false
});
// returns [ 0, 1, 0 ]

bool = ( data === out );
// returns true

data = new Float64Array( 9 );
for ( i = 1; i < 10; i++ ) {
	data[ i - 1 ] = (i % 3 === 0) ? Infinity : i;
}
mat = matrix( data, [3,3], 'float64' );
/*
	[ 1 2 Infinity
	  4 5 Infinity
	  7 8 Infinity ]
*/

out = isinf( mat, {
	'copy': false
});
/*
	[ 0 0 1
	  0 0 1
	  0 0 1 ]
*/

bool = ( mat === out );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 1],
	['boop', 2],
	['bip', 3],
	['bap', 4/0],
	['baz', Infinity]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = isinf( data, {
	'accessor': getValue
});
// returns [ 0, 0, 0, 1, 1 ]
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	isinf = require( 'compute-isinf' );

var data,
	mat,
	out,
	tmp,
	rand,
	i;

// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	// Division by 0 returns infinity...
	rand = Math.random()*10 - 10;
	if ( rand < -4.5 ) {
		rand = 0;
	}
	data[ i ] = 100 / rand;
}
out = isinf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = isinf( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Float64Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	rand = Math.random()*10 - 10;
	if ( rand < -4.5 ) {
		rand = 0;
	}
	data[ i ] = 100 / rand;
}
tmp = isinf( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'float64' );
out = isinf( mat );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-isinf.svg
[npm-url]: https://npmjs.org/package/compute-isinf

[travis-image]: http://img.shields.io/travis/compute-io/isinf/master.svg
[travis-url]: https://travis-ci.org/compute-io/isinf

[coveralls-image]: https://img.shields.io/coveralls/compute-io/isinf/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/isinf?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/isinf.svg
[dependencies-url]: https://david-dm.org/compute-io/isinf

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/isinf.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/isinf

[github-issues-image]: http://img.shields.io/github/issues/compute-io/isinf.svg
[github-issues-url]: https://github.com/compute-io/isinf/issues
