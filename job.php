<?php
include("model/database.php");
include("model/functions.php");
$check_query = mysqli_query($db, "select * from manifest where status='pending'");
if ($count != 0)
{
    while ($row = mysqli_fetch_array($check_query))
    {
        $dateposted = $row['dateposted'];
        $est = $row['est'];
        $ex =  strtotime($dateposted) + $est * 3600;
        $new = time();

        if ($new > $ex)
        {
            //send mail and sms
            //user mail
            $email = $row['user'];
            //kin's phone number
            $kin = $row['kin'];
            $kingsm = $row['kingsm'];
            
            //locations going to and from
            $from = $row['from_'];
            $to = $row['to_'];

            //type
            $type = $row['type']."ing";
            $get = mysqli_query($db, "select * from md5_users where email='$email'");
            $r = mysqli_fetch_array($get);
            //user name
            $name = $r['name'];
            $gsm = $r['gsm'];
            $subject = "Locate Notification";    

            //message for mail & sms
        
            $message = "Hello  $name, You have not confirmed that you have gotten to your destination or gotten home.
            Please do login to do so.
            Best Regards.
            ";

            //user
            email($email, $message, $subject);
            
            //next of kin
          $message2 = "Hello $kon, $name registered you as her next of kin and is $type from $from to $to.<br>
            Please try to check up on $name.
            Best Regards.
            ";
     //       sms();
    //           email($sendto, $message2, $subject);
            

                //admin
            $message2 = "Hello Admin, $name has not checkedout.<br> 
            Please try to check up. Phone number is $gsm<br>
            Travel Details: <br> 
            From: $from<br>
            To: $to<br>
            Time Departed: $dateposted<br>
            Next of Kin: $kin<br>
            Phone Number: $kingsm<br>
            Best Regards.
            ";
            $sendto = "alert@locate.ng";
            email($sendto, $message2, $subject);
            
            


        }    
    }

}

?>