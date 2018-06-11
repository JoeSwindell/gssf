<?php
require('../includes/config.inc.php');
class ShootData{
    var $gunName, $gunType, $shooterFirst,
    $shooterLast, $roundDate, $divisionName,
    $targetOneX, $targetOneTen, $targetOneEight,
    $targetOneFive, $targetTwoX, $targetTwoTen,
    $targetTwoEight, $targetTwoFive, $shooterID,
    $email;
}
class LocationClass{
    var $id, $name;
}
class RoundClassItem{
    var  $roundID, $targetID, $shooterID, $divisionID, $gunType, $gunID, $roundGroup, $roundLocation, $roundDate, $roundCount;
}
class ResultView{
    var $shooterName, $divisionName, $gunName, $totalX, $totalScore;
}
class RoundGroups{
    var $groupID, $dateOne, $dateTwo, $dateThree, $dateFour, $dateFive, $dateSix;
}

function GetSingleDate($dbc, $date){
    $query = 'CALL Get_All_Rounds_From_Date("'.$date.'")';
    $result = $dbc->query($query);
    if($result){
        $roundList = array();
        while ($row = $result->fetch_assoc()){
            $tempRound = new RoundClassItem();
            $tempRound->roundID = $row['round_id'];
            $tempRound->targetID = $row['target_id'];
            $tempRound->shooterID = $row['shooter_id'];
            $tempRound->divisionID = $row['division_id'];
            $tempRound->gunType = $row['gun_type'];
            $tempRound->gunID = $row['gun_id'];
            $tempRound->roundGroup = $row['round_group'];
            $tempRound->roundLocation = $row['round_location'];
            array_push($roundList, $tempRound);
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $roundList;
    } else {
        echo "Round Single Date List issue";
        return null;
    }
}
function GetAllRoundDates($dbc){
    $query = "CALL Get_All_Round_Dates()";
    $result = $dbc->query($query);
    if($result){
        $roundList = array();
        while ($row = $result->fetch_assoc()){
            $tempRound = new RoundClassItem();
            $tempRound->roundDate = $row['round_date'];
            $tempRound->roundCount = $row['Round_Count'];
            array_push($roundList, $tempRound);
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $roundList;
    } else {
        echo "Round Date List issue";
        return null;
    }
}
function GetLocations($dbc){
    $query = "CALL Get_Match_Locations();";
    $result = $dbc->query($query);
    if($result){
        $locationsList = array();
        while ($row = $result->fetch_assoc()){
            $tempLocation = new LocationClass();
            $tempLocation->id = $row['round_locations_id'];
            $tempLocation->name = $row['round_locations_name'];
            array_push($locationsList,$tempLocation);
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $locationsList;
    } else {
        echo json_encode("Location List Failure");
        return null;
    }
}
function GetAllData($dbc){
    $query = "call Get_All_Shooter_Data();";
    $result = $dbc->query($query);
    if($result){
        $allData = array();
        while ($row = $result->fetch_assoc()){
            $tempResult = new ShootData();
            $tempResult->shooterID = $row['shooter_id'];
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
function GetLocationsByDate($dbc, $date){
    $query = "CALL Get_Locations_By_Single_Date('$date');";
    $result = $dbc->query($query);
    if($result){
        $locationByDate = array();
        while ($row = $result->fetch_assoc()){
            $locationByDate[$row['round_location']] = $row['round_locations_name'];
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $locationByDate;
    } else {
        echo json_encode("Location By Date Failure");
        return null;
    }
}
function GetMatchesByLocationAndDate($dbc, $date, $location){
    $query = "CALL Get_Round_Types_By_Location_And_Date('$date', '$location');";
    $result = $dbc->query($query);
    if($result){
        $matchesByDateAndLocation = array();
        while ($row = $result->fetch_assoc()){
            $matchesByDateAndLocation[$row['gun_types_id']] = $row['gun_type'];
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $matchesByDateAndLocation;
    } else {
        echo json_encode("Match Types By Date and Location Failure");
        return null;
    }
}
function GetMatchesByLocationAndDateAndType($dbc, $date, $location, $matchType){
    $query = "CALL Get_Round_Types_By_Location_And_Date_And_Type('$date', '$location','$matchType');";
    $result = $dbc->query($query);
    if($result){
        $matchesByDateAndLocationType = array();
        while ($row = $result->fetch_assoc()){
            $tempResult = new ResultView();
            $tempResult->shooterName = $row['Name'];
            $tempResult->divisionName = $row['division_name'];
            $tempResult->gunName = $row['gun_name'];
            $tempResult->totalX = $row['TotalX'];
            $tempResult->totalScore = $row['TotalScore'];

            array_push($matchesByDateAndLocationType, $tempResult);
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $matchesByDateAndLocationType;
    } else {
        echo json_encode("Match Types By Date and Location and Type Failure");
        return null;
    }
}
function GetAllActiveShooters($dbc){
    $query = "call Get_All_Active_Shooters();";
    $result = $dbc->query($query);
    if($result){
        $allData = array();
        while ($row = $result->fetch_assoc()){
            $tempResult = new ShootData();
            $tempResult->shooterID = $row['shooter_id'];
            $tempResult->shooterFirst = $row['shooter_first_name'];
            $tempResult->shooterLast = $row['shooter_last_name'];
            $tempResult->email = $row['shooter_email'];
            $tempResult->divisionName = $row['division_name'];

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
function GetAllSeries($dbc){
    $query = "call Get_All_Round_Groups();";
    $result = $dbc->query($query);
    if($result){
        $groupResults = array();
        while ($row = $result->fetch_assoc()){
            $tempResult = new ShootData();
            $tempResult->groupID = $row['round_groups_id'];
            $tempResult->dateOne = $row['round_group_date_one'];
            $tempResult->dateTwo = $row['round_group_date_two'];
            $tempResult->dateThree = $row['round_group_date_three'];
            $tempResult->dateFour = $row['round_group_date_four'];
            $tempResult->dateFive = $row['round_group_date_five'];
            $tempResult->dateSix = $row['round_group_date_six'];

            array_push($groupResults, $tempResult);
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $groupResults;
    } else {
        echo "All Data Issue";
        return null;
    }
}
// If it is a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    switch ($_GET['requestType']){
        case "locations":
            echo json_encode(GetLocations($dbc));
            break;
        case "roundDates":
            echo json_encode(GetAllRoundDates($dbc));
            break;
        case "allData":
            echo json_encode(GetAllData($dbc));
            break;
        case "singleDate":
            echo json_encode(GetSingleDate($dbc, $_GET['singleDate']));
            break;
        case "locationsByDate":
            echo json_encode(GetLocationsByDate($dbc, $_GET['singleDate']));
            break;
        case "matchesByLocationAndDate":
            echo json_encode(GetMatchesByLocationAndDate($dbc, $_GET['singleDate'], $_GET['location']));
            break;
        case "matchesByLocationAndDateAndType":
            echo json_encode(GetMatchesByLocationAndDateAndType($dbc, $_GET['singleDate'], $_GET['location'], $_GET['matchType']));
            break;
        case "allActiveShooters":
            echo json_encode(GetAllActiveShooters($dbc));
            break;
        case "allSeries":
            echo json_encode(GetAllSeries($dbc));
            break;
    }
}
