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

	x = x.data;
	y = y.data;
	len = x.length;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		y[ i ] = ISINF( x[ i ] );
	}
	return out;
} // end FUNCTION isinf()


// EXPORTS //

module.exports = isinf;
