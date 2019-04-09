<?php
require("../model/database.php");
require("../model/functions.php");
$response = array();


$get = mysqli_query($db, "select * from manifest order by status desc");

if (mysqli_num_rows($get) > 0)
{
while($row2 = mysqli_fetch_array($get))
{

$email = $row2['user'];

$output = array();

//$output[] = $row2;   
$query = "select * from md5_users where email='$email'";
$result = mysqli_query($db, $query);
while($row = mysqli_fetch_array($result)){$output[] = $row['name'];}
$output[] = $row2['from_'];
$output[] = $row2['to_'];
$output[] = $row2['dateposted'];
$output[] = $row2['status'];
$output[] = "<button class='btn btn-info panic' id='".$row['id']."'>Panic</button>";
$output[] = "<button class='btn btn-info checkout' id='".$row['id']."'>Checkout</button>";


$response[] = $output;    
}
 echo json_encode($response);



}


?>