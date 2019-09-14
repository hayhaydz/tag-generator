<<<<<<< HEAD
<?php 
$con = mysqli_connect("localhost", "phpmyadmin", "mysqlpassword", "sh-tag-generator");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL Database; error:" . mysqli_connect_error();
=======
<?php
$con = mysqli_connect("localhost","phpmyadmin","mysqlpassword","sh-tag-generator");

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
>>>>>>> 98f912b8dcf9b9a27c68badd6ae83a3d0546d0a4
}

?>