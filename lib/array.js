'use strict';

// MODULES //

var ISINF = require( './number.js' );

// IS INF //

/**
* FUNCTION: isinf( out, arr )
*	Computes for each array element whether it is infinite.
*
* @private
* @param {Array} out - output array
* @param {Array} arr - input array
* @returns {Array} output array
*/
function isinf( y, x ) {
	var len = x.length,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		y[ i ] = ISINF( x[ i ] );
	}

	return y;
} // end FUNCTION isinf()


// EXPORTS //

module.exports = isinf;
