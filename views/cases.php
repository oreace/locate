<?php 
require_once('../model/database.php');    
$id = $_GET['id'];
$check = mysqli_query($db, "select * from missing where id='$id' LIMIT 1");
$count = mysqli_num_rows($check);
if ($count == 1)
{
    $row = mysqli_fetch_assoc($check);
    $name = $row['name'];
    $day = $row['day'];
    $info = $row['info'];
    $img = $row['img'];
    $lastloc = $row['lastloc'];
    $age = $row['age'];
    $gender = $row['gender'];
    $language = $row['language'];
    $relationship = $row['relationship'];

$now = time(); // or your date as well
$your_date = strtotime($day);
$datediff = $now - $your_date;

$days =  floor($datediff / (60 * 60 * 24));

?>
	<section id="content">
		<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="text-center">
                    <img src="img/missing/<?php echo $img; ?>" width="500" class="img-thumbnail"/>
            		<h1>Name: <?php echo $name ?></h1>					
                    
                    <ul class="list-group" style="list-style-type:none">
                    <li>Day Missing: <?php echo $day; ?></li>
                    <li>Age: <?php echo $age; ?></li>
                    <li>Gender: <?php echo $gender; ?></li>
                    <li>Primary Language: <?php echo $language; ?></li>
                    <li>Last Location Found: <?php echo $lastloc; ?></li>
                    <li>Other Information: <?php echo $info; ?></li>
                    <li><h2 class="label-warning">DAYS MISSING: <?php echo $days; ?></h3></li>
                    </ul>
            	</div>
			</div>		
		</div>
		</div>



<?php
}
else
{
    echo"
    <h3>Subject Not found, Please Try Again</h3>
    ";
}
?>


