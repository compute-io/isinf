'use strict';

var isinf = require( './../lib' );

// Simulate some data...
var data = new Array( 100 ),
	len = data.length,
	rand;

// Division by 0 returns infinity...
for ( var i = 0; i < len; i++ ) {
	rand = Math.random()*10 - 5;
	if ( rand < -4.5 ) {
		rand = 0;
	}
	data[ i ] = 100 / rand;
}

var out = isinf( data );

// Count the number of infinite values detected...
var sum = 0;
for ( var i = 0; i < len; i++ ) {
	sum += out[ i ];
}

console.log( 'Count: %d', sum );
