# Creative Project 3 Project Specification
## Overview
For your third creative project, you will explore different API's available on the web 
and use AJAX with them to fetch and process data on your website. As a creative project, you have 
freedom to have more ownership in your work, as long as you meet the requirements listed below.

As a reminder, assignments will alternate between creative projects (CPs) and more formal homework
assessments (HWs). We have designed assignments to support each of the 5 modules of this
course, and for creative projects to prepare you for the following HW in each module.

That said, we encourage you to explore the new material covered in class, as well as
related (but optional) content we may link to along the way, as
long as you follow the CSE 154 code quality guidelines. This is your chance to:

1. Continue to build a a websites that you can link to on your resume or code 
   portfolio (CPs can be public, most HWs cannot be).
2. Ask instructors and/or TAs about features you want to learn how to implement (we can
   provide more support for CPs than HWs) and ask for feedback/ideas on Piazza.
3. Apply what you're learning in CSE 154 to projects you are personally interested in and
   may use outside of just a CSE 154 assignment.
4. Optionally showcase your CP work on the CSE 154 Au CP showcase (we'll try to showcase 8-12
   websites per CP).
5. Get feedback on code quality when learning new technologies in CSE 154 to implement for
   the following HW, which will be worth more points.

In past quarters, some students have built upon their creative project each week. You may
choose to do a new website for each CP, or build on a single project, as long as you meet
each CP's requirements.

## Ideas for CP3
As long as you meet the requirements outlined below, you have freedom in what kind of
website you create. Here are some ideas for Autumn 2018 (Your instructors are more than
happy to help discuss more ideas in their office hours!):
* There are a ton of API's on the web today - you can find ones for dog breeds, 
Game of Thrones trivia, government data sets, Pokemon, etc. If you can think of 
some interesting data that could be integrated in an interesting way on your 
website, consider Googling "API for X" where X is the topic of interest.
* With that, even when the data they respond with may be very interesting, some 
APIs can be frustrating to work with due to poor documentation (what? 
documentation is actually useful?) or outdated response formats (XML, HTML, etc.). 
We recommend using API's that return data in JSON or plaintext format since we 
cover that more in this class and these formats tend to be easier to work with. 
We also recommended finding APIs that don't require API keys, although some 
popular APIs require such keys (e.g. Google Maps, Spotify, etc). Some APIs 
have great documentation on how to use an API key to get started quickly, but 
others may be non-trivial to set up. Visit OH if you are having any questions 
about the API you want to use!
* Some API ideas:
    *   **Science**
        *   [NASA Open API's](https://api.nasa.gov/#getting-started)
        *   [Open Notify Space Station API's](http://open-notify.org/)
        *   [Astronomy API](https://www.programmableweb.com/api/astronomy)
        *   [uBio Biological Namebank API](https://www.programmableweb.com/api/ubio-namebank)
        *   [Enrichr Gene Database API](https://www.programmableweb.com/api/enrichr)
    *   **Health**
        *   [USDA Food Composition Databases](https://ndb.nal.usda.gov/ndb/doc/index)
        *   [Yummly Recipe and Food API](https://developer.yummly.com/)
        *   [Habitica Gamification API](https://habitica.com/apidoc/)
    *   **Linguistics**
        *   [Dictionary API](http://www.dictionaryapi.com/)
        *   [WordNik API](http://developer.wordnik.com/docs.html#!/word)
        *   [Word Cloud API](https://www.programmableweb.com/api/word-cloud)
    *   **Fun/Miscellaneous**
        *   [Flickr API](https://www.flickr.com/services/api/)
        *   [Reddit API](https://www.reddit.com/dev/api/)
        *   [Dog API](https://dog.ceo/dog-api/)
        *   [Jeopardy Question API](http://jservice.io/)
        *   [Giphy API](https://developers.giphy.com/docs/)
        *   [Game of Thrones API](https://anapioficeandfire.com/Documentation)
        *   [Pokeapi Pokemon API](http://pokeapi.co/)
        *   [Trivia Database API](https://opentdb.com/api_config.php)
        *   [Star Wars API](https://swapi.co/documentation)
        *   [Deck of Cards API](https://www.programmableweb.com/api/deck-cards)
        *   [IGDB Video Game Data API](https://www.igdb.com/api)
        *   [Data.gov Datasets](https://catalog.data.gov/dataset)
        *   [Discord API](https://discordapp.com/developers/docs)
    

## External Requirements
* Your website must somehow dynamically load information from a web API and 
present information from that source on the page. This requires that you must:
    * Respond to some event (whether it's the window `load` event, a timer event, or any UI event) to determine when to fetch the data, and
    * Dynamically integrate the data returned from the API into the page by manipulating the DOM elements of the page in some non-trivial way using `document.createElement`, `element.appendChild`, `element.removeChild`, or `element.replaceChild`, and
    * Gracefully handle errors by displaying an message to the user on the page (i.e. without using `alert` or `console.log`);

## Internal Requirements
* Your project must include the following three files at a minimum:
  * `index.html` - main page of your website
  * `index.css` - file to style your `.html` file
  * `index.js` - containing your JavaScript code 
* Your `index.js` file should be linked to your `index.html` or other `.html` files using 
   `<script src="...">` in the HTML `<head>`.
* Your `index.css` file should be linked to your `index.html` or other `.html` files using 
   `<link href="...">` in the HTML `<head>`.
* Links to your `.html`,  `.css` and `.js` files should be **relative links**, not absolute. 
* You should not have any JavaScript code in your HTML.
* You should not have any HTML tags as strings in your JavaScript code (e.g. `el.innerHTML = "<p>Foo</p>";`).
* Minimize styling in JS - prefer adding/removing classes to DOM elements instead, and
  style the classes in your CSS.
* Your AJAX code should use the Fetch API template that was shown in lecture/section/lab. 
* Any `.js` code you use must use the module-global pattern (recall the module-global template) and `"use strict";`.
* Your page should have a `window.addEventListener("load", functionName)` as shown in lecture/section/lab (use an appropriate `functionName`).
* Your page should include 
  [school appropriate content](https://courses.cs.washington.edu/courses/cse154/18au/syllabus/conduct.html#content) 
  and [copyrights and citations](https://courses.cs.washington.edu/courses/cse154/18au/syllabus/conduct.html#copyright). 
  If we find plaigarism in CPs or inappropriate content, **you will be ineligible for any points on the CP**. Ask the 
  instructors if you're unsure  if your work is appropriate.

## Style and Documentation
* Your HTML, CSS, and JavaScript should demonstrate good code quality as demonstrated in class and
  detailed in the [CSE 154 Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/18au/resources/styleguide/index.html). 
  Part of your grade will come from using consistent indentation, proper naming conventions, curly brace locations, etc. 
* Place a comment header in each file with your name, section, a brief description of the assignment, and the files contents. Examples: 

    HTML File: 

    ```
<!--
     Name: Mowgli Hovik 
     Date: September 30, 2018
     Section: CSE 154 AB
     This is the index.html page for my portfolio of web development work. It includes links to side 
     projects I have done during CSE 154, including an AboutMe page, a blog template, and 
     a crytogram generator.
-->
    ```

    CSS File: 

    ```
/*
  Name: Mowgli Hovik
  Date: September 30, 2018
  Section: CSE 154 AB
  This is the index.css page for my portfolio of web development work. 
  It is used by all pages in my portfolio to give the site a consistent look and feel. 
*/
    ```

    JS File: 

    ```
/*
 * Name: Mowgli Hovik
 * Date: September 30, 2018
 * Section: CSE 154 AB
 * This is the JS to implement the UI for my cryptogram generator, and generate
 * different types of ciphers from user input.
 */
    ```
* Decompose your JS by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions - no function should be more than 40 lines of code.
* Localize your variables as much as possible. You should not use any global variables (outside the module pattern) as per the code quality guide. 
* Only use module-global variables whenever absolutely necessary.
* Limit your use of anonymous functions - meaningful behavior should be factored out with a named function
* Use `const` instead of `let` to store constant values (e.g. a API base url, a file path to your images if
  you are working with many images in your JS).
* Use [JSDoc](http://usejsdoc.org/) to document your JS functions with `@param`, `@returns` as discussed in the Code Quality Guide.
* HTML and CSS files must be well-formed and pass W3C validation. 
  Links to the [Code Validators](https://courses.cs.washington.edu/courses/cse154/18au/resources/index.html#validators)
  can be found on the course website.
* Your JS code must pass [JSLint](https://oxford.cs.washington.edu/cse154/jslint/) with no errors. 
* To keep line lengths manageable, do not place more than one block element on the same line or begin a block element past the 100th character on a line.

## Grading
This CP will be out of 8 points and will likely be distributed as: 
* External Correctness (3 pts) - The external requirements listed in this document are met. 
* Internal Correctness (3 pts) - The internal requirements listed in this document are met. 
* Style and Documentation (2 pts) - The style and documentation requirements in this document are met.  


## Late Day Challenge
You can earn one extra late day if make multiple, non-trivial `fetch` calls that do different things to the page. This could be two `fetch` calls to the same API or to two different APIs. 
