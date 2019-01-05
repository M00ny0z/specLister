(function() {
  "use strict";
  window.addEventListener("load", main);
  const URL = "test.php"
  let count = 1;
  let currentName;
  let headerCount = 0;
  let descCount = 0;
  const db = new Dexie("assignment-database");
  let assignment = "Set!";
  let assi = [];
  assi["assignments"] = 'name,values';
  db.version(1).stores(assi);

  /**
  * Initializes all of the menu buttons and fetches the server for the names of the current
  * assignments
  */
  function main() {
    let saveProgress = document.getElementById("save-btn");
    let switchItems = document.getElementById("remain-btn");
    let updateItems = document.getElementById("remove-btn");
    switchItems.addEventListener("click", switchStuff);
    switchItems.disabled = true;
    updateItems.addEventListener("click", updateList);
    updateItems.disabled = true;
    saveProgress.addEventListener("click", saveItems);

    fetch((URL + "?mode=getassigns"))
      .then(checkStatus)
      .then(JSON.parse)
      .then(addAssignments)
      .catch(reportError);
  }

  /**
    * Saves the current user progress for the current assignment
  */
  function saveItems() {
    if(currentName === undefined) {
      createAlert("You must start an assignment before you can save your progress", "alert-danger");
    } else {
      db.assignments.put({name: currentName, values: createReport()});
      successAlert("Successfully saved!");
    }
  }

  /**
    * Creates an alert depending on the message passed, removes it after 2 seconds
    * @param {String} message - The message to include in the alert
  */
  function createAlert(message, type) {
    let nextTo = document.getElementById("assign-cont");
    let newAlert = document.createElement("div");
    newAlert.classList.add("alert");
    newAlert.role="alert";
    newAlert.classList.add(type);
    newAlert.innerText = message;
    nextTo.insertAdjacentElement("afterend", newAlert);
    setTimeout(function() {
      nextTo.parentElement.removeChild(newAlert);
    }, 2000);
  }

  function redAlert(message) {
    createAlert(message, "alert-danger");
  }

  function successAlert(message) {
    createAlert(message, "alert-success");
  }

  /**
    * Creates and returns an array of the status' for all the requirements for the assignment
    * @return {intArray} output - An array of all the status' of the current assignment,
    *                             0 for not complete, 1 for complete
  */
  function createReport() {
    let completedView = document.getElementById("completed-view");
    let allCompleted = completedView.querySelectorAll(".spec-line");
    let output = [];
    for(let i = 0; i < count - 1; i++) {
      output[i] = 0;
    }
    for(let i = 0; i < allCompleted.length; i++) {
      let currentNum = parseInt(allCompleted[i].querySelector("label").innerText);
      output[currentNum - 1] = 1;
    }
    return output;
  }

  /**
    * Updates the list by removing items specified by the user
    * Moves from remainingItems view to completedItems view depending on current menu
  */
  function updateList() {
    let allToRemove = document.querySelectorAll(".toRemove");
    if(allToRemove.length <= 0) {
      redAlert("You must have completed some items before you can remove them.");
    } else {
      let completedView = document.getElementById("completed-view");
      let remainingView = document.getElementById("remain-view");
      let otherParent;
      if(completedView.classList.contains("hidden")) {
        otherParent = completedView;
      } else {
        otherParent = remainingView;
      }
      for(let i = allToRemove.length - 1; i >= 0; i--) {
        let section = getSpecificHeader(otherParent, getSectionName(allToRemove[i].parentElement.parentElement));
        allToRemove[i].classList.remove("toRemove");
        clearCheck(allToRemove[i]);
        section.insertAdjacentElement("afterend", allToRemove[i].parentElement.parentElement);
      }
      updateBar();
    }
  }

  /**
    * Clears the checkmark from a specified spec line
    * @param {HTMLElement} element - The checkbox to clear
  */
  function clearCheck(element) {
    element.parentElement.querySelector("input").checked = false;
  }

  /**
    * Switches the labeling for the menu buttons for visibility
    * Switches from the remainingItems view to completedItems view and vice-versa
  */
  function switchStuff() {
    let updateBttn = document.getElementById("remove-btn");
    let completedView = document.getElementById("completed-view");
    let remainingView = document.getElementById("remain-view");
    if(this.innerText === "Show Completed Items") {
      this.innerText = "Show Remaining Items";
      updateBttn.innerText = "Add Completed Items Back";
      completedView.classList.remove("hidden");
      remainingView.classList.add("hidden");
    } else {
      this.innerText = "Show Completed Items";
      updateBttn.innerText = "Remove Completed Items";
      completedView.classList.add("hidden");
      remainingView.classList.remove("hidden");
    }
  }

  /**
    * Populates the page with buttons of all the names of the assignments
    * Each button calls the server for the spec data
    * @param {StringArray} data - All of the assignments to add
  */
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
      buttonCont.appendChild(button);
    }
  }

  /**
    * Fetches the specified assignment data from the server
  */
  function getAssignData() {
    let switchItems = document.getElementById("remain-btn");
    let updateItems = document.getElementById("remove-btn");
    switchItems.disabled = false;
    updateItems.disabled = false;
    document.getElementById("welcome-msg").classList.add("hidden");
    currentName = this.id;
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
    redAlert("An error has occurred, please try again. : " + error);
  }

  /**
    * Reports the error given by the fetch call
    * @param {String} error - The error reported by the fetch call
  */
  function resetStats() {
    let specContainer = document.getElementById("remain-view");
    let completedView = document.getElementById("completed-view");
    let progressBar = document.querySelector(".progress");
    let colorBar = document.querySelector(".progress-bar");
    specContainer.innerHTML = "";
    count = 1;
    colorBar.style.width = "0%";
    descCount = 0;
    headerCount = 0;
    completedView.innerHTML = "";
  }

  /**
    * Populates the page with only actual requirement lines from the spec given by the server
    * @param {StringArray} specByLines - The entire specification for the assignment in an array,
    *                                    each index being a requirement
  */
  function addSpec(specByLines) {
    resetStats();
    let remainingView = document.getElementById("remain-view");
    let completedView = document.getElementById("completed-view");
    let specContainer = remainingView;
    let progressBar = document.querySelector(".progress");
    let prevSection = "";
    for(let i = 0; i < specByLines.length; i++) {
      let currentLine = specByLines[i];
      if(currentLine.startsWith("SECTION") || currentLine.startsWith("DESCRIPTION:")) {
        let newTextContainer;
        let cleanText = replaceAll(currentLine, "\n", "");
        cleanText = cleanText.substring(cleanText.indexOf(":") + 1);
        if(currentLine.startsWith("SECTION")) {
          headerCount = headerCount + 1;
          prevSection = cleanText;
          prevSection = replaceAll(prevSection, " ",  "_");
          newTextContainer = document.createElement("h" + currentLine.charAt(currentLine.indexOf(":") - 1));
          newTextContainer.classList.add(prevSection);
          newTextContainer.innerText = cleanText;
        } else {
          descCount = descCount + 1;
          newTextContainer = checkCodeByLetters(cleanText);
        }
        newTextContainer.classList.add("ml-2");
        specContainer.appendChild(newTextContainer);
      } else {
        let newLine = checkCodeByLetters(currentLine);
        addLine(newLine, specContainer, prevSection);
      }
    }
    copyHeaders();
    db.assignments.get(currentName, function(item) {
      if(item != undefined) {
        returnProgress(item);
      }
    });
    progressBar.classList.remove("hidden");
  }

  function returnProgress(data) {
    let allSpecLines = document.getElementById("remain-view").querySelectorAll(".spec-line");
    let completedView = document.getElementById("completed-view");
    for(let i = data.values.length - 1; i > -1 ; i--) {
      if(data.values[i] === 1) {
        let section = getSpecificHeader(completedView, getSectionName(allSpecLines[i]));
        section.insertAdjacentElement("afterend", allSpecLines[i]);
      }
    }
    updateBar();
  }

  /**
    * Adds the single specification line to the page
    * @param {String} specLine - The single specification line to add
    * @param {String} container - The location to add the specification line too
    * @param {String} prevSection - The section that the line belongs too
  */
  function addLine(specLine, container, prevSection) {
    let div = document.createElement("div");
    div.classList.add("spec-line");
    div.classList.add(prevSection);
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
    * Copies all the headers of the assignment and appends them in original placed length to the
    * completed items view
  */
  function copyHeaders() {
    let completedView = document.getElementById("completed-view");
    let remainingView = document.getElementById("remain-view");
    let allHeaders = getAllHeaders(remainingView);
    for(let i = 0; i < allHeaders.length; i++) {
      let copy = allHeaders[i].cloneNode(true);
      completedView.appendChild(copy);
    }
  }


  /**
    * Crosses out a corresponding specification requirement
  */
  function completeItem() {
    let finishedSpec = this.nextElementSibling;
    let parent = this.parentElement.parentElement;
    finishedSpec.classList.toggle("toRemove");
  }

  /**
    * Updates the bar progression depending on the user progress
  */
  function updateBar() {
    let progressBar = document.querySelector(".progress-bar");
    let completedCount = document.getElementById("completed-view").children.length - headerCount;
    let total = count - 1;
    console.log("completedCount: " + completedCount);
    console.log("total: " + total);
    console.log("percentage: " + ((completedCount / total) * 100));
    let percentage = ((completedCount / total) * 100);
    if(percentage >= 25 && percentage < 100) {
      progressBar.classList.remove("bg-danger");
      progressBar.classList.add("bg-warning");
    } else if(percentage >= 100) {
      progressBar.classList.remove("bg-warning");
      progressBar.classList.add("bg-success");
    }
    progressBar.style.width = (percentage + "%");

  }


})();
