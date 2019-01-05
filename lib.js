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
    } else if (isEmphasis(currentLine)) {
      // HANDLES EMPHASIS CASE
      currentLine = addEmphasis(currentLine, specContainer);
    } else {
      currentLine = addWord(currentLine, specContainer);
    }
  }
  return specContainer;
}

/**
  * Returns whether the front of the current line is a MD emphasis or not
  * @param {String} currentLine - The current specification line being looked at
  * @return {Boolean} currentLine - True if an MD emphasis, false otherwise
*/
function isEmphasis(currentLine) {
  let currentChar = currentLine.charAt(0);
  return (currentChar === "*" || currentChar === "_") && whichCase(currentLine) != -1;
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
  let endCut = findNextMdChar(currentLine);
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
  * Returns the index of the next MD style indicator
  * @param {String} currentLine - The current specification line being looked at
  * @return {Integer} - The index of the next MD style indicator
*/
function findNextMdChar(currentLine) {
  for(let i = 0; i < currentLine.length; i++) {
    currentChar = currentLine.charAt(i);
    remainder = currentLine.substring(i);
    if(isMDLink(remainder) || currentChar === "`" || isEmphasis(remainder) || currentChar === " ") {
      return i;
    }
  }
}

/**
  * Returns whether the front of the currentLine has a markdown style link,
  * true if yes, false otherwise
  * @param {String} currentLine - The currentLine with the text to add at the front
  * @return {Boolean} - Whether or not the front of currentLine is a markdown style link
*/
function isMDLink(currentLine) {
  return (currentLine.charAt(0) === "(" && currentLine.indexOf(")") + 1 === "[");
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
  * Returns an array of all the element that are headers within a parent element
  * @param {HTMLElement} parentElement - The parent element to get headers from
  * @return {HTMLElementArray} output - The array of all the elements that are headers
*/
function getAllHeaders(parentElement) {
  let output = [];
  let allElements = parentElement.children;
  for(let i = 0; i < allElements.length; i++) {
    let currTag = allElements[i].tagName;
    if(currTag === "H1" || currTag === "H2" || currTag === "H3" || currTag === "H4" ||
      currTag === "H4" || currTag === "H5" || currTag === "H6") {
      output.push(allElements[i]);
    }
  }
  return output;
}

/**
  * Returns the name of the section of the spec line
  * @param {HTMLElement} parentElement - The specification line to get the section name for
  * @param {String} name - The header name that is being looked for
  * @return {HTMLElement} - The header with the specified name
*/
function getSpecificHeader(parentElement, name) {
  let allHeaders = getAllHeaders(parentElement);
  for(let i = 0; i < allHeaders.length; i++) {
    if(allHeaders[i].classList.contains(name)) {
      return allHeaders[i];
    }
  }
}

/**
  * Returns the name of the section of the spec line
  * @param {HTMLElement} element - The specification line to get the section name for
  * @return {String} index - The name of the specification line's section
*/
function getSectionName(element) {
  for(let i = 0; i < 10; i++) {
    if(element.classList.item(i) != "toRemove" && element.classList.item(i) != "spec-line") {
      return element.classList.item(i);
    }
  }
}
