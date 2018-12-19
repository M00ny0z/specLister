<?php
error_reporting(E_ALL);
/*
 * Name: Manny Munoz
 * Section : CSE 154 AJ
 * Date: 11 November, 2018
 *
 * This file provides back-end support for the SpecLister website
 * The server will save the current completion status of the students spec
 *
 * Web Service details:
 * =====================================================================
 * Possible GET parameters:
 * - info
 *   - if info is true
 * Output formats:
 * - JSON
 * Output Details:
 * - Returns the same array of strings containing the specified specification
 * - remove
 *   - if remove is true
 * Output formats:
 * - Plain text
 * Output Details:
 * - Returns the status of the deletion request
 * Possible POST parameters:
 * - Array of strings containing all of the spec
 * - Else outputs 400 error message as plain text.
 */
$requirements;
if(isset($_POST["requirements"])) {
  header("Content-type: text/plain");
  $requirements = $_POST["requirements"];
  $decoded = json_decode($requirements);
  file_put_contents("data.txt", serialize($decoded));
  echo "Data Saved!";
} else if(file_exists("data.txt") && isset($_GET["info"])) {
  header("Content-type: application/json");
  $data = unserialize(file_get_contents("data.txt"));
  $output = array();
  $output["requirements"] = $data;
  print(json_encode($output));
} else if(isset($_GET["remove"])) {
  header("Content-type: text/plain");
  unlink("data.txt");
  echo "Deletion Successful";
} else {
  header("HTTP/1.1 400 Invalid Request");
  header("Content-type: text/plain");
  die("Spec doesn't exist already or the data given is not a spec");
}
?>
