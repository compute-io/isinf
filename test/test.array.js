/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isinf = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array isinf', function tests() {

	it( 'should export a function', function test() {
		expect( isinf ).to.be.a( 'function' );
	});

	it( 'should compute whether each array element is infinite', function test() {

		var data, expected, actual;

		data = [ Infinity, -Infinity, 39, -30, 233 ];

		actual = new Array( data.length );
		actual = isinf( actual, data );
		expected = [ 1, 1, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( isinf( [], [] ) );
		assert.isNull( isinf( new Int8Array(), new Int8Array() ) );
	});

});
