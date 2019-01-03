<?php
include("mdparser.php");
error_reporting(E_ALL);

check_new_file();

if(isset($_GET["mode"]) && is_valid_mode($_GET["mode"])) {
  $mode = $_GET["mode"];
  if($mode == "getassigns") {
    header("Content-type: application/json");
    $output = get_assignments();
    echo json_encode($output);
  } else if($mode == "getspec" && isset($_GET["name"]) && is_valid_assign($_GET["name"])) {
    header("Content-type: application/json");
    $spec = json_decode(file_get_contents("PreFormat/" . $_GET["name"] . ".json"));
    echo json_encode($spec);
  }
}

function get_assignments() {
  $output = array();
  $contents = file("contents.txt");
  for($i = 0; $i < sizeof($contents); $i = $i + 2) {
    array_push($output, trim($contents[$i]));
  }
  return $output;
}

function add_new_spec($file){
  $text = file_get_contents($file);
  $text = replace_all_ord($text, 13, "");
  $text = sub_remain($text, strpos($text, "## External Requirements"));
  $lines = combine_lines($text);
  $name = get_name($file);
  $name = replace_all($name, " ", "_");
  file_put_contents("PreFormat/" . $name . ".json", json_encode($lines));
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
        $name = replace_all($name, " ", "_");
        file_put_contents("contents.txt", $name . "\n", FILE_APPEND);
        file_put_contents("contents.txt", $file . "\n", FILE_APPEND);
        copy($file, "backups/" . basename($file));
      }
    }
    // PROCESS ALL THE FILES
    foreach($new_files as $new) {
      add_new_spec($new);
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
  $valid_modes = ["getassigns", "getspec"];
  return in_array($mode, $valid_modes);
}

function is_valid_assign($assignment) {
  $assignments = get_assignments();
  return in_array($assignment, $assignments);
}

?>
