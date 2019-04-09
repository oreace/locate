<?php
require('database.php');    
$output = array();
$get = mysqli_query($db, "select * from volunteer");
while($row = mysqli_fetch_array($get))
{
    $email = $row['user'];
$query = "select * from md5_users where email=''";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        $result2 = array();
        $result2[] = $row['name'];
        $result2[] = $row['email'];
        $result2[] = $row['gsm'];
        $result2[] = "<button class='btn btn-success view' id='".$row['id']."'>View</button>";
        $result2[] = "<button class='btn btn-danger delete' id='".$row['id']."'>Delete</button>";

        $output[] = $result2;
    }
    echo json_encode($output);

}

}
?>