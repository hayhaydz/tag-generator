<?php
// fetch.php

require_once('connect_db.php');

if (isset($_POST["data"])) {
    if ($_POST["data"] == "tags") {
        mysqli_select_db($con,"tags");
        $sql="SELECT * FROM tags";
        $result = mysqli_query($con,$sql);
        $return_array = array();

        while($row = mysqli_fetch_array($result)) {
            $id = $row['tag_id'];
            $name = $row['tag_name'];
            $abbreviation = $row['tag_abbreviation'];

            $return_array[] = array(
                "tag_id" => $id,
                "tag_name" => $name,
                "tag_abbreviation" => $abbreviation
            );
        }

        echo json_encode($return_array);
    }
}


?>