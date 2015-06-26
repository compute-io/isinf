/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isinf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number isinf', function tests() {

	it( 'should export a function', function test() {
		expect( isinf ).to.be.a( 'function' );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( isinf( 1 ) );
	});

	it( 'should return 0 if provided a positive number', function test() {
		var val = isinf( 10 );
		assert.strictEqual( val, 0 );
	});

	it( 'should return 0 if provided a negative number', function test() {
		var val = isinf( -10 );
		assert.strictEqual( val, 0 );
	});

	it( 'should return 1 if provided POSITIVE_INFINITY', function test() {
		var val;

		val = isinf( Number.POSITIVE_INFINITY );
		assert.strictEqual( val, 1 );

		val = isinf( Infinity );
		assert.strictEqual( val, 1 );
	});

	it( 'should return 1 if provided NEGATIVE_INFINITY', function test() {
		var val;

		val = isinf( Number.NEGATIVE_INFINITY );
		assert.strictEqual( val, 1 );

		val = isinf( -Infinity );
		assert.strictEqual( val, 1 );
	});

});
