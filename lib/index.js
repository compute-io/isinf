/**
*
*	COMPUTE: isinf
*
*
*	DESCRIPTION:
*		- Computes for each array element whether an element is infinite.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// VARIABLES //

var pinf = Number.POSITIVE_INFINITY,
	ninf = Number.NEGATIVE_INFINITY;


// ISINF //

/**
* FUNCTION: isinf( arr )
*	Computes for each array element whether an element is infinite.
*
* @param {Array} arr - input array
* @param {Array} array of 1s and 0s indicating if an element is infinite
*/
function isinf( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'isinf()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length,
		out = new Array( len ),
		val;

	for ( var i = 0; i < len; i++ ) {
		out[ i ] = 0;
		val = arr[ i ];
		if ( val === pinf || val === ninf ) {
			out[ i ] = 1;
		}
	}
	return out;
} // end FUNCTION isinf()


// EXPORTS //

module.exports = isinf;
