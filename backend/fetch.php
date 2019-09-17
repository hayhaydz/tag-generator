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
            $description = $row['tag_description'];
            $multiple = $row['tag_multiple'];
            $custom = $row['tag_custom'];

            $return_array[] = array(
                "tag_id" => $id,
                "tag_name" => $name,
                "tag_abbreviation" => $abbreviation,
                "tag_description" => $description,
                "tag_multiple" => $multiple,
                "tag_custom" => $custom
            );
        }

        echo json_encode($return_array);

        mysqli_close($con);
    }

    if ($_POST["option"] == "post_tag") {
        $data = $_POST['data'];
        $tag = json_decode($data, true);
        $tagName = $tag['name'];
        $tagAbbreviation = $tag['abbreviation'];

        $sqlName = "SELECT * FROM `tags` WHERE `tag_name`='$tagName' ";
        $resultName = $con->query($sqlName);

        if ($resultName->num_rows <= 0) {
            $sqlAbbreviation = "SELECT * FROM `tags` WHERE `tag_abbreviation`='$tagAbbreviation' ";
            $resultAbbreviation = $con->query($sqlAbbreviation);

            if ($resultAbbreviation->num_rows <= 0) {
                $sql = "INSERT INTO tags (`tag_name`, `tag_abbreviation`, `tag_description`, `tag_multiple`, `tag_custom`) VALUES ('".$tag['name']."', '".$tag['abbreviation']."', '".$tag['description']."', '".$tag['multiple']."', '".$tag['custom']."')";
                if (mysqli_query($con, $sql)) {
                    $return_array[] = array(
                        "status" => "OKAY",
                        "message" => "Tag inserted successfully"
                    );
        
                    echo json_encode($return_array);
                } else {
                    $return_array[] = array(
                        "status" => "ERROR",
                        "message" => "Error: " . $sql . "" . mysqli_error($con)
                    );
        
                    echo json_encode($return_array);
                    die;
                }
                mysqli_close($con);
            } else {
                $return_array[] = array(
                    "status" => "ERROR",
                    "message" => "Duplicate Abbreviation Entry"
                );

                echo json_encode($return_array);
                die;
            }
            mysqli_close($con);
        } else {
            $return_array[] = array(
                "status" => "ERROR",
                "message" => "Duplicate Name Entry"
            );

            echo json_encode($return_array);
        }
        mysqli_close($con);
    }

    if ($_POST["option"] == "remove_tag") {
        $tagID = $_POST['data'];

        $sql = "DELETE FROM `tags` WHERE `tag_id` = '$tagID'";
        if ($con->query($sql) === TRUE) {
            echo "Tag was deleted successfully";
        } else {
            echo "Error deleting record: " . $con->error;
        }

    }

    if ($_POST["option"] == "get_taglines") {
        mysqli_select_db($con,"previous_taglines");
        $sql="SELECT * FROM previous_taglines";
        $result = mysqli_query($con,$sql);
        $return_array = array();

        while($row = mysqli_fetch_array($result)) {
            $id = $row['tagline_id'];
            $data = $row['tagline_data'];

            $return_array[] = array(
                "tagline_id" => $id,
                "tagline_data" => $data,
            );
        }

        echo json_encode($return_array);

        mysqli_close($con);
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