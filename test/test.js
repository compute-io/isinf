'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isinf = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-isinf', function tests() {

	it( 'should export a function', function test() {
		expect( isinf ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				isinf( value );
			};
		}
	});

	it( 'should compute whether each array element is infinite', function test() {
		var data, expected, actual;

		data = [ 5, 1/0, 3, 9, -1/0, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ];

		expected = [ 0, 1, 0, 0, 1, 1, 1 ];
		actual = isinf( data );

		assert.deepEqual( actual, expected );
	});

});
