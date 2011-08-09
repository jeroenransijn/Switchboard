/*
 * Switchboard v1.2
 * Copyright © 2011 Jeroen Ransijn
 *
 * Switchboard is a script for RapidWeaver that tests which page style is being used.
 * Tests mainly check for classnames, 
 * doesClassExist() makes sure the fastest way to do this is picked.
 * This method has a fallback on jQuery, note that there is no further fallback.
 *
 *	CHANGELOG:
 *  - v1.2
 *		- options parameter extending the settings object
 *		- runPageStyleFunction() if settings.autorun is true
 *		- the $.page.style property has become $.page.style.type
 *		- var content wasn't selecting anything
 *		- tests for contact-form and quicktime
 *
 * supported: (page-style-) 
 * empty / stacks / blog / contact-form / photo-album / movie-album / 
 * file-sharing / sitemap / iframe / quicktime / unknown
 * (styled text and html can't be detected)
 *
 * Project			https://github.com/jeroenransijn/Switchboard
 * Author			@Jeroen_Ransijn 
 * Contributors		none
 *
 */
$.page.switchboard = function(options) {
	var settings = {
		autorun: true
	};
	
	if (options) { $.extend(settings,options); }

	$.page.style = {};
	var tests = {},
		content = document.getElementById('content'),
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
	
	// test for class ".form-footer"
	tests['contact-form'] = function() {
		return doesClassExist('form-footer');
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
	
	// test for class ".movie-frame"
	tests['quicktime'] = function() {
		return doesClassExist('movie-frame');		
	};
	
	// if no tests pass, the pageStyle is unknown
	tests['unknown'] = function() {
		return true;
	};
	
	// @param {string} the page style
	function testsComplete(pageStyle) {
		$.page.style.type = pageStyle;
		var html = document.documentElement;	
		html.setAttribute('class', html.className +' page-style-' + pageStyle);
		console.log(settings.autorun);
		if (settings.autorun) { runPageStyleFunction(pageStyle) };
	};
	
	// @param {string} the page style
	function runPageStyleFunction(pageStyle) {
		pageStyle = pageStyle.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
		(typeof $.page.style[pageStyle] === 'function') && $.page.style[pageStyle]();
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
	return $.page.style.type;
};

$.page.switchboard();