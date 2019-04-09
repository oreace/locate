<?php
require("../model/database.php");
require("../model/functions.php");
$response = '';
$action = $_POST['action'];


if ($action == "panic")
{
    
    $id = $_POST['id'];
    
       //SEND MAIL AND SMS TO BOTH ADMIN AND NEXT OF KIN;
       //
       //
       //
       //
        $insert = mysqli_query($db, "update manifest set status='panicked' where id='$id'");
        if ($insert)
        {
            $result = "success";
        }
        else
        {
            $result = "Something Happened, Please try again";
        }
    
    
    echo $result;


}

if ($action == "checkout")
{
    $id = $_POST['id'];
    $check = mysqli_query($db, "select * from manifest where id='$id' and status='Checked-out' or status='panicked'");
    $count = mysqli_num_rows($check);

    
    if ($count == 0)
    {
        $insert = mysqli_query($db, "update manifest set status='Checked-out' where id='$id'");
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
        $result = "You have already checked-out or panicked";
    } 
    
    
    echo $result;



}

?>