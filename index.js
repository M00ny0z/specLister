/*
* Name: Emmanuel Munoz
* Date: November 12, 2018
* Section: CSE 154 AJ
* This is the JS to implement the UI and generate the list of specification items depending on user
* input. This also implements the communication between the server saving the spec information
* Also implements functionality to allow students to remove each line as they complete it
* Credit given to 154 staff for CheckStatus function
*/
(function() {
  "use strict";
  window.addEventListener("load", main);
  //window.addEventListener("load", init);
  let URL = "index.php";
  let count = 1;
  let reqs;

  function init() {
    let addBttn = document.getElementById("addSpec");
    let removeBttn = document.getElementById("remove");
    let uploadBttn = document.getElementById("upload");
    let resetBttn = document.getElementById("newSpec");
    addBttn.addEventListener("click", tryThing);
  }

  function tryThing() {
    // IF TEXT HAS 4 SPACES BEFORE AND THE REST IS SPACE\N\N_4SPACES'''
    let overallSpec = document.getElementById("specField").value;
    //console.log(isCodeBlockDesc(overallSpec));
    console.log(findNonIndicator(overallSpec));
    // if(isCodeBlock(overallSpec)) {
    //   let codeBlock = document.createElement("div");
    //   overallSpec = createCodeBlock(overallSpec, codeBlock);
    // } else if(isCodeBlockDesc(overallSpec)) {
    //   overallSpec = overallSpec.substring(4);
    //   let codeExample = document.createElement("div");
    //   let desc = document.createElement("span");
    //   desc.classList.add("bold");
    //   desc.innerText = overallSpec.substring(0, overallSpec.indexOf(":") + 1);
    //   overallSpec = overallSpec.substring(overallSpec.indexOf("```"));
    //   codeExample.appendChild(desc);
    //   document.getElementById("requirements").appendChild(codeExample);
    //   createCodeBlock(overallSpec, codeExample);
    // }
    // let currentChar = "";
    // let current = 0;
    // while(current < overallSpec.length) {
    //   currentChar = overallSpec.substring(current, current + 1);
    //   current = current + 1;
    // }
  }

  function createCodeBlock(overallSpec, container) {
    overallSpec = overallSpec.substring(3);
    let newBlock = document.createElement("code");
    let endIndex = overallSpec.indexOf("```");
    newBlock.innerText = overallSpec.substring(0, endIndex);
    container.appendChild(newBlock);
    overallSpec = overallSpec.substring(endIndex + 3);
    return overallSpec;
  }

  function isHeader(overallSpec) {
    if(overallSpec.substring(0,1) === "#") {
      let endIndex = 0;
      while(overallSpec.substring(endIndex, endIndex + 1) === "#") {
        endIndex = endIndex + 1;
      }
      let val = overallSpec.substring(endIndex, endIndex + 1);
      if(overallSpec.substring(endIndex, endIndex + 1) === " ") {
        return true;
      }
    }
    return false;
  }

  function isNumberList(overallSpec) {
    return overallSpec.charCodeAt(0) >= 48 && overallSpec.charCodeAt(0) <= 57 && overallSpec.charAt(1) === "." && overallSpec.charAt(2) === " ";
  }

  // SECOND CHECK AUTO GOES TO TRUE IF ANOTHER EXISTS, SHOULD BE RESTRICTED TO CURRENT ONE
  function isCodeBlockDesc(overallSpec) {
    let spacesBefore = overallSpec.indexOf("    ");
    // PLUS TWO TO INCLUDE THE SPACE AFTER COLON
    // LIMITS TO ONLY ONE, CURRENT POSSIBLE CODE BLOCK
    let limited = overallSpec.substring(overallSpec.indexOf("\n"), overallSpec.indexOf("\n") + 9);
    //let firstCheck = limited.indexOf("\n\n") === 0;
    let followingBlock = limited.indexOf("\n\n    ```");
    return spacesBefore === 0 && followingBlock === 0;
  }

  function isCodeBlock(overallSpec) {
    return overallSpec.indexOf("```") === 0;
  }

  function headerCount(overallSpec) {
    let headerCount = 0;
    let endIndex = 0;
    while(overallSpec.substring(endIndex, endIndex + 1) === "#") {
      endIndex = endIndex + 1;
      headerCount = headerCount + 1;
    }
    return headerCount;
  }

  /**
    * Attches the buttons to relevant event handling functions
    * If a spec has been previously uploaded to the server, gets the data and repopulates the page
  */
  function main() {
    let addBttn = document.getElementById("addSpec");
    let removeBttn = document.getElementById("remove");
    let uploadBttn = document.getElementById("upload");
    let resetBttn = document.getElementById("newSpec");
    uploadBttn.addEventListener("click", saveInformation);
    addBttn.addEventListener("click", addSpec);
    removeBttn.addEventListener("click", updateList);
    resetBttn.addEventListener("click", killList);

    fetch((URL + "?info=true"))
      .then(checkStatus)
      .then(JSON.parse)
      .then(function(data) {
        if(data != "No data") {
          let container = document.getElementById("requirements");
          let requirements = data.requirements;
          reqs = data.requirements;
          createSection("");
        }
      })
      .catch(reportError);
  }

  /**
    * Parses Markdown text into corresponding HTML by a single line at a time,
    * Assumes the line starts with an asterisk which indicates a requirement line
    * @param {String} currentLine - The single specification line to convert into HTML
    * @return {HTMLElement} specContainer - The entire line converted into HTML
  */
  function checkCodeByLetters(currentLine) {
    let specContainer = document.createElement("div");
    // REMOVES THE ASTERISK IN FRONT OF EVERY LINE
    currentLine = currentLine.trim();
    while(currentLine.length != 0) {
      let currentChar = currentLine.substring(0,1);
      if(currentChar === "\`") {
        currentLine = addCode(currentLine, specContainer);
      } else if(currentChar === "[" && isLink(currentLine)) {
        currentLine = addLink(currentLine, specContainer);
      } else if(currentChar === " ") {
        // SIMPLY ADDS THE SPACE
        specContainer.innerHTML = specContainer.innerHTML + currentChar;
        currentLine = currentLine.substring(1);
      } else if ((currentChar === "*" || currentChar === "_") && whichCase(currentLine) != -1) {
        // HANDLES EMPHASIS CASE
        currentLine = addEmphasis(currentLine, specContainer);
      } else {
        currentLine = addWord(currentLine, specContainer);
      }
    }
    return specContainer;
  }

  /**
    * Takes a MD link piece and converts it into HTML link
    * Returns the remaining currentLine with the link and associated indication characters removed
    * @param {String} currentLine - The currentLine with the link to be made at the front
    * @param {HTMLElement} container - The container to place the completed HTMLLink Element into
    * @return {String} currentLine - The string parts that remain after removing the MD link text
  */
  function addLink(currentLine, container) {
    let count = 0;
    let newLink = document.createElement("a");
    currentLine = currentLine.substring(1);
    let linkName = currentLine.substring(0, currentLine.indexOf("]"));
    currentLine = currentLine.substring(currentLine.indexOf("]") + 2);
    // REMOVES THE WORD AND THE PARENTHESIS AND THE BEGINNING BRACKET
    let linkSrc = currentLine.substring(0, currentLine.indexOf(")"));
    currentLine = currentLine.substring(currentLine.indexOf(")") + 1);
    newLink.href = linkSrc;
    newLink.innerText = linkName;
    container.appendChild(newLink);
    return currentLine;
  }

  /**
    * Takes a string and returns if the front of the string is a MD link
    * Returns true if the front of the string is a MD link, false otherwise
    * @param {String} currentLine - The currentLine with the potential link at the front
    * @return {Boolean} - True if the front of the string is a MD link, false otherwise
  */
  function isLink(currentLine) {
    let endParen = currentLine.indexOf("]");
    return currentLine.charAt(endParen + 1) === "(";
  }

  /**
    * Takes regular text, stopping at a space and appends it to the end of the container
    * Returns the remaining currentLine with the text removed
    * If at the end of the string, appends the end of the string
    * @param {String} currentLine - The currentLine with the text to add at the front
    * @param {HTMLElement} container - The container to place the completed text into
    * @return {String} currentLine - The string that remains after removing the text
  */
  function addWord(currentLine, container) {
    let count = 0;
    let endCut = currentLine.indexOf(" ");
    // HANDLES IF AT THE END OF THE STRING
    if(endCut === -1) {
      endCut = currentLine.length;
    }
    let addWord = currentLine.substring(0, endCut);
    container.innerHTML = container.innerHTML + addWord;
    count = addWord.length;
    return currentLine.substring(count);
  }

  /**
    * Takes a MD code indicator and its value and places it into HTML code tag
    * Returns the remaining currentLine with the code and associated indication characters removed
    * @param {String} currentLine - The currentLine with the code to be add at the front
    * @param {HTMLElement} container - The container to place the completed HTMLCOde Element into
    * @return {String} currentLine - The string parts that remain after removing the MD code and
    *                                its indicating characters
  */
  function addCode(currentLine, container) {
    let count = 0;
    currentLine = currentLine.substring(1);
    let addCode = document.createElement("code");
    let currentCode = currentLine.substring(0, currentLine.indexOf("\`"));
    count = currentCode.length;
    addCode.innerText = currentCode;
    container.appendChild(addCode);
    return currentLine.substring(count + 1);
  }

  /**
    * Takes a string line with the first part being something that needs to be emphasized
    * (either made italic or bold) and appends it to an HTML container element
    * @param {String} currentLine - The current state of the line with the word that needs to be
    *                               made emphasized at the very beginning
    * @param {HTMLElement} container - The container to append the emphasized word in span into
    * @return {String} currentLine - Returns the currentLine, having removed the word and its
    *                                indicating characters
  */
  function addEmphasis(currentLine, container) {
    let newSpan = document.createElement("span");
    let count = findFirstLetter(currentLine);
    if(whichCase(currentLine) === 0) {
      newSpan.classList.add("italic");
    } else if(whichCase(currentLine) === 1) {
      newSpan.classList.add("bold");
    } else {
      newSpan.classList.add("bold");
      newSpan.classList.add("italic");
    }
    currentLine = currentLine.substring(count);
    let newWord = currentLine.substring(0, findEmphRepeat(currentLine));
    newSpan.innerText = newWord;
    container.appendChild(newSpan);
    return currentLine.substring(findEmphRepeat(currentLine) + count);
  }

  /**
    * Takes a MD code indicator and its value and places it into HTML code tag
    * Returns the remaining currentLine with the code and associated indication characters removed
    * @param {String} currentLine - The currentLine with the potential word to be emphasized at
    *                               the front
    * @param {HTMLElement} container - The container to place the completed HTMLCOde Element into
    * @return {Integer} - The case number for the emphasis style,
    *                     -1 if not supposed to be notEmphasized
    *                     0 if only italic
    *                     1 if only bold
    *                     2 if both
  */
  function whichCase(currentLine) {
    let notEmphasized = false;
    let starCount = 0;
    let lineCount = 0;
    let limit = findFirstLetter(currentLine);
    for(let i = 0; i < limit; i++) {
      if(currentLine.charAt(i) === "*") {
        starCount++;
      } else {
        lineCount++;
      }
    }
    let firstIndicator = currentLine.substring(0, limit);
    notEmphasized = !(contains(currentLine, firstIndicator));
    if(notEmphasized) {
      return -1;
    } else if(starCount === 1 && lineCount === 0 || lineCount === 1 && starCount === 0) {
      return 0;
    } else if(starCount === 2 && lineCount === 0 || lineCount === 2 && lineCount === 0) {
      return 1;
    } else {
      return 2;
    }
  }

  /**
    * Returns the index at which the asterisk/underline emphasis indicator characters repeat
    * @param {String} currentLine - The string to search in
    * @return {Integer} index - The index at which the asterisk/underline emphasis indicator
                                chararacters repeat
  */
  function findEmphRepeat(currentLine) {
    let index = 0;
    for(let i = 0; i < currentLine.length; i++) {
      if(currentLine.charAt(i) === "*" || currentLine.charAt(i) === "_") {
        return index;
      }
      index = index + 1;
    }
  }

  /**
    * Uploads the progress of the current spec to the server
    * If no spec given, displays error on the webpage
  */
  function saveInformation() {
    if(typeof reqs != "undefined") {
      let data = new FormData();

      data.append("requirements", JSON.stringify(reqs));
      fetch(URL, { method : "POST", body : data })
        .then(checkStatus)
        .then(function(data) {
          console.log(data);
        })
    } else {
      let errorShow = document.getElementById("giveError");
      errorShow.innerText = "You have not inputted a specification to save!";
    }
  }

  /**
    * Gets the entire specification given by the user passes it to populate the page
  */
  function addSpec() {
    let overallSpec = document.getElementById("specField").value;
    overallSpec = overallSpec.substring(overallSpec.indexOf("## External Requirements"));
    createSection(overallSpec);
  }

  /**
    * Combines the lines to form lines that are true specification requirements
    * Indicates whether its a specific section, or a description of a section
    * @param {String} overallSpec - The word to convert from MD to HTML
    * @return {StringArray} fullLines - An array containing all of the true spec lines with
    *                                   relevant indicators
  */
  function combineLines(overallSpec) {
    let fullLines = [];
    let pos = 0;
    while(overallSpec.length != 0) {
      if(fullLines.length === 34) {
        console.log("HERE");
      }
      let currentChar = overallSpec.substring(0, 1);
      if(currentChar === "#" && isHeader(overallSpec)) {
        // MINUS ONE TO NOT INCLUDE THE SPACE
        // MINUTES TWO TO NOT INCLUDE NEWLINE CHAR
        let headerLine = overallSpec.substring(0, overallSpec.indexOf("\n"));
        overallSpec = overallSpec.substring(headerLine.length + 1);
        let headerNum = headerCount(headerLine);
        // REMOVES THE ## HEADING INDICATOR AND THE SPACE BETWEEN THE SECTION NAME
        let sectionName = headerLine.substring(headerNum + 1);
        fullLines.push("SECTION" + headerNum + ":" + sectionName);
        //overallSpec = overallSpec.substring(sectionName.length + 1);
      } else if(currentChar != "*" && fullLines[fullLines.length - 1].startsWith("SECTION")){
        let endCut = findNonIndicator(overallSpec);
        //if(endCut != -1 && endCut > overallSpec.indexOf("##")) {
        //  endCut = overallSpec.indexOf("##");
        //}
        let desc = overallSpec.substring(0, endCut);
        fullLines.push("DESCRIPTION:" + desc);
        overallSpec = overallSpec.substring(desc.length);
      } else {
        let woutIndicator = overallSpec.substring(2);
        let additional = 2;
        if(isCodeBlockDesc(overallSpec) || isCodeBlock(overallSpec) || isNumberList(overallSpec)) {
          woutIndicator = overallSpec;
          additional = 0;
        }
        let endCut = findNonIndicator(woutIndicator);
        // APPLY THIS TO FINDNONINDICATOR
        // if((woutIndicator.indexOf("##") < endCut) && woutIndicator.indexOf("##") != -1) {
        //   endCut = woutIndicator.indexOf("##");
        // }
        if(endCut === -1) {
          endCut = woutIndicator.length;
        }
        let currentLine = woutIndicator.substring(0, endCut);
        if(currentLine !== "") {
          fullLines.push(currentLine);
        }
        overallSpec = overallSpec.substring(currentLine.length + additional);
      }
    }
    return fullLines;
  }

  /**
    * Returns the index of the new specification line indicator
    * WARNING: IS 154 SPEC SPECIFIC
    * @param {String} overallSpec - The string containing the overall spec
    * @return {Integer} index - The index of the first character that indicates a new spec line
    *                           Returns -1 if not found
  */
  function findNonIndicator(overallSpec) {
    for(let i = 0; i < overallSpec.length; i++) {
      let currentChar = overallSpec.charAt(i);
      let remainder = overallSpec.substring(i);
      if(i + 1 < overallSpec.length) {
        if(currentChar === "*") {
          if((overallSpec.charAt(i+1) != "*" && remainder.indexOf("* ") === 0)) {
            return i;
          } else {
            i++;
          }
        } else if(isCodeBlockDesc(remainder) || isCodeBlock(remainder) || isHeader(remainder) || isNumberList(remainder)) {
          if(isCodeBlockDesc(remainder) || isCodeBlock(remainder)) {
            if(overallSpec.indexOf("```") === 0) {
              // PLUS 6 TO INCLUDE THE ``` AT THE END
              return overallSpec.substring(3).indexOf("```") + 6;
            } else {
              return i;
            }
          } else if(i != 0){
            return i;
          }
        }
      }
    }
    return -1;
  }

  /**
    * Populates the page with only actual requirement lines from the spec
    * @param {String} overallSpec - The entire specification given by the user
  */
  function createSection(overallSpec) {
    let specByLines;
    if(typeof reqs === "undefined") {
      specByLines = combineLines(overallSpec);
      reqs = specByLines;
    } else {
      specByLines = reqs;
    }
    let specContainer = document.getElementById("requirements");
    for(let i = 0; i < specByLines.length; i++) {
      let currentLine = specByLines[i]
      if(currentLine.startsWith("SECTION") || currentLine.startsWith("DESCRIPTION:")) {
        let newTextContainer;
        if(currentLine.startsWith("SECTION")) {
          newTextContainer = document.createElement("h" + currentLine.charAt(currentLine.indexOf(":") - 1));
        } else {
          newTextContainer = document.createElement("p");
        }
        let cleanText = replaceAll(currentLine, "\n", "");
        cleanText = cleanText.substring(cleanText.indexOf(":") + 1);
        newTextContainer.innerText = cleanText;
        specContainer.appendChild(newTextContainer);
      } else {
        let newLine = checkCodeByLetters(currentLine);
        addLine(newLine, specContainer);
      }
    }
  }

  /**
    * Adds the single specification line to the page
    * @param {String} specLine - The single specification line to add
    * @param {String} container - The location to add the specification line too
  */
  function addLine(specLine, container) {
    let div = document.createElement("div");
    div.classList.add("spec-line");
    container.appendChild(div);

    let label = document.createElement("label");
    div.appendChild(label);
    label.innerHTML = count + ".";

    let checkDone = document.createElement("input");
    checkDone.type="checkbox";
    checkDone.addEventListener("click", completeItem);
    label.appendChild(checkDone);
    label.appendChild(specLine);
    count = count + 1;
  }

  /**
    * Crosses out a corresponding specification requirement
  */
  function completeItem() {
    let finishedSpec = this.nextElementSibling;
    let parent = this.parentElement.parentElement;
    parent.classList.add("toRemove");
    if(finishedSpec.style.textDecoration === "line-through") {
      finishedSpec.style.textDecoration = "none";
    } else {
      finishedSpec.style.textDecoration = "line-through";
    }
  }

  /**
    * Removes any completed specification to do items from the list
  */
  function updateList() {
    let specList = document.getElementById("requirements");
    let specItems = document.querySelectorAll(".toRemove");
    while(specItems.length != 0) {
      let index = specItems[0].querySelector("label").innerText.substring(0,1);
      specList.removeChild(specItems[0]);
      specItems = document.querySelectorAll(".toRemove");
    }
  }

  /**
    * Remove the entire spec from the webpage and updates the server accordingly
  */
  function killList() {
    let specList = document.getElementById("requirements");
    specList.innerHTML = "";
    count = 1;
    fetch((URL + "?remove=true"))
      .then(checkStatus)
      .then(function(data) {
        console.log(data);
      })
      .catch(reportError);
  }

  /**
    * Returns the index of the first non-* or non-_ character in a string
    * To be used with markdown checking
    * @param {String} toDo - The word to convert from MD to HTML
    * @return {Integer} index - The index of the first character that isn't * or _
  */
  function findFirstLetter(toDo) {
    let index = 0;
    for(let i = 0; i < toDo.length; i++) {
      if(toDo.substring(0,1) === '*' || toDo.substring(0,1) === '_') {
        toDo = toDo.substring(1);
        index = index + 1;
      } else {
        return index;
      }
    }
    return -1;
  }

  /**
    * Returns if the provided string contains the second provided string
    * @param {String} toDo - The String to search inside of
    * @param {String} find -  The string to search for inside the first string provided
    * @return {Boolean} - True if the string contains the provided string, false otherwise
  */
  function contains(toDo, find) {
    return toDo.indexOf(find) != -1;
  }

  /**
    * Takes a String and replaces all of the specified characters with a different specified char
    * @param {String} toDo - The word to replace characters for
    * @param {Character} replaced - The character to replace
    * @param {Character} by - The character to replace with
    * @return {String} output - The String with all old characters replaced
  */
  function replaceAll(toDo, replaced, by) {
    let output = "";
    for(let i = 0; i < toDo.length; i++) {
      if(toDo.charAt(i) === replaced) {
        output = output + by;
      } else {
        output = output + toDo.charAt(i);
      }
    }
    return output;
  }

  /**
    * Checks and reports on the status of the fetch call
    * @param {String} response - The response from the fetch that was made previously
    * @return {Promise/String} - The success code OR The error promise that resulted from the fetch
  */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status === 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
    * Reports the error given by the fetch call
    * @param {String} error - The error reported by the fetch call
  */
  function reportError(error) {
    console.log(error);
  }

})();
