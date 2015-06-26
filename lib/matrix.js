'use strict';

// MODULES //

var ISINF = require( './number.js' );

// IS INF //

/**
* FUNCTION: isinf( out, arr )
*	Computes for each matrix element whether it is infinite.
*
* @private
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function isinf( y, x ) {
	var out = y,
		len,
		i;

	len = x.length;

	if ( !len ) {
		return null;
	}
	if ( y.length !== len ) {
		throw new Error( 'isinf()::invalid input arguments. Input and output matrices must be the same length.' );
	}

	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ISINF( x.data[ i ] );
	}
	return out;
} // end FUNCTION isinf()


// EXPORTS //

module.exports = isinf;
