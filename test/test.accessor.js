/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isinf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor isinf', function tests() {

	it( 'should export a function', function test() {
		expect( isinf ).to.be.a( 'function' );
	});

	it( 'should compute whether each array element is infinite using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':394},
			{'x':Infinity},
			{'x':-Infinity},
			{'x':-392},
			{'x':Number.POSITIVE_INFINITY},
			{'x':Number.NEGATIVE_INFINITY,},
			{'x':40}
		];

		actual = new Array( data.length );
		actual = isinf( actual, data, getValue );

		expected = [ 0, 1, 1, 0, 1, 1, 0 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( isinf( [], [], getValue ) );
		function getValue( d ) {
			return d.x;
		}
	});

});
