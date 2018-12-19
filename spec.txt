# Creative Project 4 Project Specification
## Overview
For your fourth creative project, you will create your own PHP web service available for use 
with AJAX and fetch. Once again, as a creative project, you have 
freedom to have more ownership in your work, as long as you meet the requirements listed below.

As a reminder, assignments will alternate between creative projects (CPs) and more formal homework
assessments (HWs). We have designed assignments to support each of the 5 modules of this
course, and for creative projects to prepare you for the following HW in each module.

That said, we encourage you to explore the new material covered in class, as well as
related (but optional) content we may link to along the way, as
long as you follow the CSE 154 code quality guidelines. This is your chance to:

1. Continue to build a websites that you can link to on your resume or code 
   portfolio (CPs can be public, most HWs cannot be).
2. Ask instructors and/or TAs about features you want to learn how to implement (we can
   provide more support for CPs than HWs) and ask for feedback/ideas on Piazza.
3. Apply what you're learning in CSE 154 to projects you are personally interested in and
   may use outside of just a CSE 154 assignment.
4. Optionally showcase your CP work on the CSE 154 Au CP showcase (we'll try to showcase 8-20
   websites per CP).
5. Get feedback on code quality when learning new technologies in CSE 154 to implement for
   the following HW, which will be worth more points.

In past quarters, some students have built upon their creative project each week. You may
choose to do a new website for each CP, or build on a single project, as long as you meet
each CP's requirements.

## Ideas for CP4
As long as you meet the requirements outlined below, you have freedom in what kind of
website you create. Here are some ideas for Autumn 2018 (Your instructors are more than
happy to help discuss more ideas in their office hours!):
* The code from lecture, section and lab are always good places to start. However, 
if you choose to use that as "starter" code you must a) cite that you are using 
the course code as a starting point and b) you must substantively change the output. 
* Recall that one of the benefits of writing functions in PHP instead of code you 
can write in JS is that you can quickly process data with file i/o. While you are 
not required to use file i/o in this CP, it can help create a pretty useful API. 
As an idea, consider writing your own folders and files to process and 
return data in JSON format in your API (e.g. see the random recipe generator 
exercise for Lab, where we created a small collection of txt files to process 
in the response).
* We've primarily practiced processing txt files and directory contents, but 
depending on your own interests and project focus, you can process other files 
like `.csv`, `.gcode` (3D coordinate files for 
[3D Printing models](https://benjaminjurke.com/content/articles/2015/gcode-primer/)), `.pdb` 
(protein code [encodings](https://en.wikipedia.org/wiki/Protein_Data_Bank_(file_format))), etc.
* This CP is designed to give you an opportunity to practice writing both client (JS) and server-side (PHP)
  code on your website. This is a great chance to think about how your project could showcase what
  you've learned so far in web programming for your own code portfolio after the quarter ends, so
  we encourage you to explore implementing different features of your web service!
    

## External Requirements
* Similar to HW4, you will be writing both JS and PHP to incorporate in your website, where your JS
  makes AJAX requests to **your** PHP web service which responds with information.
* JavaScript: Your website must use JS to somehow dynamically load information from your PHP web service and must present information from that source on the page. 
This requires that you must:
    * Respond to some event (whether it's the window `load` event, a timer event, 
    or any UI event) to determine when to fetch the data, and
    * Dynamically integrate the data returned from the API into the page by 
    manipulating the DOM elements of the page in some non-trivial way using 
    `document.createElement`, `element.appendChild`, `element.removeChild`, or 
    `element.replaceChild`, and
    * Handle errors by displaying an message to the user on the page when something goes wrong with the web service, or they give invalid input (i.e. without using `alert` or `console.log`);
* **new:** PHP: Your PHP web service should handle at least two **different** GET requests, one of which outputs
  JSON and one which outputs plain text. 
  * Details: This may include responding with different results depending on the value of a query parameter (e.g. `mode` or `format`), or it may include supporting different types of GET query parameters and returning different responses as a result. You may have multiple GET query parameters (optional or required) to support each of your requests (refer to different request parameters supported by other public APIs for ideas!)
  * Your PHP must handle at least one invalid request with a 400 error header and descriptive message as demonstrated in lecture (though you are encouraged to handle more than one). Possible errors include missing required GET parameters and passing in invalid values for supported GET parameters.
  * You may implement other types of PHP responses for more practice before HW4. In particular, we
    encourage you to practice with file/directory processing (see lectures, Week 7 Lab, and Week 8 Section for examples!).

## Internal Requirements
* Your project must include the following four files at a minimum:
  * `index.html` - main page of your website
  * `index.css` - file to style your `.html` file
  * `index.js` - containing your JavaScript code 
  * **new:** a `.php` web service your .js file fetches from with at least two different GET requests. 
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
* **new:** Your PHP web service should use `isset` to check for required GET parameters before using them.
* **new:** Your PHP web service should specify the correct content type with the `header` function before
  outputting any response, and should only set this when necessary (it's common for students to set
  this multiple times in their first PHP programs)
* **new:** Your PHP code should not generate any HTML (though you may check with instructors for exceptions to this rule depending on the context of your project)
* Any `.js` code you use must use the module-global pattern (recall the module-global template) and `"use strict";`.
* Your page should have a `window.addEventListener("load", functionName)` as shown in lecture/section/lab (use an appropriate `functionName`).
* Your page should include 
  [school appropriate content](https://courses.cs.washington.edu/courses/cse154/18au/syllabus/conduct.html#content) 
  and [copyrights and citations](https://courses.cs.washington.edu/courses/cse154/18au/syllabus/conduct.html#copyright). 
  If we find plaigarism in CPs or inappropriate content, **you will be ineligible for any points on the CP**. Ask the 
  instructors if you're unsure  if your work is appropriate.

## Style and Documentation
* Your HTML, CSS, JavaScript, and PHP should demonstrate good code quality as demonstrated in class and
  detailed in the [CSE 154 Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/18au/resources/styleguide/index.html). 
  Part of your grade will come from using consistent indentation, proper naming conventions, curly brace locations, etc. 
* Place a comment header in each file with your name, section, a brief description of the assignment, and the files contents. 
* Decompose your PHP and JS by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions - no function should be more than 40 lines of code.
* Localize your variables as much as possible. You should not use any global variables (outside the module pattern) as per the code quality guide, and your PHP code should have at least one function.
* Only use module-global variables whenever absolutely necessary.
* Limit your use of anonymous functions - meaningful behavior should be factored out with a named function
* Use `const` instead of `let` to store constant values (e.g. a API base url, a file path to your images if
  you are working with many images in your JS).
* Use [JSDoc](http://usejsdoc.org/) to document your JS functions with `@param`, `@returns` as discussed in the Code Quality Guide.
* **new** Document your PHP functions in a similar manner to our JSDoc requirements (e.g. `@param` and `@returns`). You may also use official [PHPDoc](https://en.wikipedia.org/wiki/PHPDoc) if you'd like. 
* HTML and CSS files must be well-formed and pass W3C validation. 
  Links to the [Code Validators](https://courses.cs.washington.edu/courses/cse154/18au/resources/index.html#validators)
  can be found on the course website.
* Your JS code must pass [JSLint](https://oxford.cs.washington.edu/cse154/jslint/) with no errors. 
* To keep line lengths manageable, do not place more than one block element on the same line or begin a block element past the 100th character on a line.

## Grading
This CP will be out of 8 points and will likely be distributed as: 
* External Correctness (4 pts) - The external requirements listed in this document are met. 
* Internal Correctness (2 pts) - The internal requirements listed in this document are met. 
* Style and Documentation (2 pts) - The style and documentation requirements in this document are met.  

## Late Day Challenge
You can earn one extra late day for successfully using use cookies, localStorage, 
sessionStorage, indexDB, or Dexie to store the results of your AJAX fetch request 
to your API. Note: You must use this browser storage technology as a benefit to the user
experience. To that end you should 
* Avoid calling the API if you have the information stored locally (and future requests return no new information). 
* Avoid unnecessarily resetting storage for each API call to avoid redundancy (this is a design
  decision that depends on the service/website - ask if you're unsure!).
