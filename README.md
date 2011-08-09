Switchboard for RapidWeaver
===========================

1. What is this?
2. Usage


1: What is this?
----------------

Switchboard is a JavaScript that theme developers for RapidWeaver(RW) can include in their themes. Much like Modernizr.js can it detect features, in this case, Switchboard can detect page styles. Switchboard allows theme developers to write page style specific styling and JavaScript.

If you take a look at the code you'll notice this `$.page.switchboard`, Switchboard inherits from the `page` object, which is in turn inherited from the dollar sign (jQuery). Because Switchboard is jQuery independent, you could easily change this to `window.page.switchboard` or even `var Switchboard`. The reason for the page object is that I'm working with a page object in my theme developing. Hopefully I will publish more code based on this page object, in which I can explain the idea behind it better.

2: Usage
========

Using Switchboard in your theme is really easy, first download Switchboard.
Second, wrap it in:
***
```javascript
jQuery(function($) { /* paste Switchboard here */ });
```
***
if you're using jQuery.

Third, include 
***
```html
<script src="%pathto('js/page.switchboard.js')%" ><script/>
```
***
in the `head` of your document, or as I prefer it, right before the closing body tag `</body>`. That should do it.

2a: Using Switchboard class names in your stylesheets 
----------------------------------------------------------

Class names get applied to the html tag, this makes it extremely easy to style elements based on the RW page style.
Example:
***
```css
.page-style-photo-album .album-wrapper { padding:15px; }
.page-style-contact-form input:focus { outline:none; }
.page-style-blog #content h1 { font-size:36px; }
```
***

Modernizr + Switchboard =
***
```css
.rgba.page-style-contact-form {}
.borderradius.page-style-photo-album {}
```
***

All the supported page styles as of tuesday 9 august
***
**page-style-**
empty / stacks / blog / contact-form / photo-album / movie-album / file-sharing / sitemap / iframe / quicktime / unknown
***
2b: JavaScript: executing JS based on the page style
----------------------------------------------------

**NEW** In v1.2 there are a couple of changes, first of all, **$.page.style** has become **$.page.style.type**. 
Second, the way how you use Switchboard has become more intuitive.

Using Switchboard with autorun (v1.2)
-------------------------------------

Autorun in Switchboard is the default, if you don't want it, go to 'Using Switchboard the old way'. 

For every page style that you want supported create a method like this:
***
```javascript
$.page.style['contactForm'] = function() {
	console.log('this is a contactForm page');
};

// or use dot notation
$.page.style.sitemap = function() {
	console.log('this is a sitemap page');
};

// switchboard needs to be called AFTER the methods!
// the parameter is for clarity only
$.page.switchboard({ autorun: true });

```
**NOTE: for the sake of sanity, the names are converted to camelCase, so contact-form is contactForm in js**


Using Switchboard the old way
-------------------------------------

If you want to use Switchboard without the autorun capability turn it off like this: 
```javascript
$.page.switchboard({ autorun: false });
```
***
Probably one of the most useful features of Switchboard is in combination with JS. On a RapidWeaver page - with Switchboard - open up the JavaScript console and type `$.page.style.type`, and the console will return `sitemap` for example. That's basically how simple it is. With the use of Switchboard you can write code like this:
***
```javascript
if ( $.page.style.type === 'sitemap' ) {
	// do some cool stuff on your sitemap!
}
```
***
or you could even write whole switch statements!
**NOTE: as of v1.2 there is a more intuitive way using autorun**

```javascript
switch ( $.page.style.type ) {
	case 'empty':
		welcomeScreen();
		break;
	case 'stacks':
		break;
	case 'blog':
		enhanceBlog();
		break;
	case 'photo-album':
		coolAlbum();
		break;
	case 'movie-album':
		coolMovies();
		break;
	case 'file-sharing':
		fileRecognition();
		break;
	case 'sitemap':
		spiderMap();
		break;
	case 'iframe':
		bigFrame();
		break;
	case 'unknown':
		break;	
}
```