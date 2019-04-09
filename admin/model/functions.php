<?php
         function is_cookie_set()
        {
            if (isset($_COOKIE['user']))
            {
                $data['user'] = $_COOKIE['user'];
                set_session($data);
                return true;
            }
            return false;
        }
       

        
        function set_cookie($data = '')
        {
            $expiration_date = time() + 86400;
            setcookie("user", $data['user'], $expiration_date, "/");
        }
        
        function set_session($data = '')
        {
            if (!isset($_SESSION))
            {
                session_start();
            }
            if (!empty($data))
            {
                 $_SESSION['user'] = $data['user'];
            }
        }

       function get_session_data()
       {
            if (!isset($_SESSION))
            {
                session_start();
            }
            if(isset($_SESSION['user']))
            {
                $data['user'] = $_SESSION['user'];
            }
            else
            {
                $data['user'] = '';
            }    
            return $data;
        }

        function logout()
        {
            unset_cookie();
            if (!isset($_SESSION))
            {
                session_start();
            }
            unset($_SESSION['user']);
            session_destroy();
        }

        function unset_cookie()
        {
            if (isset($_COOKIE['user']))
            {
                $expiration_date = time() - 86400;
                setcookie("user", "", $expiration_date);
            }
        }   


function email($to, $message,$subject){
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= "From: Locate <noreply@locate.com.ng>" . "\r\n";
	$body = "<html>
    <hr>
                <p>$message</p>
				<br>
                <br>
                <p>If you did not register on our website, please ignore this email.</p>
    
   <br>
    <hr>
    
    For Help and more info contact us at <a href='http://locate.com.ng'>Locate</a><br>
    Mail us at <a href='mailto:support@locate.com.ng'>support@locate.com.ng</a>
    </html>";
    @$send_mail = mail($to, $subject, $body, $headers);
}

?>