/*
 * Switchboard v1.1
 * Copyright © 2011 Jeroen Ransijn
 *
 * Switchboard is a script for RapidWeaver that tests which page style is being used.
 * Although the script uses the page object, extending jQuery, it is jQuery independent
 * and could easily be used without the use of jQuery.
 * Tests mainly check for classnames, 
 * doesClassExist() makes sure the fastest way to do this is picked.
 * This method has a fallback on jQuery, note that there is no further fallback.
 *
 * todo: QuickTime support, not so hard probably, needs an exported page.
 * supported: (page-style-) 
 * empty / stacks / blog / photo-album / movie-album / file-sharing / sitemap / iframe / unknown
 * (styled text and html can't be detected)
 *
 * Author			@Jeroen_Ransijn 
 * Contributors		none
 */
$.page.switchboard = function() {
	var tests = {},
		content = 'content',
		nativeClassSelector = document.getElementsByClassName;
	
	// @param {string} classname without a dot
	// @return {bool} does the classname exist
	// http://jsperf.com/if-class-exists
	function doesClassExist(className) {
		if ( nativeClassSelector ) {
			var ele = document.getElementsByClassName(className);
		} else if ( !!window.jQuery ) {
			var ele = $('.'+className);
		}
		return !(ele.length === 0);
	};
	
	// test if content is empty
	tests['empty'] = function() {
		return (content.childNodes.length === 0);
	};
	
	// early in the tests stack, it's a popular page style
	// test for class ".stacks_top"
	tests['stacks'] = function() {
		return doesClassExist('stacks_top');
	};
	
	// test for class ".blog-entry"
	// too bad it can't be selected with '#unique-entry-id-[i]'
	tests['blog'] = function() {
		return doesClassExist('blog-entry');
	};
	
	// test for class ".album-wrapper"
	tests['photo-album'] = function() {
		return doesClassExist('album-wrapper');
	};
	
	// test for class ".movie-thumbnail-frame"
	tests['movie-album'] = function() {
		return doesClassExist('movie-thumbnail-frame');
	};
	
	// test for class ".filesharing-item"
	tests['file-sharing'] = function() {
		return doesClassExist('filesharing-description');
	};
	
	// test for class ".rw-sitemap"
	tests['sitemap'] = function() {
		return doesClassExist('rw-sitemap');
	};
			
	// test if there is only 1 childNode in the content
	// select the iframe and check if it has a contentDocument property
	// todo: not sure if this is totally browser compatible (IE?)
	tests['iframe'] = function() {
		if (content.childNodes.length === 1) {
			return !!content.getElementsByTagName('iframe')[0].contentDocument;
		}
		return false;
	};
	
	// if no tests pass, the pageStyle is unknown
	tests['unknown'] = function() {
		return true;
	};
	
	// @param {string} the page style
	function testsComplete(pageStyle) {
		$.page.style = pageStyle;
		var html = document.documentElement;	
		html.setAttribute('class', html.className +' page-style-' + pageStyle);
	};
	
	// run the tests
	for ( var pageStyle in tests ) {
		if ( tests.hasOwnProperty(pageStyle) ) {
			if ( tests[pageStyle]() ) {
				testsComplete(pageStyle);
				break;
			}
		}
	}
	return $.page.style;
};

$.page.switchboard();