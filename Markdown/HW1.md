# Homework 1 - Portfolio -  Project Specification
## Overview
It can be advantageous to create a portfolio website, whether you are looking
for an internship or a job or you are interested in sharing work you’ve done
with a broader audience. This assignment has a number of goals, one of which
is to have you demonstrate your understanding of Module 1: HTML and CSS,
including proper choice of semantic HTML elements to structure your page and
appropriate use of CSS styles and layout techniques using selectors and
rules where needed.  A secondary goal is for you to apply what you have learned
to build a site that is useful to you during career fairs. Thus a sub goal of
this assignment will be for you to demonstrate your ability to successfully
publish your work on your own student server space at the University of Washington.

Note: it is expected that the work you do for this project be new and unique.
Thus we do not want you to re-use work you did for your Lab 1 or CP1 exercises
for your HW 1 solution.

## Ideas for HW1
We understand that not everyone will feel comfortable publishing a portfolio page with personal information on the UW student servers. Other options that will satisfy the requirements of this assignment could include a portfolio page of:

* A pet
* An animal
* A famous or fictitious person
* A business (real or fictitious)
* Artwork
* ... etc. (ask an instructor if you're unsure!)


## Learning Objectives
* Practice following CSE 154 assignment specifications, and more broadly, webpage specifications given a PDF and/or other visual and text-based artifacts as a design basis.
* Write your web page using raw HTML and CSS:
  * Choose appropriate HTML tags with an understanding of the semantic meaning of each tag and the context they are used in a webpage.
  * Use CSS positioning and Flexbox to determine page layout.
  * Use additional CSS properties to style a webpage.
  * Use ids and classes appropriately.
* Produce quality readable and maintainable code that conforms to class standards:
  * Separate content and structure (written in HTML) from your style (written in CSS).
  * Be able to test that your web pages are valid and conform to HTML and CSS standards
  * Reduce redundancy in your CSS by using context- and/or psuedo-selectors in your code.
  * Demonstrate understanding of the CSE 154 code quality expectations modeled in lectures, sections, labs, sample code and in the code quality guide.
* Use GitLab to maintain personal source code and turn in an assignment.
* Use tools to publish a webpage to a personal web server.

## Files to Submit
* ```index.html```: The file containing the HTML for your profile page
* ```index.css```: The stylesheet for index.html.
* ```images/*```: a directory of images that are used in your profile page.
* ```INFO.md```: file that contains information detailed [below](#infomd)

## Files Provided
Example screenshots for a sample profile for DD the Debug Dragon (a related homework assignment
assigned in 18sp):
* profile-screenshot.png
* profile-screenshot-large.png:
* profile-screenshot-mobile.png:

## External Requirements
Your web page must have the following external features:

### Overall HTML Page and Body
* Your webpage must have a page title of “Portfolio” (the text shown in a browser tab)  
* You must use at least two imported Google fonts for your page - one for the title of the webpage and one for the body of the page. Remember, Google fonts must be imported in the CSS file.
  * If the Google fonts are unavailable on the user's machine, any elements that use these fonts should default to the appropriate serif, sans serif, or cursive font (Note: font classifications (e.g. serif vs. sans-serif) should not be mixed for a single element - use the same font classification as the appropriate Google font when setting the default font. You can find the font classification on the Google font page.)
* Your page must have a distinct header, main and footer. These sections should also give the portfolio page a sense of cohesion by tying the page together.
* You must appropriately use the following elements somewhere on your web page:
  * At least one additional HTML5 semantic tag (other than header, main, and footer) in the body of your web page. The HTML5 semantic tags are listed [here](https://www.w3schools.com/html/html5_semantic_elements.asp)
  * A link either to another page you made on this site or an external website.
  * A list, either ordered or unordered.
  * A blockquote, table, [description list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl), or pre element.
  * At least one inline element (see the Inline section [here](https://www.w3schools.com/html/html_blocks.asp))
* At least one element of your web page should consist of a background image.
  * The background image must be fixed, and can be centered, stretched, or repeated
  * The background image must be somehow visible from behind the other elements that display on top that element while ensuring all the elements above are still legible (example in the sample screenshots, the background image is in on the body, but you can clearly see all of the other elements on the body, but we are not restricting you to that).
* The body of your web page should not span the entire width of the browser - in other words the width must be less than 100%.
* You must use Flexbox layout in at least one occurrence of your page to achieve a layout requirement. For remaining layout requirements, you may use Flebox or other CSS positioning methods (as appropriate).
* You are to correctly use at least two other styles on the body of your page, such as (box shadow, color, etc.).

### Header
* Your page header should contain at least two items, one of which must be an image, positioned to your liking. This can be a title and an image or two images, etc.
* You should use either Flexbox layout or other CSS positioning rules to achieve the layout.

### Main
* Your main must have at least three distinct content areas (articles, sections, or other divisions)
  * Each content area must have a unique “theme” that includes the layout and style of each section (see DD’s profile page for an example).
  * Each content area must include at least one image.
  * Each content area must include at minimum 1-2 paragraphs of text.
* You must use at least two different heading levels. These two heading levels may be in the same content area or in different ones.
* You must demonstrate the use of the box model (margins and padding) somewhere within the main content area of the page.

### Footer
* Your footer section should contain at least one image and some text.
* You footer should contain citations for any images used in on this page.
* Citations can also be in a comment in your code near near each image as well using a comment like this: `<!-- This is a comment -->` and then put put a general comment in the footer (something like "Images found on X, Y and Z websites" or "for images citations, please see the source of this file").
* Your footer should also contain any of your own personal copyright information.

### Uploading your portfolio to your student page
Once you have completed your project (but before you turn it in) you are to upload all materials to your Student Web Site. To do so you must:

1. Activate your [Shared Web Hosting](https://itconnect.uw.edu/connect/web-publishing/shared-hosting/activating-shared-web-hosting/)
2. Upload your files to your shared web space using [these instructions](https://courses.cs.washington.edu/courses/cse154/18au/homework/hw01/webupload/).
3. If you wish to keep your portfolio private, you can restrict access to the site using instructions found [here](https://itconnect.uw.edu/connect/web-publishing/shared-hosting/restricting-access/). Note: You must make it so your TA can view this page on your student shared hosting site, at least until your grade is finalized.

### INFO.md
While not an explicit goal of this course, it can be valuable to incude a `README.md` or `INFO.md` page in a Git repository you may show to interviewers to discuss your problem-solving process in a project, especialy when learning a new technology. We aren't requiring much here, but in your git repository you will add one more file, INFO.md, that contains the following:
* The URL of your web page on the student server web page.
* Any credits you need to give, such as other sites or people that gave you inspiration for your site.
* What is one takeaway you learned from this project? (1-2 sentences minimum, but you may add more).
* What future work you wish to accomplish on this website.

* Documentation on Gitlab Markdown (files ending in .md) can be found [here](https://docs.gitlab.com/ee/user/markdown.html) but the template we wish you to use is:

```
# Portfolio Page

## Link Location
https:// <insert link location here>

## Credits
Any credits you need to give, such as other sites or people that gave you inspiration for your site.

## Takeaway
At least 1-2 sentences of takeaways from this project.

## Future work
At least 2-4 sentences of what future work you wish to accomplish on this website if you had more time.
```

### Web Page Content

#### School Appropriateness of Content

Recall that one of our course policies is to engender an [inclusive environment](https://courses.cs.washington.edu/courses/cse154/18au/syllabus/inclusion.html). As such it is important that you are thoughtful about what you choose to post on your page. Please make sure that the images and text you are using are “school appropriate” and follow the guidelines of expected behavior. If you have any questions, please do not hesitate to ask a TA or your instructor.

#### Copyright and Citations
You must have the right to publish any of the images, videos, text, or other media on your site. This means you may use
* Media you have created or generated yourself (i.e. pictures you have created or taken yourself, text you have written yourself.)
* Images that are in the public domain (something from Wikipedia), or something with a creative commons license that allows for reuse without explicit permission of the owner.
  * [Creative Commons Kiwi](https://creativecommons.org/about/videos/creative-commons-kiwi/) is a really informative video on Creative Commons licensing.
  * Instructions on how to search for images that are fair use are [here](https://support.google.com/websearch/answer/29508?hl=en).
  * You must cite any works that you use that you did not generate yourself (although technically you only need to cite things that are [CC: attribution](https://creativecommons.org/licenses/by/2.0/)).
  * A handy site for knowing how to add your citations is [here](https://wiki.creativecommons.org/wiki/Best_practices_for_attribution)
  * A handy tag citations is the [```<cite>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) tag


## Internal Requirements
For full credit, your page must not only match the external “look and feel”
requirements listed above, you must also demonstrate that you understand what
it means to write code up to the standards expected by this class. This
includes the following requirements:

* You may not use any HTML/CSS frameworks for this assignment.
* All of your work must be your original work, you may not collaborate with any other students or cite other sources on this assignment.
* Your page must use valid HTML5 and CSS3 and successfully pass both the W3C HTML5 and W3C CSS3 validators with no errors.
* Do not express style information in the HTML, such as inline styles or presentational HTML tags such as ```<b>``` or ```<font>```.
* Do not use any deprecated HTML tags listed on this page http://www.tutorialspoint.com/html5/html5_deprecated_tags.htm.
* Use HTML5 organizational tags such as ```header```, ```footer```, ```main```, ```aside```, ```article```, ```section```, and ```nav``` for dividing your page into sections and give them semantic meaning.
  * You may still use the ```div``` tag for dividing your page, but as discussed in lecture "```div``` should be your last resort when an element has no semantic value"
* Prefer organizational tags over ids and classes when appropriate.
* Use h1-h6 tags as appropriate. Do not skip heading levels in your page to get smaller headings (use CSS instead if desired).
* Express all stylistic information on the page using CSS defined in index.css. The majority of the points for this assignment will be for the index.css file.
* Part of your grade comes from expressing your CSS concisely and without unnecessary or redundant styles. For example, the content block shares many (if not all) styles in common, so you should not specify those styles twice in your CSS file.
* Use context selectors to avoid needing to apply classes and ids to large numbers of elements.
* Format your HTML and CSS to be as readable as possible, similar to the examples from class:
  * Place a comment header in each file with your name, section, a brief description of the assignment, and the files contents.
  * Properly use whitespace and indent your HTML and CSS code as shown in class and in the CSE 154 code quality guide

## Style and Documentation
* Your HTML and CSS should demonstrate good code quality as demonstrated in class and
  detailed in the [CSE 154 Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/18au/resources/styleguide/index.html). Part of your grade will come from using consistent indentation,
  proper naming conventions, curly brace locations, etc.
* To keep line lengths manageable, do not place more than one block element on the same line or begin a block element past the 100th character on a line.
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

## Grading
This HW will be out of 30 points and will roughly (subject to small adjustments) be distributed as:
* External Correctness (12 pts) - The external requirements listed in this document are met.
* Internal Correctness (13 pts) - The internal requirements listed in this document are met.
* Style and Documentation (4 pts) - The style and documentation requirements in this document are met.  
* Project Summary (1pt) - `INFO.md` requirements are met.
