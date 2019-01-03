(function() {
  "use strict";
  window.addEventListener("load", main);
  const URL = "test.php"
  let count = 1;

  function main() {
    let saveProgress = document.getElementById("save-btn");
    let switchItems = document.getElementById("remain-btn");
    let updateItems = document.getElementById("remove-btn");
    let showItems = document.getElementById("completed-btn");
    updateItems.addEventListener("click", switchStuff);

    fetch((URL + "?mode=getassigns"))
      .then(checkStatus)
      .then(JSON.parse)
      .then(addAssignments)
      .catch(reportError);
  }

  function switchStuff() {
    if(this.innerText === "Remaining Items") {
      this.innerText = "Completed Items";
    } else {
      this.innerText = "Remaining Items";
    }
  }

  function removeItem

  function addAssignments(data) {
    let buttonCont = document.getElementById("assign-cont");
    for(let i = 0; i < data.length; i++) {
      let button = document.createElement("button");
      button.type = "button";
      button.classList.add("btn");
      button.classList.add("btn-primary");
      button.classList.add("mx-5");
      button.classList.add("mb-3");
      button.id = data[i];
      button.innerText = replaceAll(data[i], "_", " ");
      button.addEventListener("click", getAssignData);
      console.log(button.innerText);
      buttonCont.appendChild(button);
    }
  }

  function getAssignData() {
    fetch(URL + "?mode=getspec&name=" + this.id)
      .then(checkStatus)
      .then(JSON.parse)
      .then(addSpec)
      .catch(reportError);
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

  /**
    * Populates the page with only actual requirement lines from the spec
    * @param {String} overallSpec - The entire specification given by the user
  */
  function addSpec(specByLines) {
    let specContainer = document.getElementById("remain-view");
    let progressBar = document.querySelector(".progress");
    specContainer.innerHTML = "";
    for(let i = 0; i < specByLines.length; i++) {
      let currentLine = specByLines[i]
      if(currentLine.startsWith("SECTION") || currentLine.startsWith("DESCRIPTION:")) {
        let newTextContainer;
        let cleanText = replaceAll(currentLine, "\n", "");
        cleanText = cleanText.substring(cleanText.indexOf(":") + 1);
        if(currentLine.startsWith("SECTION")) {
          newTextContainer = document.createElement("h" + currentLine.charAt(currentLine.indexOf(":") - 1));
          newTextContainer.innerText = cleanText;
        } else {
          newTextContainer = checkCodeByLetters(cleanText);
        }
        specContainer.appendChild(newTextContainer);
      } else {
        let newLine = checkCodeByLetters(currentLine);
        addLine(newLine, specContainer);
      }
    }
    progressBar.classList.remove("hidden");
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


})();
