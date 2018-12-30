<?php
/*
FUNCTIONS REMAINING:
  findEmphRepeat
  combineLines
  findNonIndicator

FUNCTIONS COMPLETED:
  headerCount
  isHeader
  contains
  charAt
  replaceAll
  isNumberList
  isCodeBlock
  isCodeBlockDesc
  isLink
  findFirstLetter
  whichCase
*/
error_reporting(E_ALL);
//check_new_file();
$file = file("files/HW1.md");
header("Content-type: text/plain");
$word = "**_hello_**";
echo which_case($word);

// if(isset($_GET["mode"]) && is_valid_mode($_GET["mode"])) {
//   header("Content-type: application/json");
//   $assignments = get_assignments();
//   $changes = check_if_changed();
//   $output = array();
//   $output["assignments"] = $assignments;
//   $output["changes"] = $changes;
//   echo json_encode($output);
// }

function get_assignments() {
  $output = array();
  $contents = file("contents.txt");
  for($i = 0; $i < sizeof($contents); $i = $i + 2) {
    array_push($output, trim($contents[$i]));
  }
  return $output;
}

function check_new_file() {
  $last_contents = file("contents.txt");
  if(sizeof($last_contents) / 2 < sizeof(glob("files/*.md"))) {
    // SAVES THE NEW FILES FOR WHEN ACTUALLY PROCESSING
    $new_files = array();
    foreach(glob("files/*.md") as $file) {
      // CHECKS IF FILE ALREADY PROCESSED
      if(strpos(file_get_contents("contents.txt"), $file) === false) {
        array_push($new_files, $file);
        $name = get_name($file);
        file_put_contents("contents.txt", $name . "\n", FILE_APPEND);
        file_put_contents("contents.txt", $file . "\n", FILE_APPEND);
        copy($file, "backups/" . basename($file));
      }
    }
    echo "Files added";
  }
}

// WE NEED TO OUTPUT THE CHANGED LINES
function check_if_changed() {
  $output = array();
  foreach(glob("files/*.md") as $file) {
    $file_contents = file_get_contents($file);
    $backup_file = file_get_contents("backups/" . basename($file));
    if(!($file_contents == $backup_file)) {
      array_push($output, get_name($file));
    }
  }
  return $output;
}

function get_name($file) {
  // FILE LINES
  $current_file = file($file);
  $name;
  // IF ITS A CREATIVE PROJECT
  if(!(strpos($file, "CP") === false)) {
    $name = substring($current_file[0], strpos($current_file[0], "Creative"), strpos($current_file[0], "ect") + 5);
  } else {
    $name = substring($current_file[0], strpos($current_file[0], '-') + 2, strrpos($current_file[0], "-") - 1);
  }
  return $name;
}

function is_valid_mode($mode) {
  return $mode === "getassigns";
}

function is_valid_assign($assignment) {
  $assignments = get_assignments();
  return in_array($assignment, $assingments);
}

// $WORD IS WORD TO PERFORM WORK ON
// $START IS IS STARTING INDEX
// $END IS ENDING INDEX
// $END MUST BE > $START
function substring($word, $start, $end) {
  $output = "";
  for($i = 0; $i < $end-$start; $i++) {
    $output = $output . substr($word, $start + $i, 1);
  }
  return $output;
}

function headerCount($overallSpec) {
  $headerCount = 0;
  $endIndex = 0;
  while(substring($overallSpec, $endIndex, $endIndex + 1) === "#") {
    $endIndex = $endIndex + 1;
    $headerCount = $headerCount + 1;
  }
  return $headerCount;
}

function isHeader($overallSpec) {
  if(substring($overallSpec, 0, 1) == "#") {
    $endIndex = 0;
    while(substring($overallSpec, $endIndex, $endIndex + 1) == "#") {
      $endIndex = $endIndex + 1;
    }
    $val = substring($overallSpec, $endIndex, $endIndex + 1);
    return substring($overallSpec, $endIndex, $endIndex + 1) == " ";
  }
  return false;
}

function contains($todo, $find) {
  echo $todo . "\n";
  echo $find . "\n";
  echo "contains" . strpos($todo, $find) . "\n";
  return strpos($todo, $find) == true || strpos($todo, $find) == 0;
}

function char_at($string, $index) {
  return substr($string, $index, 1);
}

/**
  * Takes a String and replaces all of the specified characters with a different specified char
  * @param {String} toDo - The word to replace characters for
  * @param {Character} replaced - The character to replace
  * @param {Character} by - The character to replace with
  * @return {String} output - The String with all old characters replaced
*/
function replace_all($todo, $replaced, $by) {
  $output = "";
  for($i = 0; $i < strlen($todo); $i++) {
    if(char_at($todo, $i) == $replaced) {
      $output = $output . $by;
    } else {
      $output = $output . char_at($todo, $i);
    }
  }
  return $output;
}

/**
  * Takes a String and replaces all of the specified characters with a different specified char
  * @param {String} toDo - The word to replace characters for
  * @param {Character} replaced - The character to replace
  * @param {Character} by - The character to replace with
  * @return {String} output - The String with all old characters replaced
*/
function replace_all_ord($todo, $replaced, $by) {
  $output = "";
  for($i = 0; $i < strlen($todo); $i++) {
    if(ord(char_at($todo, $i)) == $replaced) {
      $output = $output . $by;
    } else {
      $output = $output . char_at($todo, $i);
    }
  }
  return $output;
}

function char_code_at($word, $index) {
  return ord(char_at($word, $index));
}

function is_number_list($overallSpec) {
  $first_code = char_code_at($overallSpec, 0);
  return $first_code >= 48 && $first_code <= 57 && char_at($overallSpec, 1) == "." &&
    char_at($overallSpec, 2) == " ";
}

function is_code_block($overallSpec) {
  return strpos($overallSpec, "```") === 0;
}

function is_code_block_desc($overallSpec) {
  $spaces_before = strpos($overallSpec, "    ");
  // PLUS TWO TO INCLUDE THE SPACE AFTER COLON
  // LIMITS TO ONLY ONE, CURRENT POSSIBLE CODE BLOCK
  $limited = substring($overallSpec, strpos($overallSpec, "\n"), strpos($overallSpec, "\n") + 9);
  $following_block = strpos($limited, "\n\n    ```");
  return $spaces_before === 0 && $following_block === 0;
}

/**
  * Takes a string and returns if the front of the string is a MD link
  * Returns true if the front of the string is a MD link, false otherwise
  * @param {String} currentLine - The currentLine with the potential link at the front
  * @return {Boolean} - True if the front of the string is a MD link, false otherwise
*/
function is_mdlink($current_line) {
  $end_paren = strpos($current_line, "]");
  return char_at($current_line, $end_paren + 1) === "(";
}

function sub_remain($todo, $index) {
  return substr($todo, $index, strlen($todo) - $index);
}

/**
  * Returns the index of the first non-* or non-_ character in a string
  * To be used with markdown checking
  * @param {String} toDo - The word to convert from MD to HTML
  * @return {Integer} index - The index of the first character that isn't * or _
*/
function find_first_letter($todo) {
  $index = 0;
  $old_length = strlen($todo);
  for($i = 0; $i < $old_length; $i++) {
    if(substring($todo, 0, 1) == "*" || substring($todo, 0, 1) == "_") {
      $todo = sub_remain($todo, 1);
      $index = $index + 1;
    } else {
      return $index;
    }
  }
  return -1;
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
function which_case($current_line) {
  $not_emph = false;
  $star_count = 0;
  $line_count = 0;
  $limit = find_first_letter($current_line);
  for($i = 0; $i < $limit; $i++) {
    if(char_at($current_line, $i) == "*") {
      $star_count = $star_count + 1;
    } else {
      $line_count = $line_count + 1;
    }
  }
  $first_indicator = substring($current_line, 0, $limit);
  echo $first_indicator . "\n";
  $not_emph = !(contains($current_line, $first_indicator));
  if($not_emph) {
    return -1;
  } else if($star_count == 1 && $line_count == 0 || $line_count == 1 && $star_count == 0) {
    return 0;
  } else if($star_count == 2 && $line_count == 0 || $line_count == 2 && $star_count == 0) {
    return 1;
  } else if($star_count == 2 && $line_count == 1 || $line_count == 2 && $star_count == 1) {
    return 2;
  }
}

?>
