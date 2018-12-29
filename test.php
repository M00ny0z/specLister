<?php
error_reporting(E_ALL);
check_new_file();

if(isset($_GET["mode"]) && is_valid_mode($_GET["mode"])) {
  header("Content-type: application/json");
  $assignments = get_assignments();
  echo json_encode($assignments);
}

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
        $current_file = file($file);
        $name;
        // IF ITS A CREATIVE PROJECT
        if(!(strpos($file, "CP") === false)) {
          $name = substring($current_file[0], strpos($current_file[0], "Creative"), strpos($current_file[0], "ect") + 5);
        } else {
          $name = substring($current_file[0], strpos($current_file[0], '-') + 2, strrpos($current_file[0], "-") - 1);
        }
        file_put_contents("contents.txt", $name . "\n", FILE_APPEND);
        file_put_contents("contents.txt", $file . "\n", FILE_APPEND);
      }
    }
    echo "Files added";
  }
}

function is_valid_mode($mode) {
  return $mode === "getassigns";
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
?>
