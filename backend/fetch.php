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

            $return_array[] = array(
                "tag_id" => $id,
                "tag_name" => $name,
                "tag_abbreviation" => $abbreviation,
                "tag_description" => $description
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
                $sql = "INSERT INTO tags (`tag_name`, `tag_abbreviation`, `tag_description`) VALUES ('".$tag['name']."', '".$tag['abbreviation']."', '".$tag['description']."')";
                if (mysqli_query($con, $sql)) {
                    $return_array[] = array(
                        "status" => "OKAY",
                        "message" => "Tag inserted successfully"
                    );
        
                    echo json_encode($return_array);
                } else {
                    $return_array[] = array(
                        "status" => "OKAY",
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