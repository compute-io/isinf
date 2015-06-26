'use strict';

// VARIABLES //

var pinf = Number.POSITIVE_INFINITY,
	ninf = Number.NEGATIVE_INFINITY;


// IS INF //

/**
* FUNCTION: isinf( x )
*	Checks whether input element is equal to positive or negative infinity.
*
* @private
* @param {Number} x - input value
* @returns {Number} 1 if element is infinity, 0 otherwise
*/
function isinf( x ) {
	return ( x === pinf || x === ninf ) ? 1 : 0;
} // end FUNCTION isinf()

// EXPORTS //

module.exports = isinf;
