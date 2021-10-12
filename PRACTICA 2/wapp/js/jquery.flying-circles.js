var Dots = (function() {
	var options = {
		selector: '.moving-circles',	
		accurancy: n_h,
		color: 'red',
		size: 7, 
		speed: 5000,
		width: '25',
		height: '50',
		randomOpacity: false,
		randomSize: false,
		randomColor: false
	};

    var generate = function ( params ) {

    	params = params || {};

    	options = $.extend(options, params);

    	options.selector = (typeof options.selector === "string") ? options.selector : '.moving-circles';
    	options.color = (typeof options.color === "string") ? options.color : 'red';

    	if (typeof options.width === "string") {
    		options.width = ($(window).width() * parseInt(options.width)) / 100; 
    	} else if (typeof options.width !== "number" && typeof options.width !== "string") {
    		options.width = 500;
    	}

    	if (typeof options.height === "string") {
    		options.height = ($(window).height() * parseInt(options.height)) / 100; 
    	} else if (typeof options.height !== "number" && typeof options.height !== "string") {
    		options.height = 500;
    	}	
    	options.accurancy = (typeof options.accurancy === "number") ? options.accurancy : 100;
    	options.size = (typeof options.accurancy === "number") ? options.size : 20;
    	options.speed = (typeof options.speed === "number") ? options.speed : 20000;
    	options.randomOpacity = (typeof options.randomOpacity === "boolean") ? options.randomOpacity : true;
    	options.randomSize = (typeof options.randomSize === "boolean") ? options.randomSize : true;
    	options.randomColor = (typeof options.randomColor === "boolean") ? options.randomColor : true;

    	var opts = options;
    	var move_speed, 
    	top_destination, 
    	left_destination;
  

		var elem;    	

    	$(opts.selector).css({'width': opts.width,'height': opts.height,'overflow':'hidden','position':'relative'});
		//$(opts.selector).css({'width': 350,'height': 350,'overflow':'hidden','position':'relative'});

    	var styles = {
    		'width': opts.size + 'px',
    		'height': opts.size + 'px', 
    		'position': 'absolute', 
    		'border-radius': '50%'
    	}

		$(opts.selector).empty();

    	for (i = 0; i <= opts.accurancy; i++) {

			elem = $('<div/>', {
						class: 'circle',
						style: 'top:'+randomize(opts.height, 0)+'px;left:'+randomize(opts.width, 0)+'px;'
				   });

    		$(opts.selector).append(elem);
    		$('.' + elem[0].className).css(styles);
    		anim( elem );
			//anim.remove();

    	}
  
    };

    var anim = function( item ){

	    	var generated_size = resize(),
	    	generated_color = colorize();

	    	move_speed = (options.speed <= 0) ? parseInt(options.speed) : randomize(options.speed, Math.floor(options.speed / 5));
	    	top_destination = (options.height <= 0) ? parseInt(options.height) : randomize(options.height, 1);
	    	left_destination = (options.width <= 0) ? parseInt(options.width) : randomize(options.width, 1);
	    	random_opacity = (options.randomOpacity == true) ? randomize(1, 0) : 1; 


	        $(item).css("background-color", generated_color).animate({
	        	backgroundColor: '#000000',
	        	opacity: random_opacity,
	        	top: top_destination,
	        	left: left_destination,
	        	width: generated_size,
	        	height: generated_size
	        },move_speed, function(){
	    		return anim( item );
	        });
    };

    var randomize = function( max, min ) {
    	return Math.random() * (max - min) + min;
    };

    var colorize = function() {
    	if (options.randomColor == true) {
    		return 'rgb(' + Math.floor(randomize(255, 0)).toString() + ', ' + Math.floor(randomize(255, 0)).toString() + ', ' + Math.floor(randomize(255, 0)).toString() + ')';
    	} else {
    		return options.color;
    	}
    }

    var resize = function() {
    	if (options.randomSize == true) {
    		return randomize(options.size * 2, 1);
    	} else {
    		return options.size;
    	}
    }    

    return {
    	generate : generate	
    }

})();