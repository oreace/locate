<?php
require("../model/database.php");
require("../model/functions.php");
$response = '';
$action = $_POST['action'];


if ($action == "insert")
{
    if (isset($_POST['name']) && isset($_POST['day']) && isset($_POST['age']) && isset($_POST['language']) && isset($_POST['lastloc']) && isset($_POST['info']) && isset($_POST['relationship']))
    {
    $name = $_POST['name'];
    $day = $_POST['day'];
    $info = $_POST['info'];
   
    $lastloc = $_POST['lastloc'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $language = $_POST['language'];
    $relationship = $_POST['relationship'];


   //$date1 = strtr($_POST['day'], '/', '-');
   //$day  = date('Y-m-d', strtotime($date1));
    $user = $_POST['user'];
    if (!empty($_FILES))
    {
            
            $ext1 = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
		    if($ext1 == 'png' || $ext1 == 'jpeg' || $ext1 == 'jpg') 
	    	{
    
                $temp1 = explode(".", $_FILES['file']['name']);
                $imgname = round(microtime(true)).".".end($temp1);

                $path = "../img/missing/".$imgname;
                if (!move_uploaded_file($_FILES['file']['tmp_name'], $path))
                {
                    $reponse = "File Uploaded but not saved, try again";
                }
                else
                {   $info = NULL;
                    if (isset($_POST['info']))
                    {
                        $info = $_POST['info'];    
                    }
                    $query = "insert into missing (name, age, gender, language, day, lastloc, info, relationship, img, user) values ('$name', '$age', '$gender', '$language', '$day', '$lastloc','$info', '$relationship','$imgname', '$user')";
                    $insert = mysqli_query($db, $query);
                    if ($insert)
                    {
                    $reponse = "Success";
                    }    
                    else
                    {
                    $reponse = "Failed to insert, try again";
                    }

                }  
            }
            else
            {
                    $reponse = "Invalid Image type";             
            }    
    }
    else
    {
        $reponse = "Invalid Image Size, Please use images less than 2mb";             
    }

    }
    else
    {
        $reponse = "Please fill all neccesary info";
    }


    
echo $reponse;

}

if ($action == "display")
{
    $output = array();

$query = "select * from missing order by id desc";
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


if ($action == "volunteer")
{
    

    $user = $_POST['user'];
    

    $check = mysqli_query($db, "select * from volunteer where user='$user'");
    $count = mysqli_num_rows($check);
    if ($count == 0)
    {
        $insert = mysqli_query($db, "insert into volunteer (user) value ('$user')");
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
        $result = "You have already volunteered";
    } 
    
    
    echo $result;


}




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
        
        $img = "<img src='img/missing/".$row['img']."' class='img-thumbnail' style='maxheight:300'/>";
        $output['img'] = $img;
        $output['name'] = $row['name'];
        $output['day'] = $row['day'];
        $output['info'] = $row['info'];
        $output['status'] = $row['status'];
        $output['timeposted'] = $row['timeposted'];
        $get = mysqli_fetch_array(mysqli_query($db, "select * from md5_users where email='".$row['user']."'"));
        $postedby = $get['name'];
        $output['postedby'] = $postedby;
    }
    echo json_encode($output);

}

}

?>