'use strict';

var matrix = require( 'dstructs-matrix' ),
	isinf = require( './../lib' );

var data,
	mat,
	out,
	tmp,
	rand,
	i;

// ----
// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	// Division by 0 returns infinity...
	rand = Math.random()*10 - 10;
	if ( rand < -4.5 ) {
		rand = 0;
	}
	data[ i ] = 100 / rand;
}
out = isinf( data );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = isinf( data, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );


// ----
// Typed arrays...
data = new Float64Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	rand = Math.random()*10 - 10;
	if ( rand < -4.5 ) {
		rand = 0;
	}
	data[ i ] = 100 / rand;
}
tmp = isinf( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [5,2], 'float64' );
out = isinf( mat );
console.log( 'Matrix: %s\n', out.toString() );
