<?php
    require('../includes/config.inc.php');
    class ShootData{
    var $gunName, $gunType, $shooterFirst, 
        $shooterLast, $roundDate, $divisionName, 
        $targetOneX, $targetOneTen, $targetOneEight,
        $targetOneFive, $targetTwoX, $targetTwoTen,
        $targetTwoEight, $targetTwoFive;
    }

    function GetGunTypes($dbc){
        $query = "call Get_All_Shooter_Data();";
        $result = $dbc->query($query);
        if($result){
            $allData = array();
            while ($row = $result->fetch_assoc()){  
                $tempResult = new ShootData();
                $tempResult->gunName = $row['gun_name'];
                $tempResult->gunType = $row['gun_type'];
                $tempResult->shooterFirst = $row['shooter_first_name'];
                $tempResult->shooterLast = $row['shooter_last_name'];
                $tempResult->roundDate = $row['round_date'];
                $tempResult->divisionName = $row['division_name'];
                $tempResult->targetOneX = $row['targetone_x'];
                $tempResult->targetOneTen = $row['targetone_ten'];
                $tempResult->targetOneEight = $row['targetone_eight'];
                $tempResult->targetOneFive = $row['targetone_five'];
                $tempResult->targetTwoX = $row['targettwo_x'];
                $tempResult->targetTwoTen = $row['targettwo_ten'];
                $tempResult->targetTwoEight = $row['targettwo_eight'];
                $tempResult->targetTwoFive = $row['targettwo_five'];
                array_push($allData, $tempResult);
            }
            mysqli_free_result($result);
            mysqli_close($dbc);
            return $allData;
        } else {
            echo "All Data Issue";
            return null;
        }
        }

    $allData = GetGunTypes($dbc);

    echo json_encode ($allData);
?>