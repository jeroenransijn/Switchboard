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
jQuery(function($) { // paste Switchboard here });
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
```
.page-style-photo-album .album-wrapper { padding:15px; }
.page-style-contact-form input:focus { outline:none; }
.page-style-blog #content h1 { font-size:36px; }
```
***

Modernizr + Switchboard =
***
```
.rgba.page-style-contact-form`
.borderradius.page-style-photo-album
```
***

All the supported page styles as of friday 29 july
page-style-
empty / stacks / blog / photo-album / movie-album / file-sharing / sitemap / iframe / unknown

2b: JavaScript: executing JS based on the page style
----------------------------------------------------

Probably one of the most useful features of Switchboard is in combination with JS. On a RapidWeaver page - with Switchboard - open up the JavaScript console and type `$.page.style`, and the console will return `sitemap` for example. That's basically how simple it is. With the use of Switchboard you can write code like this:
***
```
if ( $.page.style === 'sitemap' ) {
	// do some cool stuff on your sitemap!
}
```
***
or you could even write whole switch statements!

```javascript
switch ( $.page.style ) {
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