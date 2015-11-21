/*! Parser: Month - updated 11/2/2015 (v2.24.1) */
/* Demo: http://jsfiddle.net/Mottie/abkNM/4169/ */
/*jshint jquery:true */
;(function($){
	'use strict';

	var ts = $.tablesorter;
	ts.dates.months = $.extend( {}, {
		// See http://mottie.github.io/tablesorter/docs/example-widget-grouping.html
		// for details on how to use CLDR data for a locale to add data for this parser
		// CLDR returns an object { 1: "Jan", 2: "Feb", 3: "Mar", ..., 12: "Dec" }
		'en' : {
			1 : 'Jan',
			2 : 'Feb',
			3 : 'Mar',
			4 : 'Apr',
			5 : 'May',
			6 : 'Jun',
			7 : 'Jul',
			8 : 'Aug',
			9 : 'Sep',
			10: 'Oct',
			11: 'Nov',
			12: 'Dec'
		}
	}, ts.dates.months );

	ts.addParser({
		id: 'month',
		is: function() {
			return false;
		},
		format: function( str, table, cell, cellIndex ) {
			if ( str ) {
				var m, month,
					c = table.config,
					// add options to 'config.globalize' for all columns --> globalize : { lang: 'en' }
					// or per column by using the column index --> globalize : { 0 : { lang: 'fr' } }
					options = c.globalize && ( c.globalize[ cellIndex ] || c.globalize ) || {},
					months = ts.dates.months[ options.lang || 'en' ];
				if ( c.ignoreCase ) {
					str = str.toLowerCase();
				}
				for ( month in months ) {
					if ( typeof month === 'string' ) {
						m = months[ month ];
						if ( c.ignoreCase ) {
							m = m.toLowerCase();
						}
						if ( str.match( m ) ) {
							return parseInt( month, 10 );
						}
					}
				}
			}
			return str;
		},
		type: 'numeric'
	});

})(jQuery);
