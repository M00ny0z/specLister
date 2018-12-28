# SpecLister

## Part 1: Working Client-Side version
Part 1 involved creating various string functions in JS so that all of the MARKDOWN parsing be done
client-side.
This version involved the user copy/pasting the contents of the markdown file into a text-box and
having the browser first format the requirements into a format designed by me, for easy transfer
from the server to the website and vice-versa.
Then it would take said format and format it into HTML and give the appropriate CSS which is styled
based on MARKDOWN style in gitlab.
The server would save the completion on the server and can be requested back.
Part 1 also included the development of other features, such as a visual completion status, moving
completed items to a separate view, and removing the current spec and starting a different one.

## Part 2: Working server-side version with Python/Flask
Part 2 involved taking the working JS code and converting it into Python and using a Python based
server instead of a PHP one keeping true with PHP best practices.
The new method being the instructor places a markdown file into the markdown directory. The server
detects upon the next time a user access the website if a new specification has been added and does
all of the parsing server-side and saves the pre-HTML formatting for any other user to access and
gives it to the user.
The user progress is stored with a userkey which is saved on the client-side and on a database,
along with a JSON object representing the user-progress on the specific assignment all of which is
saved in a SQL database.
