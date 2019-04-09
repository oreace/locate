<?php
         function is_cookie_set()
        {
            if (isset($_COOKIE['email']))
            {
                $data['email'] = $_COOKIE['email'];
                set_session($data);
                return true;
            }
            return false;
        }
       

        
        function set_cookie($data = '')
        {
            $expiration_date = time() + 86400;
            setcookie("email", $data['email'], $expiration_date, "/");
        }
        
        function set_session($data = '')
        {
            if (!isset($_SESSION))
            {
                session_start();
            }
            if (!empty($data))
            {
                 $_SESSION['email'] = $data['email'];
            }
        }

       function get_session_data()
       {
            if (!isset($_SESSION))
            {
                session_start();
            }
            if(isset($_SESSION['email']))
            {
                $data['email'] = $_SESSION['email'];
            }
            else
            {
                $data['email'] = '';
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
            unset($_SESSION['email']);
            session_destroy();
        }

        function unset_cookie()
        {
            if (isset($_COOKIE['email']))
            {
                $expiration_date = time() - 86400;
                setcookie("email", "", $expiration_date);
            }
        }   


function email($to, $message,$subject){
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= "From: Locate <noreply@locate.ng>" . "\r\n";
	$body = "<html>
    <hr>
                <p>$message</p>
				<br>
                <br>
                <p>If you did not register on our website or do not know the person's name mentioned, please ignore this email.</p>
    
   <br>
    <hr>
    
    For Help and more info contact us at <a href='http://locate.ng'>Locate</a><br>
    Mail us at <a href='mailto:info@locate.ng'>info@locate.ng</a>
    </html>";
    @$send_mail = mail($to, $subject, $body, $headers);
}



?>