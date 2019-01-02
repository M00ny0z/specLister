<?php
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

function header_count($overallSpec) {
  $headerCount = 0;
  $endIndex = 0;
  while(substring($overallSpec, $endIndex, $endIndex + 1) === "#") {
    $endIndex = $endIndex + 1;
    $headerCount = $headerCount + 1;
  }
  return $headerCount;
}

function is_header($overallSpec) {
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

/**
  * Returns the index of the new specification line indicator
  * WARNING: IS 154 SPEC SPECIFIC
  * @param {String} overallSpec - The string containing the overall spec
  * @return {Integer} index - The index of the first character that indicates a new spec line
  *                           Returns -1 if not found
*/
function find_next_indicator($overallSpec) {
  for($i = 0; $i < strlen($overallSpec); $i++) {
    $current_char = char_at($overallSpec, $i);
    $remainder = sub_remain($overallSpec, $i);
    if($i === 0) {
      if(is_code_block($overallSpec)) {
        return strpos(sub_remain($overallSpec, 3), "```") + 6;
      } else if(is_code_block_desc($overallSpec)) {
        $first = substring($overallSpec, 0, strpos($overallSpec, "```") + 3);
        $second = strpos(sub_remain($overallSpec, strlen($first)), "```") + 3;
        return strlen($first) + $second;
      }
    } else {
      if(is_code_block($remainder) || is_code_block_desc($remainder) || is_header($remainder) ||
        is_number_list($remainder)) {
        return $i;
      } else if($current_char == "*") {
        if(strpos($remainder, "* ") == 0) {
          return $i;
        } else {
          $i++;
        }
      }
    }
  }
  return -1;
}

function starts_with($word, $find) {
  return strpos($word, $find) === 0;
}

/**
  * Combines the lines to form lines that are true specification requirements
  * Indicates whether its a specific section, or a description of a section
  * @param {String} overallSpec - The word to convert from MD to HTML
  * @return {StringArray} fullLines - An array containing all of the true spec lines with
  *                                   relevant indicators
*/
function combine_lines($overallSpec) {
  $full_lines = array();
  $pos = 0;
  while(strlen($overallSpec) != 0) {
    $current_char = substring($overallSpec, 0, 1);
    // IF DOESNT CUT NICELY INTO NEXT INDICATOR, CUTS AGAIN TO GET CLEAN CUT
    if($current_char === "\n") {
      $end_cut = find_next_indicator($overallSpec);
      $overallSpec = sub_remain($overallSpec, $end_cut);
    } else if($current_char === "#" && is_header($overallSpec)) {
      // MINUS ONE TO NOT INCLUDE THE SPACE
      // MINUTES TWO TO NOT INCLUDE NEWLINE CHAR
      $header_line = substring($overallSpec, 0, strpos($overallSpec, "\n"));
      $overallSpec = sub_remain($overallSpec, strlen($header_line) + 1);
      $header_num = header_count($header_line);
      // REMOVES THE ## HEADING INDICATOR AND THE SPACE BETWEEN THE SECTION NAME
      $section_name = sub_remain($header_line, $header_num + 1);
      array_push($full_lines, "SECTION" . $header_num . ":" . $section_name);
    } else if($current_char != "*" && starts_with($full_lines[sizeof($full_lines) - 1], "SECTION")) { // CURRENT LINE BEING WORKED ON
      $end_cut = find_next_indicator($overallSpec);
      $desc = substring($overallSpec, 0, $end_cut);
      array_push($full_lines, "DESCRIPTION:" . $desc);
      $overallSpec = sub_remain($overallSpec, strlen($desc));
    } else {
      $wout_indicator = sub_remain($overallSpec, 2);
      $additional = 2;
      if(is_code_block_desc($overallSpec) || is_code_block($overallSpec) || is_number_list($overallSpec)) {
        $wout_indicator = $overallSpec;
        $additional = 0;
      }
      $end_cut = find_next_indicator($wout_indicator);
      if($end_cut === -1) {
        $end_cut = strlen($wout_indicator);
      }
      $current_line = substring($wout_indicator, 0, $end_cut);
      if($current_line != "") {
        array_push($full_lines, $current_line);
      }
      $overallSpec = sub_remain($overallSpec, strlen($current_line) + $additional);
    }
  }
  return $full_lines;
}
?>
