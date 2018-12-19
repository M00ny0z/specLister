# Homework 4 - Bestreads - Project Specification

*Special thanks to Allison Obourn for the original version of this assignment.*

## Overview
This assignment is about making a web service and using AJAX to retrieve data
from it. You will write a PHP service that will generate a variety of data about
different books depending on the parameters it is sent. You will also write
JavaScript to make requests to this service and use the responses to update pages on your site.

<p>
  <img src="screenshots/overview-img.png" width="60%" alt="Bestreads main view">
</p>
Figure 1: Bestreads front page (rendered in Chrome on Mac OSX)

### Learning Objectives
* Continue to practice all of the CSE 154 learning objectives from previous assignments, including:
    * Carefully reading and following assignment specifications, and more broadly, webpage
specifications given visual and text-based artifacts as a design basis.
    * Reducing redundancy in your code while producing expected output.
    * Listening and responding to user events using JS event handlers on DOM objects.
    * Modifying your web page using JS and DOM objects.
    * Producing quality readable and maintainable code with unobtrusive modular JavaScript.
    * Clearly documenting your code using JSDoc conventions as specified in the CSE 154 Code Quality Guide.
    * Fetch text and JSON data from two web services using JavaScript `fetch`
    * Implement toggling between view states using JavaScript and provided CSS helper classes
* Building an API that responds to GET requests using the PHP language
* Using the PHP language to read information from the server's file system
* Producing quality readable and maintainable PHP code with clear documentation.

### Starter Files and Final Deliverables

In this HW4 repository you will find the following starter files:

| File/folders&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    | Repository files to stay unchanged |
|--------------------|------------------------------|
| `bestreads.html` |  The HTML page for displaying a Bestreads page.|
| `bestreads.css`  |  The stylesheet for `bestreads.html`. |
| `books/`         | The books directory with all of the book images, details and review files.|
| `images/`        | All images used by the HTML and CSS for the webpage. |
| `screenshots/`   | A folder of screenshots for this `README.md` |

Your repository should be submitted with these (**unchanged**) starter files (with one exception below)
as well as the following files you are to implement:

| File          | Repository file you will implement and turn in |
|---------------|------------------------------|
| `bestreads.php` |The PHP service that will supply the book data. |
| `bestreads.js`  | The JavaScript that will request the information from `bestreads.php` and populate it into `bestreads.html`. |

Your solution will be graded only on `bestreads.php` and `bestreads.js` - any changes you
make to `bestreads.html` or `bestreads.css` will not be eligible for full credit.

The one exception to is that you may, if you wish, you may add books to the `books/` directory and
turn them in along side your other work provided
you add them in the same format as other directories. See Web Service Details on what each
subdirectory of the `books` directory contains. We will add particularly creative books/reviews
to future iterations of the assignment!

## External Requirements
Your webpage should match the overall appearance/behavior of the provided screenshots and
it **must** match the appearance/behavior specified in this document.

When the page loads it should display the images and titles of each book for which you have data
in a grid as depicted in Figure 1. The interface for this page is fairly straightforward: When
the mouse hovers over a book on the main page, the cursor should turn to a pointer indicating
that the user may click on that title. Clicking on any portion of a book cover (the title, image
or rectangle container) hides the `#allbooks` section and it will show the book details page (contained
in the `#singlebook` section). The `#singlebook` section will be populated with all of the
information about that book, as shown in Figure 2.

The Home button in the upper right corner of the screen will also indicate that it is clickable
by displaying a pointer cursor when the user hovers over it. If clicked, the user will be returned to the `#allbooks` view.

<p>
  <img src="screenshots/singlebook-img.png" width="60%" alt="Single Book main view">
</p>
Figure 2: Bestreads single book image page (rendered in Chrome on Mac OSX)

The information displayed on these pages will be retrieved through `GET` requests to the
API you create.  You should send a request to the server for data for this book and display its cover image,
title, author, description and reviews. Based on the reviews, you will also set the overall rating
for the book.

If at any time there is an error, the entire `#book-data` section (which contains both the
`#allbooks` and `#singlebooks` sections) will be hidden and the `#error-text` will appear
with the error that is returned from the server. Sample errors are shown in Figure 3 below.

<p>
  <img src="screenshots/error-mode-img.png" width="60%" alt="Missing mode error displayed">
</p>
<p>
  <img src="screenshots/error-mode-title-img.png" width="60%" alt="Missing title error displayed">
</p>
Figure 3: Sample Bestreads sample errors displayed (rendered in Chrome on Mac OSX)

## Web Service details
The `books` directory contained in this repository will contain the input files for many books
described on the next page. This subdirectory must be in the same directory as your `HTML`, `CSS`,
`JS`, and `PHP` files. This will allow you to use relative paths to the files in each directory,
such as `books/harrypotter/info.txt` and `books/wizardofoz/cover.jpg` in your code, which will be
necessary in order for your site to function properly when turned in.

Your service will respond to the following two GET parameters: `mode` and `title`. Valid values of `mode`
are `description`, `info`, `reviews`, or `books`, depending on what information you want to retrieve.
The value of `title` should be a string representing a single book that you would like information
about. An example request might be:

``` bestreads.php?mode=description&title=harrypotter ```

### Web Service Implementation Details
* Your PHP code can retrieve these parameters into local variables using code such as the following:
`$book = $_GET["title"]`;
* All of your PHP code should use these parameters’ values, and you should never hard-code particular book
names.
* You should check that the parameters passed in are correct and have valid values. If they are not correct
you should output the **descriptive** 400 error messages **of your choosing**. For instance, if the
mode is missing you could return the plain text:

```Error: Please provide a mode of description, info, reviews, or books.```


and if the mode of description, info, or reviews is given with no title, you might output:

``` Error: Please remember to add the title parameter when using a mode of description, info or reviews. ```

For full credit, you must not use the same error message for all errors.

* Each book is stored in a subdirectory in the `books` directory. Each subdirectory for books follow
  a strict lowercase naming convention with no spaces. For example, the book `harrypotter` stores its files in a folder named
`books/harrypotter/`. You are to retrieve the book details (based on the mode variable's value: `description`,
`info`, or `reviews`) in the subdirectory corresponding to the title parameter.
* If the book does not exist (i.e. there is no corresponding folder for the name of the book passed in with
the title parameter), you may choose to output nothing (which honestly is the easiest to do, but least
user-friendly) or you can choose to output a descriptive 400 error message of your choosing.
* The folder `books/harrypotter/` will contain the following text files `description.txt`, `info.txt`,
`review1.txt`, `review2.txt`, ... (the number of reviews may vary).
* All extraneous trailing whitespace from information read in from the above files should be removed before
being returned by your web service. You may find the PHP `trim` function useful for handling this,
but note that part of your grade will come from not overusing string/array/file functions (keep
efficiency and redundancy in mind).

### Web Service Parameter Description
Your `bestreads.php` service will provide different data based upon the `GET` query parameters `mode` and `title`
that are passed in. These are described below:

#### Query 1: Get a book’s description
**Request Format:** `bestreads.php?mode=description&title={title}`  
**Request Type:** `GET`  
**Returned Data Format:** plain text  
**Description:** The `title` parameter must also be passed with this mode. Your service should locate the file  
called `description.txt` for the book, and output the entire contents as plain text.  
**Example Request:** `bestreads.php?mode=description&title=harrypotter`  
**Example Output:** (abbreviated)  
```
Harry Potter is lucky to reach the age of thirteen, since he has already survived the murderous
attacks of the feared Dark Lord on more than one occasion. But his hopes for a quiet term
concentrating on Quidditch are dashed when a maniacal mass-murderer escapes from Azkaban, pursued
by the soul-sucking ...
```

#### Query 2: Get a book’s information
**Request Format:** `bestreads.php?mode=info&title={title}`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  
**Description:** Your service should output the contents of `info.txt`, a file with two lines of
information about the book: its title and author in JSON format.  
**Example Request:** `bestreads.php?mode=info&title=harrypotter`  
**Example Output:** (abbreviated)  

```json
{
  "title":"Harry Potter and the Prisoner of Azkaban",
  "author":"by J.K. Rowling, Mary GrandPre(Illustrator)",
}
```

#### Query 3: Get a book’s reviews
**Request Format:** `bestreads.php?mode=reviews&title={title}`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  
**Description:** Output an array (in JSON form) containing all of the reviews for the book, the review score, and
the name of the reviewer. The reviews are stored in files called `review1.txt`, `review2.txt`, etc. Each file
contains one review for each book which is exactly three lines: The reviewer’s name, the number of stars they
gave the book and their review. If a book has 10 or more reviews, the names will be e.g. `review01.txt`, ....
So don’t hard-code file names like "`review1.txt`"; instead, look for all files that begin with "`review`" and end
with "`.txt`".  
**Example Request:** `bestreads.php?mode=reviews&title=harrypotter`  
**Example Output:** (abbreviated)  
```json
[
  {
    "name" : "Wil Wheaton",
    "score" : 4,
    "text" : "I'm beginning to wonder if there will ever be a Defense Against The Dark Arts teacher who is just a teacher"
  },
  {
    "name" : "Zoe",
    "score" : 5,
    "text" : "Yup yup yup I love this book"
  },
  {
    "name" : "Kiki"
    "score" : 5,
    "text" : "Literally one of the best books I've ever read. I was chained to it for two days."
  }
]
```

#### Query 4: Get the list of books
**Request Format:** `bestreads.php?mode=books`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  
**Description:** Outputs JSON containing the titles and folder names for each of the books that you have data
for. Find all the books inside the books folder, and build JSON containing information about each one.
Your overall JSON object should have one property `"books"` that points to an array of books. Each book should
be represented by an object with two properties: `title`, and `folder`. You’ll need to extract the title of
the book from the book’s `info.txt`. The folder property should be set to the name of the folder that contains
the resources about that particular book.  

Note, that if you add more books into the books folder, your PHP code should serve these additional books
without modification to your PHP file.   
**Example Request:** `bestreads.php?mode=books`  
**Example Output:** (abbreviated)  
```json
{
  "books" : [
    {
      "title": "Harry Potter and the Prisoner of Azkaban",
      "folder": "harrypotter"
    },
    {
      "title": "The Hobbit",
      "folder": "hobbit"
    },
    ... (one entry like this for each folder inside books/)
  ]
}
```

### JavaScript Details
Your `bestreads.js` will use AJAX `fetch` to request data from your PHP service and insert it into
`bestreads.html`. Here is the functionality your page should have:

* When the page loads it should request all of the books (`mode=books`) from the web service. It should
display each of these books by adding the image of the books cover and the books title (in a paragraph)
to a div and adding that div to the `#allbooks` section already on the page. The `#singlebook` section
should be hidden. To assist you we have provided the `.hidden` class in `bestreads.css`.

* Note: Only one listing for each book returned by the API should appear on the page.

* It should be apparent to the user that they can click on a book. Thus the
cursor should turn to a pointer when the user's mouse is hovering over either a Book
cover, title, or container. To assist you we have provided the `.selectable` class in
`bestreads.css`. (The Home button is already set to include the class `selectable` in the provided
  HTML.)

* When a user clicks on a book cover, or title of a book, or the container holding both, the
`#allbooks` section should be hidden and the `#singlebook` section should be shown. You should then request
the info, description and reviews for that book from the server. The title and author retrieved from
the info and the description requests, should be inserted into the `#book-title`, `#book-author`,
and `#book-description` elements in the `#singlebook` section.  

* You will need to create elements to append the reviews into the `#book-reviews` section of the page:

  * The title of the review is the name of the reviewer and should be placed into an `h3`.
  * The score of the review should be placed in an `h4` prepended with `"Rating: "`. For example if a
  review had a score of 4.3 from a reviewer, the second line of the review would display:
  ```Rating: 4.3 ```
  * The text of the review should be inserted into a `p` element.
  * The `h3`, `h4` and the `p` may be appended directly into the `#book-reviews` section.

* You will need to calculate the value for the `#book-stars` element of the `#singlebook` section. This
can be accomplished by averaging the ratings from each review (above). The value for the `#book-stars`
element should be rounded to 1 decimal place, which can be accomplished using the following formula
([`toFixed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) is used to return a string representation always having a precision of 1 digit after the
decimal, otherwise whole numbers will be output without a decimal, which is inconsistent for a
rating scheme):

```javascript
let roundedValue = Math.round(oldValue * 10) / 10;
let formattedNum = roundedValue.toFixed(1);
```

You may assume all books have at least one review.

* Your fetch should include a `.catch` function call to handle the unlikely event that the `bestreads.php` web
service returns an error. If an error does occur the `#error-message` section should be shown with an
error message displayed to the user. Whenever error is not present, the error-message article should
be hidden.

**IMPORTANT NOTE:** You must change your `checkStatus` function to the following in order to get the correct  
text from the API's error response.

```javascript
/**
 * Helper function to return the response's result text if successful, otherwise
 * returns the rejected Promise result with an error status and corresponding text
 * @param {object} response - response to check for success/error
 * @returns {object} - valid result text if response was successful, otherwise rejected
 *                     Promise result
 */
 function checkStatus(response) {
  const OK = 200;
  const ERROR = 300;
  let responseText = response.text();
  if (response.status >= OK && response.status < ERROR || response.status === 0) {
    return responseText;
  } else {
    return responseText.then(Promise.reject.bind(Promise));
  }
}
```

* If the home button on the upper right is clicked the `#singlebook` section should be hidden and
the `#allbooks` section should be displayed with all of the books still shown. You may assume
that the list of books won't change between visits to the `#allbooks` view, and thus you should not
make unnecessary requests to the server.


## Development Strategies

* PHP code is difficult to debug if you have errors. Write the program incrementally, adding small pieces of
code to a working page, and not advancing until you have tested the new code. The following functions
may be helpful:

  * `count` - returns the number of elements in an array
  * `explode` - breaks apart a string into an array of smaller strings based on a delimiter
  * `file` - reads the lines of a file and returns them as an array
  * `glob` - given a file path or wildcard such as `"foo/bar/*.jpg"`, returns an array of matching file names
  * `list` - unpacks an array into a set of variables; useful for dealing with fixed-size arrays of data
  * `trim` - removes whitespace at the start/end of a string (gets rid of stray spaces in output)

* We recommend developing the PHP parts of the assignment first, as it can be hard to track down problems
in JavaScript and PHP at the same time.
* Before using JavaScript to test your PHP page, consider using your browser to visit your PHP URL, passing
the appropriate query parameters, until you are satisfied that your PHP program is producing the correct
output. Then, build your AJAX calls to use the PHP web services to make sure you can get the correct
data into your JavaScript program. From there, use JavaScript to modify the page appropriately.
* Make sure to test your code on all available books in the repository. You may want to think about other
edge cases, such as what your page should do if the book has only a single review, etc. You should not
have code that depends on particular books or uses if/else statements to see which book to display.
* Use the CSE 154 JSLint to look for possible errors or warnings. For full credit, your JavaScript code must pass the provided JSLint tool with no errors reported. ("Warnings" are okay.)

## Internal Requirements
For full credit, your page must not only match the external requirements listed above, but must also
demonstrate good use of JS and PHP and overall code quality. This includes the following requirements:

* All of your work must be your original work (other than the starter HTML, CSS, and provided image files)
* You may not collaborate with any other students or cite other sources on this assignment.
* All programatically generated image DOM elements should be given an alt tag.
* Your `.js` file must be in the module pattern and run in strict mode by putting `"use strict";`
  within your file (inside your module pattern).
* Do not use any global variables, and minimize the use of module-global variables. Do not ever
  store DOM element objects, such as those returned by the `document.getElementById` function, as
  global variables.
  * Other variables should be localized as much as possible.
* If a particular literal value is used frequently, declare it as a module-global "constant" (`const`)
`IN_UPPER_CASE` and use the constant in your code.
* Avoid unnecessary fetch requests to web services - you should only make requests where needed to update DOM elements based on the expected behavior outlined in this spec.
* You should make an extra effort to minimize redundant JavaScript and PHP code. Capture common operations as functions to keep code size and complexity from growing. You can reduce your
code size by using the `this` keyword in your event handlers.
* Separate content (`HTML`), presentation (`CSS`), and behavior (`JS`). Your JS code should use styles and classes from the CSS when provided rather than manually setting each style property in the JS. For example, rather than setting the
`.style.display` of a DOM object to make it hidden/visible, instead, add/remove the `.hidden`
class in the provided CSS to the object's `classList`. You may find the `classList`'s [toggle](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Methods) function helpful for toggling certain classes.
* You should not use any external JS frameworks or libraries such as jQuery to solve this assignment.
* For full credit, your page must use valid JS and successfully pass our
  [CSE 154 JSLint](https://oxford.cs.washington.edu/cse154/jslint/) with no errors.
* Your JS and PHP should also maintain good code quality by following the
  [guide](https://courses.cs.washington.edu/courses/cse154/18au/resources/styleguide/index.html) posted on the
  class web site. We also expect you to implement relevant feedback from previous assignments.
* Format your JS and PHP to be as readable as possible, similarly to the examples from class:
  * Place a comment header in each file with your name, section, a brief description of the assignment,
    and the files contents (examples have been given on previous assignments).
  * Properly use whitespace and indent your code as shown in class and in the CSE
    154 code quality guide.
  * To keep line lengths manageable, do not place more than one block element on the same line or
    begin a block element past the 100th character on a line.
  * Use JSDoc to properly document all of your JS functions with `@param` and `@returns` where necessary.
  *  Your PHP variables and functions should be similarly documented in a style like JSDOC documenting the method’s description, parameters and return values.
  * Remember to use the standard `under_score` naming conventions for PHP variables and functions (whereas
    JavaScript variables and functions use `camelCase` conventions)
* Avoid unnecessary fetch requests to web services - you should only make requests where needed to update
  DOM elements based on the expected behavior outlined in this spec.
* Your PHP code should not cause errors or warnings. Add `error_reporting(E_ALL);` to the top of your
  .php file so errors are thrown and not kept silent.
* Do not use the PHP `global` keyword.
* Utilize PHP functions for good readability. Capture common operations as functions to keep code size and
complexity from growing
* Do not include any files in your final repository other than those outlined in "Starter Files and Final Deliverables".

## Grading
This assignment will be out of 30 points. The key areas we will be looking at assess directly relate
to the learning objectives, and your matching the specification for the external behavior as well as
the internal correctness of your code. **NOTE:** While we can not guarantee the same distribution of
points, past rubrics have been split with 50% of the points allocated to external correctness and
the 35% for internal. Thus a **potential** rubric **might be** summarized as:  

### External Correctness (15 pts)
*  web service (PHP)
  * accesses and uses parameters correctly
  * correctly responds to the 4 modes (`description`, `info`, `reviews`, `books`)
  * correctly responds with error messages
* service client (JS)
  * displays all book images and titles on page load
  * displays information on single book click, including calculated overall rating.
  * home button works correctly
  * multiple books can be viewed properly
  * errors are handled gracefully

### Internal Correctness (15 pts)
* PHP
  * sets up the content type and error modes correctly
  * avoids redundancy and follows style guide
  * uses functions to handle different parts of the PHP program
  * uses `json_encode` correctly
* JavaScript
  * Passes the [CSE 154 JSLint](https://oxford.cs.washington.edu/cse154/jslint/) and follows
  [Code Quality guide](https://courses.cs.washington.edu/courses/cse154/18au/resources/styleguide/index.html)
  * Demonstrates appropriate use of Ajax `fetch`
  * Demonstrates appropriate use of JSON
  * No globals (module pattern); minimizes module-globals; uses variables well
  * Factors redundancy in JS (e.g. toggling views, playing moves, etc.)
* All functions are clearly documented using JSDoc as described in the Code Quality guide
* Otherwise good quality code - a catch all for things like indentation, good identifier names,
long lines, large anonymous functions, etc.

## Academic Integrity
As with any CS homework assignment, you may not place your solution to a publicly-accessible web
site, neither during nor after the school quarter is over. Doing so is considered a violation of our
course [academic integrity](https://courses.cs.washington.edu/courses/cse154/18au/syllabus/conduct.html)
policy. As a reminder: This page page states:

The Paul G Allen School has an entire page on
[Academic Misconduct](https://www.cs.washington.edu/academics/misconduct) within the context of
Computer Science, and the University of Washington has an entire page on how
[Academic Misconduct](https://www.washington.edu/cssc/for-students/academic-misconduct/) is
handled on their
[Community Standards and Student Conduct](https://www.washington.edu/cssc/) Page. Please acquaint
yourself with both of those pages, and in particular how academic misconduct will be reported to
the University.
