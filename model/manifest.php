<?php
require("../model/database.php");
require("../model/functions.php");
$response = '';
$action = $_POST['action'];


if ($action == "insert")
{

             $user = '';
             if (!isset($_SESSION))
            {
                session_start();
            }
            if(isset($_SESSION['email']))
            {
                $user = $_SESSION['email'];
           
if (isset($_POST['from']) && isset($_POST['to']) && isset($_POST['est']) && isset($_POST['number']) && isset($_POST['address'])  && isset($_POST['kin'])  && isset($_POST['kingsm']))
{
$from = $_POST['from'];     
$to = $_POST['to'];     
$est = $_POST['est'];     
$number = $_POST['number'];     
$address = $_POST['address'];     
$type = $_POST['type']; 
$kin = $_POST['kin'];
$kingsm = $_POST['kingsm'];
$check = mysqli_query($db, "select * from manifest where user='$user' and status='pending'");
$count = mysqli_num_rows($check);
if ($count ==  0)
{

$insert = mysqli_query($db, "insert into manifest (user, from_, to_, est, number, address, type, kin, kingsm) values ('$user', '$from', '$to', '$est', '$number', '$address', '$type', '$kin', '$kingsm')");
if ($insert)
{
    $response= "success";
}
else
{
    $response = "Some error occured, try again";
}
}
else
{
    $response = "Please check out pending manifest";
}

}
else
{
    $response = "Fill all details Please";
}

}
else
{
    $response = "Please Login";
}

echo $response;

}




if ($action == "display")
{
    $output = array();
    $user = '';
             if (!isset($_SESSION))
            {
                session_start();
            }
            if(isset($_SESSION['email']))
            {
                $user = $_SESSION['email'];
            }
               
$query = "select * from manifest where user='$user' order by id desc";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        $output[] = $row;
    }
    echo json_encode($output);

}

}


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
    $check = mysqli_query($db, "select * from manifest where id='$id' and status='pending'");
    $count = mysqli_num_rows($check);

    
    if ($count == 1)
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


if ($action == "get")
{
    $output = array();
    $id = $_POST['id'];

$query = "select * from manifest where id='$id'";
$result = mysqli_query($db, $query);

if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        
        $output['from'] = $row['from_'];
        $output['to'] = $row['to_'];
        $output['number'] = $row['number'];
        $output['address'] = $row['address'];
        $output['dateposted'] = $row['dateposted'];
        $output['datedepart'] = $row['datedepart'];
        $output['type'] = $row['type'];
        $output['status'] = $row['status'];
    
    }
    echo json_encode($output);

}

}


?>