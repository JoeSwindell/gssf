<?php
require('../includes/config.inc.php');

    function GetShooterDivisions($dbc){
        $query = "call Get_Shooter_Divisions();";
        $result = $dbc->query($query);
        if($result){
            $divisionList = array();
            while ($row = $result->fetch_assoc()){
                $divisionList[$row['shooter_division_id']] = $row['division_name'];
            }
            mysqli_free_result($result);
            mysqli_close($dbc);
            return $divisionList;
        } else {
            echo "Division List";
            return null;
        }
    }

    $divisionResults = GetShooterDivisions($dbc);

    echo json_encode ($divisionResults);

?>