<?php
require("../model/database.php");
require("../model/functions.php");
$response = '';
$action = $_POST['action'];



if ($action == "get")
{
    $output = array();
    $id = $_POST['id'];

$query = "select * from missing where id='$id'";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        
        $img = "<img src='../img/missing/".$row['img']."' class='img-thumbnail' style='maxheight:300'/>";
        $output['img'] = $img;
        $output['name'] = $row['name'];
        $output['day'] = $row['day'];
        $output['info'] = $row['info'];
        $output['status'] = $row['status'];
        $output['timeposted'] = $row['timeposted'];
        $day = $row['day'];
$now = time(); // or your date as well
$your_date = strtotime($day);
$datediff = $now - $your_date;

$days =  floor($datediff / (60 * 60 * 24));


        $output['days'] = $days;
        $output['lastloc'] = $row['lastloc'];
        $output['age'] = $row['age'];
        $output['gender'] = $row['gender'];
        $output['language'] = $row['language'];
        $output['relationship'] = $row['relationship'];
        
        
        $get = mysqli_fetch_array(mysqli_query($db, "select * from md5_users where email='".$row['user']."'"));
        $postedby = $get['name'];
        $output['postedby'] = $postedby;
    }
    echo json_encode($output);

}

}



if ($action == "found")
{
    
        $id = $_POST['id'];
        $insert = mysqli_query($db, "update missing set status='Found' where id='$id' ");
        if ($insert)
        {
            $result = "success";
        }
        else
        {
            $result = "Error, Please try again";
        }
    
    
    echo $result;


}

if ($action == "sendmail")
{
    $id = $_POST['mail_id'];
    $msg = mysqli_real_escape_string($db, $_POST['mail_msg']);
    $subject = mysqli_real_escape_string($db, $_POST['mail_sub']);
    $insert = '';
    //get volunteers
    $query = mysqli_query($db, "select * from volunteer");
    while ($get = mysqli_fetch_array($query))
    {
        $email = $get['user'];
        $query = mysqli_query($db, "select * from md5_users where email='$email'");
        $row = mysqli_fetch_assoc($query);
        $gsm = $row['gsm'];

        $to = $email;
        $insert = email($to, $msg, $subject);
    }
     if ($insert)
        {
            $result = "success";
        }
        else
        {
            $result = "Error, Please try again";
        }
    
    
    echo $result;
}
?>