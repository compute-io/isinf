'use strict';

// MODULES //

var ISINF = require( './number.js' );

// IS INF //

/**
* FUNCTION: isinf( out, arr, accessor )
*	Computes for each array element whether it is infinite using an accessor function.
*
* @private
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Array} output array
*/
function isinf( y, x, clbk ) {
	var len = x.length,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		y[ i ] = ISINF( clbk( x[ i ], i ) );
	}

	return y;
} // end FUNCTION isinf()


// EXPORTS //

module.exports = isinf;
