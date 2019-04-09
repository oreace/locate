<?php
require('database.php');    
$output = array();

$query = "select * from missing order by status ";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        $result2 = array();
        $result2[] = $row['name'];
$day = $row['day'];
$now = time(); // or your date as well
$your_date = strtotime($day);
$datediff = $now - $your_date;

$days =  floor($datediff / (60 * 60 * 24));

        $result2[] = $days;
        $result2[] = $row['lastloc'];
        $result2[] = $row['status'];
        $result2[] = "<a class='btn btn-success' href='cases/".$row['id']."'>View</a>";
       // $result2[] = "<button class='btn btn-info volunteer' id='".$row['id']."'>Volunteer</button>";
        $output[] = $result2;
    }
    echo json_encode($output);

}
?>