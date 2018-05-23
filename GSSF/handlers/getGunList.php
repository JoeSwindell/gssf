<?php
    require('../includes/config.inc.php');

    function GetGunModels($dbc){
            $query = "call Get_Gun_List();";
            $result = $dbc->query($query);
            if($result){
                $gunResults = array();
                while ($row = $result->fetch_assoc()){            
                    $gunResults[$row['gun_list_id']] = $row['gun_name'];                    
                }
                mysqli_free_result($result);
                mysqli_close($dbc);
                return $gunResults;
            } else {
                echo "Gun list Issue";
                return null;
            }
         }

    $gunList = GetGunModels($dbc);

    echo json_encode ($gunList);
?>