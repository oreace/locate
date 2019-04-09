<?php
require("../model/database.php");
require("../model/functions.php");
$response = '';
$action = $_POST['action'];


if ($action == "get")
{
    $output = array();
    $id = $_POST['id'];

$query = "select * from md5_users where id='$id'";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        
      //  $img = "<img src='../img/avatar/".$row['img']."' class='img-thumbnail' style='maxheight:300'/>";
      //  $output['img'] = $img;
        $output['name'] = $row['name'];
        $output['email'] = $row['email'];
        $output['gsm'] = $row['gsm'];
        $output['state'] = $row['state'];
        $output['address'] = $row['address'];
        
    }
    echo json_encode($output);

}

}


if ($action == "delete")
{
    
    $id = $_POST['id'];
    $check = mysqli_query($db, "select * from md5_users where id='$id'");
    $count = mysqli_num_rows($check);
    if ($count == 1)
    {
        $insert = mysqli_query($db, "delete from md5_users where id='$id'");
        if ($insert)
        {
            $result = "success";
        }
        else
        {
            $result = "Error, Please try again";
        }
    }
    else
    {
        $result = "Error, Please Try";
    } 
    
    
    echo $result;


}

?>