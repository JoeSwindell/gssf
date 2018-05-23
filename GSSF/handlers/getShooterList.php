<?php
        require('../includes/config.inc.php');


        class ShooterResult {
            var $shooterID, $shooterName, $shooterDivision;
        }


        function GetShooters($dbc){
            $query = "call Get_Shooter_List();";
            $result = $dbc->query($query);
            if($result){
                $shooterList = array();
                while ($row = $result->fetch_assoc()){  
                    $tempShooter = new ShooterResult();
                    $tempShooter->shooterID = $row['shooter_id'];
                    $tempShooter->shooterName = $row['shooter_name']; 
                    $tempShooter->shooterDivision = $row['division_name'];
                    array_push($shooterList, $tempShooter);
                }
                 mysqli_free_result($result);
                 mysqli_close($dbc);
                return $shooterList;
            } else {
                    echo "Shooter List issue";
                return null;
            }
        }

        $shooters = GetShooters($dbc);

        echo json_encode($shooters);
?>