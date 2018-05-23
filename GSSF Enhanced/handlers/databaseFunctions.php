<?php
    require('../includes/config.inc.php');

    class ActiveShooterItem{
        var $shooterID, $shooterFirstName, $shooterLastName, $shooterDivision;
    }

    /////////////////////////////////////////////
    // GET FUNCTIONS
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
            echo json_encode("Division List Failure");
            return null;
        }
    }

    function GetActiveShooters($dbc){
        $query = "call Get_Shooter_List();";
        $result = $dbc->query($query);
        if($result){
            $shooterList = array();
            while ($row = $result->fetch_assoc()){
                $tempShooter = new ActiveShooterItem();
                $tempShooter->shooterID = $row['shooter_id'];
                $tempShooter->shooterFirstName = $row['shooter_first_name'];
                $tempShooter->shooterLastName = $row['shooter_last_name'];
                $tempShooter->shooterDivision = $row['division_name'];
                $shooterList[$tempShooter->shooterID]=$tempShooter;
            }
            mysqli_free_result($result);
            mysqli_close($dbc);
            return $shooterList;
        } else {
            echo "Shooter List issue";
            return null;
        }
    }

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

    function GetGunTypes($dbc){
        $query = "CALL Get_Gun_Types();";
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
            echo "Gun TYPES ISSUE";
            return -1;
        }
    }
    /////////////////////////////////////////////

    /////////////////////////////////////////////
    // Misc Functions
    function CheckForShooterData($dbc){
        $shooterID = (isset($_GET['shooterID'])) ? $_GET['shooterID'] : -1;
        $shootDate = (isset($_GET['shootDate'])) ? $_GET['shootDate'] : -1;

        if ($shooterID == -1 || $shootDate == -1){
            echo json_encode("Date or id wrong");
            exit();
        }

        $query = 'CALL Get_Has_Shooter_Shot("'.
                mysqli_real_escape_string($dbc,$shooterID).'","'.
                mysqli_real_escape_string($dbc,$shootDate).'");';



        $result = $dbc->query($query);
        if($result){
            if (mysqli_num_rows($result)> 0){

                mysqli_free_result($result);
                mysqli_close($dbc);
                return 1;
            } else {
                mysqli_free_result($result);
                mysqli_close($dbc);
                return -1;
            }
        } else {
            return -2;
        }
    }
    /////////////////////////////////////////////

    /////////////////////////////////////////////
    // INSERT FUNCTIONS
    // CAP FIRST LOWER RESET MY GODDDD
    function NewShooterHandler($dbc){

        $shooterDataArray = array();

        $shooterDataArray['firstName'] =(isset($_POST['firstName']) ? $_POST['firstName'] : 'Rusty');
        $shooterDataArray['lastName'] =(isset($_POST['lastName']) ? $_POST['lastName'] : 'Shackleford');
        $shooterDataArray['email'] =(isset($_POST['email']) ? $_POST['email'] : 'RustyShack@aol.com');
        $shooterDataArray['division'] =(isset($_POST['division']) ? $_POST['division'] : '5');

        $query= 'CALL Insert_new_shooter("'
               .mysqli_real_escape_string($dbc, $shooterDataArray['firstName']).'","'
               .mysqli_real_escape_string($dbc, $shooterDataArray['lastName']).'","'
               .mysqli_real_escape_string($dbc, $shooterDataArray['email']).'","'
               .mysqli_real_escape_string($dbc, $shooterDataArray['division']).'");';

        if ($dbc->query($query) != TRUE){
            echo json_encode($query);
            return false;
        }
        return true;
    }

    function NewEntryHandler($dbc){

        $tOneX = $_POST['targetOneNumOne'];
        $tOneTen = $_POST['targetOneNumTwo'];
        $tOneEight = $_POST['targetOneNumThree'];
        $tOneFive = $_POST['targetOneNumFour'];
        $tTwoX = $_POST['targetTwoNumOne'];
        $tTwoTen = $_POST['targetTwoNumTwo'];
        $tTwoEight = $_POST['targetTwoNumThree'];
        $tTwoFive = $_POST['targetTwoNumFour'];

        $shootDate = $_POST['shootDate'];
        $shooterID = $_POST['shooterID'];
        $gunModel = $_POST['gunModel'];
        $gunType = $_POST['gunType'];
        $ip = $_SERVER['REMOTE_ADDR'];
        $signature = $_POST['signature'];

        $query= 'CALL Insert_new_target_result("'
            .mysqli_real_escape_string($dbc, $tOneX).'","'
            .mysqli_real_escape_string($dbc, $tOneTen).'","'
            .mysqli_real_escape_string($dbc, $tOneEight).'","'
            .mysqli_real_escape_string($dbc, $tOneFive).'","'
            .mysqli_real_escape_string($dbc, $tTwoX).'","'
            .mysqli_real_escape_string($dbc, $tTwoTen).'","'
            .mysqli_real_escape_string($dbc, $tTwoEight).'","'
            .mysqli_real_escape_string($dbc, $tTwoFive).'","'
            .mysqli_real_escape_string($dbc, $shootDate).'","'
            .mysqli_real_escape_string($dbc, $shooterID).'","'
            .mysqli_real_escape_string($dbc, $gunModel).'","'
            .mysqli_real_escape_string($dbc, $gunType).'","'
            .mysqli_real_escape_string($dbc, $signature).'","'
            .mysqli_real_escape_string($dbc, $ip).'");';

        if ($dbc->query($query) != TRUE){
            echo $query;
            return false;
        }
     return true;
     }





    /////////////////////////////////////////////




    // CONTROL LOGIC
    // If it is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        switch($_POST['requestType']){
            case "addNewShooter":
                NewShooterHandler($dbc);
                break;
            case "addNewEntry":
                NewEntryHandler($dbc);
                break;
        }
    }
    // If it is a GET request
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        switch ($_GET['requestType']){
            case "divisions":
                echo json_encode(GetShooterDivisions($dbc));
                break;
            case "activeShooters":
                echo json_encode(GetActiveShooters($dbc));
                break;
            case "gunModels":
                echo json_encode(GetGunModels($dbc));
                break;
            case "shootCheck":
                echo json_encode(CheckForShooterData($dbc));
                break;
            case "gunTypes":
                echo json_encode(GetGunTypes($dbc));
                break;
        }
    }




?>