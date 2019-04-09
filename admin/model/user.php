<?php
require("../model/database.php");
require("../model/functions.php");
$response = '';
$action = $_POST['action'];
/*
if ($action == "register")
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $gsm = $_POST['gsm'];
    $password = $_POST['password'];

    $imgname = "default.png";
    $check = "select * from md5_users where email='".$email."'";
    $count = mysqli_query($db, $check);

    if(mysqli_num_rows($count) == 0)
    {
    if (is_numeric($gsm)){
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
		

    if (!empty($_FILES))
    {
            
            $ext1 = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
		    if($ext1 == 'png' || $ext1 == 'jpeg' || $ext1 == 'jpg') 
	    	{
    
                $temp1 = explode(".", $_FILES['file']['name']);
                $imgname = round(microtime(true)).".".end($temp1);

                $path = "../img/avatar/".$imgname;
                if (!move_uploaded_file($_FILES['file']['tmp_name'], $path))
                {
                    $reponse = "File Uploaded but not saved";
                }  
            }
            else
            {
                    $reponse = "Invalid Image type";             
            }    
    }

    $passhash = md5($password);
    $query = "insert into md5_users (name, email, gsm, img, password) values ('$name', '$email', '$gsm', '$imgname', '$passhash')";
    $insert = mysqli_query($db, $query);
    if ($insert)
    {
       $reponse = "Success";
    }    
    else
    {
        $reponse = "Failed to insert, try again";
    }



    }else{$reponse = "Invalid Email";}
    }else{$reponse = "Password Must Be Numeric";}
    }else{$reponse = "Email already in use";}

    echo $reponse;
}
*/

if ($action == "login")
{
    if (isset($_POST['user']) && isset($_POST['password']))
    {
    
    $user = $_POST['user'];
    $passhash = md5($_POST['password']);
    $check = "select * from md5_admin where user='".$user."'";
    $count = mysqli_query($db, $check);
    $counter = mysqli_num_rows($count);
    if($counter != 0)
    {
        $checkpass = mysqli_fetch_array($count);
        $password = $checkpass['password'];
        if ($password == $passhash)
        {
            $data['user'] = $_POST['user'];
            $data['error'] = '';
            $row = mysqli_fetch_assoc($count);
            set_session($data);
        }
        else
        {
            $data['user'] = '';
            $data['error'] = "Invalid Password";
        }
    }
    else
    {
        $data['user'] = '';
        $data['error'] = "Invalid User"; 
    }
    }
    else
    {
        $data['user'] = '';
        $data['error'] = "Fill in both details"; 
        
    }
    echo json_encode($data);
}


if ($action == "logout")
{
    logout();
}

if ($action == "isAuthenticated")
{
    
    $result = is_cookie_set();
    echo $result;
    
}

if ($action == "check_if_logged_in")
{
    $result = get_session_data();  
    echo json_encode($result); 
}

if ($action == "sendmail")
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $msg = mysqli_real_escape_string($db, $_POST['msg']);
    $to = "contact@locate.com.ng";
    if ($name != '' && $email != '' && $subject != '' && $msg !== '')
    {
        $body = "<h3>Name: $name</h3>
        <h3>Email: $email</h3>
        $msg
        ";

        if (email($to,$body,$subject))
        {
            $response = "success";
        }
    }


}
?>