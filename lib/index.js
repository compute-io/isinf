'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isNumber = require( 'validate.io-number-primitive' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );

// FUNCTIONS //

var isinf1 = require( './number.js' ),
	isinf2 = require( './array.js' ),
	isinf3 = require( './accessor.js' ),
	isinf4 = require( './matrix.js' );

// IS EVEN //

/**
* FUNCTION: isinf( x[, opts] )
*	Computes for each element whether it is infinite.
*
* @param {Number|Number[]|Array} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix|Null} 1s and 0s indicating if elements are infinite or null
*/
function isinf( x, options ) {

	var opts,
		err,
		out;

	if ( isNumber( x ) ) {
		return isinf1( x );
	}

	if ( arguments.length > 1 ) {
		opts = copy( options );
		err = validate( opts );
		if ( err ) {
			throw err;
		}
	}

	if ( isMatrixLike( x ) ) {
		if ( opts && opts.copy === false ) {
			out = x;
		}
		else {
			out = matrix( x.shape, 'uint8' );
		}
		out = isinf4( out, x );
		return out;
	}

	if ( isArrayLike( x ) ) {

		if ( opts && opts.copy ) {
			out = new Array( x.length );
		}
		else {
			out = x;
		}
 		if ( opts && opts.accessor ) {
			out = isinf3( out, x, opts.accessor );
		}
		else {
			out = isinf2( out, x );
		}
		return out;
	}

	throw new TypeError( 'isinf()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );

} // end FUNCTION isinf()


// EXPORTS //

module.exports = isinf;
