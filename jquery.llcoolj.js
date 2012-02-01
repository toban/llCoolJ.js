/**
 * llCoolJ.js v0.1
 * Add some LL Cool J to yr page
 * http://www.likeneveralways.com
 *
 * Commercial use requires one-time license fee
 *
 * Copyright 2012 Jacob Broms Engblom
 */

(function( $ ){

  $.fn.llCoolJ = function( options ) {
		this.append("<div id='overlay'></div>");
		this.append("<div id='llCoolJ'></div>");
		var settings = $.extend( {
	      'inset'       : false,
	      'interactive' : false,
	      'host'	: null
	    }, options);
	    
	    	var coolHosts = new Array("likeneveralways.com","kthx.pl");
	    	var prefix = "http://";
	    	var postfix = "/images/"
	    	var imgsrc = "llcoolj.jpg";
	    	var hostIndex = coolHosts.length-1;
	    	var timeoutMs = 2000;
	    	var useTextVersion = false;
	    	
    		if(settings['host']!=null)
	    	{
	   	 	coolHosts.push(settings['host']);
	   	 	var hostIndex = coolHosts.length-1;
	    	}
	    	
    		var isLoaded = false;
    		
    		// load the image
    		loadImg = function()
    		{
			var coolj = $("<img id='llCoolJImg' />").attr('src', prefix+coolHosts[hostIndex]+postfix+imgsrc)
			.load(function() {
			if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) 
			{
				isLoaded = false;
			} 
			else 
			{
				isLoaded = true;
				$("#llCoolJ").append(coolj);
			}
			});
			
			// every timeoutMs check if the image is loaded, else skip to next host
			setTimeout(loadImgCheck,timeoutMs);
    		}
    		
    		// check if the image is loaded
		loadImgCheck = function()
		{
			if(!isLoaded)
			{
				hostIndex--;
				if(hostIndex < 0)
				{
					// no more hosts, use text
					isLoaded = true;
					useTextVersion = true;
					
				}
				else
				{
					loadImg();
				}
			}
			else
			{
				
			}
		};
		loadImg();
		
		if(useTextVersion)
		{
			$('#llCoolJ').addClass('inset');
		}
			
	    	
	    	
		
		if(settings['inset']){
			$('#llCoolJ').addClass('inset');
			$('#overlay').css('background', 'none');
			if(settings['interactive']){
				$('#llCoolJImg').click(function(){
					console.log($(this).css('bottom'));
					if($(this).css('bottom') != "0px"){
							$(this).animate({
						    	bottom: 0
						  	}, 1000);
					}
					else {
							$(this).animate({
						    	bottom: -220
						  	}, 1000);
					}
				
				});
			}
		}
		else {
				if(settings['interactive']){
					$(document).dblclick(function() {
						if($('#llCoolJ').is(":visible")){
						  	$('#llCoolJ').fadeOut('fast', function(){
								$('#overlay').fadeOut('fast');
							});
						}
						else {
							$('#overlay').fadeIn('fast', function(){
								$('#llCoolJ').fadeIn('fast');
							});
						}
					});
				}
				else {
					$(document).dblclick(function() {
						  	$('#llCoolJ').fadeOut('fast', function(){
								$('#overlay').fadeOut('fast');
							});
					});
				}
		}
	
		
		$('#overlay').fadeIn('fast', function(){
			$('#llCoolJ').fadeIn('fast');
		});
  };
})( jQuery );

