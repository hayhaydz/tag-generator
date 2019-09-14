<?php 
$con = mysqli_connect("localhost", "phpmyadmin", "mysqlpassword", "sh-tag-generator");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL Database; error:" . mysqli_connect_error();
}

?>