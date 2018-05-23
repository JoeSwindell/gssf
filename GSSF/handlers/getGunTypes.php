<?php
    require('../includes/config.inc.php');

    function GetGunTypes($dbc){
        $query = "call Get_Gun_Types();";
        $result = $dbc->query($query);
        if($result){
            $gunResults = array();
            while ($row = $result->fetch_assoc()){            
                $gunResults[$row['gun_types_id']] = $row['gun_type'];                    
            }
            mysqli_free_result($result);
            mysqli_close($dbc);
            return $gunResults;
        } else {
            echo "Gun Type Issue";
            return null;
        }
        }

    $gunTypes = GetGunTypes($dbc);

    echo json_encode ($gunTypes);
?>