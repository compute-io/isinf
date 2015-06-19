/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	isinf = require( './../lib' ),

	// Checks whether value is infinite:
	ISINF = require( './../lib/number.js' ),

	// Cast arrays to a different data type
	cast = require( 'compute-cast-arrays' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-isinf', function tests() {

	it( 'should export a function', function test() {
		expect( isinf ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			NaN,
			null,
			function(){},
			{}
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

	it( 'should throw an error if provided an invalid accessor option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				isinf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should compute the error function when provided a number', function test() {
		assert.strictEqual( isinf( Infinity ), 1 );
		assert.strictEqual( isinf( 53 ), 0 );
	});

	it( 'should compute whether each array element is infinite when provided a plain array', function test() {
		var data, actual, expected;

		data = [ Infinity, -Infinity, 39, -30, 233 ];

		expected = [ 1, 1, 0, 0, 0 ];

		actual = isinf( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = isinf( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the isinf function when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float64Array(  [ Infinity, -Infinity, 39, -30, 233 ] );

		expected = new Uint8Array( [ 1, 1, 0, 0, 0 ] );

		actual = isinf( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = isinf( data, {
			'copy': false
		});
		expected = new Int32Array( [ 1, 1, 0, 0, 0 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, cast( expected, 'float64') );
	
	});

	it( 'should evaluate the isinf function element-wise using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,Infinity],
			[1,-Infinity],
			[2,39],
			[3,-30],
			[4,233],
		];

		expected = [ 1, 1, 0, 0, 0];

		actual = isinf( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = isinf( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the isinf function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			rand,
			i;

		d1 = new Float64Array( 100 );
		d2 = new Uint8Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			rand = Math.random()*10 - 10;
			if ( rand < -4.5 ) {
				rand = 0;
			}
			d1[ i ] = 100 / rand;
			d2[ i ] = ISINF( d1[ i ] );
		}
		mat = matrix( d1, [10,10], 'float64' );
		out = isinf( mat );

		// assert.deepEqual( out.data, d2 );

		// Mutate...
		out = isinf( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );

		console.log( cast( d2, 'float64' ) );
		// assert.deepEqual( mat.data, cast( d2, 'float64' ) );
	});

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( isinf( [] ) );
		assert.isNull( isinf( matrix( [0,0] ) ) );
		assert.isNull( isinf( new Int8Array() ) );
	});

});
