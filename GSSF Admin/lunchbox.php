<?php 
include ('./includes/admin_header.php');
include './includes/navbar.php';

class MatchResult{
    var $shooterName, $dName, $gunName, $totalX, $totalScore;
}


    function GetResultsByDivision($dbc, $division){        
        $query = "SELECT 	
		concat(shooter_first_name, ' ', shooter_last_name) as 'Name',
		division_name,
		gun_name,
		(targetone_x + targetTwo_x) as TotalX,
		(targetone_x * 10) + (targetone_ten*10) + (targetone_eight * 8) + (targetone_five * 5) + (targettwo_x * 10) + (targettwo_ten * 10) +  (targettwo_eight * 8) +  (targettwo_five * 5) as TotalScore
	    from
		    round 
	    Inner Join
		    gun_types 
	    on
		    round.gun_type = gun_types.gun_types_id
	    INNER JOIN	
		    shooters 
	    ON
		    round.shooter_id = shooters.shooter_id	
	    INNER JOIN
		    shooter_division
	    ON
		    shooters.shooter_division = shooter_division.shooter_division_id
	    INNER JOIN
		    gun_list
	    ON
		    round.gun_id = gun_list.gun_list_id
	    INNER JOIN
		    targets
	    ON
		    round.target_id = targets.target_id
	    where 
		    (round_date = \"2018-05-27\"
            || round_date = \"2018-05-28\")
		    and gun_types.gun_types_id = \"$division\" 
		    and round_location = 1

	    GROUP By concat(shooter_first_name, ' ', shooter_last_name)
	    ORDER BY TotalScore desc, totalX desc;";
        
        $result = $dbc->query($query);

        if($result){
            $resultArray = array();
             while ($row = $result->fetch_assoc()){
                $tempResult = new MatchResult();
                $tempResult->shooterName = $row['Name'];
                $tempResult->dName = $row['division_name'];
                $tempResult->gunName = $row['gun_name'];
                $tempResult->totalX = $row['TotalX'];
                $tempResult->totalScore = $row['TotalScore'];

               
              
                array_push($resultArray, $tempResult);
            }
            mysqli_free_result($result);           
            return $resultArray;
        } else {
            echo $query;
            return null;
        }
    }


    $pocketResults = array();
    $stockResults =array();
    $UnlimitedResults = array();

    $pocketResults = GetResultsByDivision($dbc, '1');          
    $stockResults = GetResultsByDivision($dbc, '2');          
    $unlimitedResults = GetResultsByDivision($dbc, '3');   

    mysqli_close($dbc);
?>
<body>
    <div class="container">

        <div class="row">
            <div class="col-sm-6 centerContent"><h2>Pocket Results</h2></div>
        </div>     
        
        <div class="row">
            <div class="col-sm-6">
                <table id="pocketTable" class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Division</th>
                            <th scope="col">Total X's</th>
                            <th scope="col">Total Score</th>

                        </tr>
                    </thead>
                    <tbody id="pocketResult"></tbody>                   
                    <?php
                    $counter = 1;
                    foreach($pocketResults as $result){
                   
                   
                    echo '<tr>';
                    echo '<td>'. $counter . '</td>';
                    echo '<td>' . $result->shooterName . '</td>';
                    echo '<td>' . $result->dName . '</td>';
                    echo '<td>' .  $result->totalX . '</td>';
                    echo '<td>' .  $result->totalScore . '</td>';
                    echo '</tr>';
                    $counter++;
                    }
                    ?>
                </table>             
            </div>
        </div>
        
            
        <div class="row">
            <div class="col-sm-6 centerContent"><h2>Unlimited Results</h2></div>
        </div>
        
        <div class="row">
            <div class="col-sm-6">
                <table id="unlimitedTable" class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Division</th>
                            <th scope="col">Total X's</th>
                            <th scope="col">Total Score</th>

                        </tr>
                    </thead>
                    <tbody id="unlimitedResults"></tbody>
                    <?php
                    $counter = 1;
                        foreach($unlimitedResults as $result){
                                $totalX = $result->tOneX  +  $result->tTwoX;
                                $totalScore = (($result->tOneX * 10) + ($result->tOneTen*10) + ($result->tOneEight * 8) + ($result->tOneFive * 5)+ ($result->tTwoX * 10) + ($result->tTwoTen*10) + ($result->tTwoEight * 8) + ($result->tTwoFive * 5));
                                
                                echo '<tr>';
                                echo '<td>' . $counter . '</td>';
                                echo '<td>' . $result->shooterName . '</td>';
                                echo '<td>' . $result->dName . '</td>';
                                echo '<td>' .  $result->totalX . '</td>';
                                echo '<td>' .  $result->totalScore . '</td>';
                                echo '</tr>';
                                $counter++;
                            }
                    ?>
                </table>             
         </div>
    </div>

                    
        <div class="row">
            <div class="col-sm-6 centerContent"><h2>Stock Results</h2></div>
         </div>  
         <div class="row">
            <div class="col-sm-6">
            <table id="stockTable" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">Division</th>
                        <th scope="col">Total X's</th>
                        <th scope="col">Total Score</th>

                    </tr>
                </thead>
                <tbody id="stockResults"></tbody>
                <?php
                $counter = 1;
                foreach($stockResults as $result){
                    $totalX = $result->tOneX  +  $result->tTwoX;
                    $totalScore = (($result->tOneX * 10) + ($result->tOneTen*10) + ($result->tOneEight * 8) + ($result->tOneFive * 5)+ ($result->tTwoX * 10) + ($result->tTwoTen*10) + ($result->tTwoEight * 8) + ($result->tTwoFive * 5));
                        
                    echo '<tr>';
                    echo '<td>' . $counter . '</td>';
                    echo '<td>' . $result->shooterName . '</td>';
                    echo '<td>' . $result->dName . '</td>';
                    echo '<td>' . $result->totalX . '</td>';
                    echo '<td>' . $result->totalScore . '</td>';
                    echo '</tr>';
                    $counter++;
                }
                ?>
            </table>             
        </div>
        </div>

        
     <?php         
        include('./includes/admin_footer.php');?>