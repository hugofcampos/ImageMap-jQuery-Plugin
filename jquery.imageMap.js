/*
 * jQuery imageMap plug-in 0.9
 *
 * Plugin HomePage http://tagnclick.com.br/blog/jquery-plugin-imageMap/
 *
 * Copyright (c) 2012 Hugo Campos
 * 
 * Based on Jonas Raoni Soares Silva algorithm (http://jsfromhell.com/math/is-point-in-poly)
 * 
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

jQuery.fn.imageMap = function(options) {
	var defaults = { 		
		points: false,
		names: false,		
		callback: false
	};
	
	var opts = jQuery.extend(defaults, options);
	
	jQuery(this).bind('mouseover', function () {
		var pos_x=0;
		var pos_y=0;		
		var inside;
		var element;
				
		element = jQuery(this);
		
		element.bind('mousemove', function() {
			pos_x = event.offsetX?(event.offsetX):event.pageX-element.offsetLeft;
			pos_y = event.offsetY?(event.offsetY):event.pageY-element.offsetTop;
		
			newinside = isPointInPoly({x: pos_x, y: pos_y}, defaults.points);
			
			if( inside != newinside ){
				inside = newinside;
				
			if(!defaults.names)
				defaults.callback(inside);
			else
				if(inside==-1)
					defaults.callback(-1);
				else
					defaults.callback(defaults.names[inside]);			
			}        
		});		
	}).mouseleave(function(){
		element.unbind('mousemove');
    });	
}

function isPointInPoly(pt, polygons ){
	for(var count in polygons){
		poly = polygons[count];
		for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
			((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
			&& (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
			&& (c = !c);
		if(c) return count;
	}
	return -1;
}