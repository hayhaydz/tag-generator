<?php
// fetch.php

require_once('connect_db.php');

if (isset($_POST["option"])) {
    if ($_POST["option"] == "get_tags") {
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

        mysqli_close($con);
    }

    if ($_POST["option"] == "post_tag") {
        $data = $_POST['data'];
        $tag = json_decode($data, true);

        $sql = "INSERT INTO tags (`tag_name`, `tag_abbreviation`) VALUES ('".$tag['name']."', '".$tag['abbreviation']."')";
        if (mysqli_query($con, $sql)) {
            echo 'Tag inserted successfully';
        } else {
            echo "Error: " . $sql . "" . mysqli_error($con);
        }

        mysqli_close($con);
    }

    if ($_POST["option"] == "get_taglines") {
        # code...
    }

    if ($_POST["option"] == "post_tagline") {
        $tagline = $_POST['data'];

        $sql = "INSERT INTO previous_taglines (`tagline_data`) VALUES ('".$tagline."')";
        if (mysqli_query($con, $sql)) {
            echo 'Tagline inserted successfully';
        } else {
            echo "Error: " . $sql . "" . mysqli_error($con);
        }

        mysqli_close($con);
    }
}


?>