<?php
require("../model/database.php");
require("../model/functions.php");
$response = array();

            $user = '';
             if (!isset($_SESSION))
            {
                session_start();
            }
            if(isset($_SESSION['email']))
            {
                $user = $_SESSION['email'];
            }
  

$get = mysqli_query($db, "select * from manifest where user='$user' order by id desc");

if (mysqli_num_rows($get) > 0)
{
while($row2 = mysqli_fetch_array($get))
{
$email = $row2['user'];

$output = array();

$output[] = $row2['from_'];
$output[] = $row2['to_'];
$output[] = $row2['dateposted'];
$output[] = $row2['status'];
$output[] = "<button class='btn btn-danger panic' id='".$row2['id']."'>Panic</button>";
$output[] = "<button class='btn btn-success checkout' id='".$row2['id']."'>Checkout</button>";
$output[] = "<button class='btn btn-info details' id='".$row2['id']."'>Details</button>";

$response[] = $output;    
}
echo json_encode($response);



}


?>