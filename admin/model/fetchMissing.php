<?php
require('database.php');    
$output = array();

$query = "select * from missing where status='pending'";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0)
{
    while($row = mysqli_fetch_array($result))
    {
        $result2 = array();
        $result2[] = $row['name'];
        $result2[] = $row['age'];
        $result2[] = $row['gender'];
        $result2[] = $row['day'];
        $result2[] = $row['lastloc'];
        
        $result2[] = "<button class='btn btn-success viewmissing' id='".$row['id']."'>View</button>";
        $result2[] = "<button class='btn btn-primary found' id='".$row['id']."'>Found</button>";
        $output[] = $result2;
    }
    echo json_encode($output);

}
?>