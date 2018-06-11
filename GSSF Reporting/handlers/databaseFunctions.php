<?php
require('../includes/config.inc.php');

class SecondLevelLocation{
    var $roundDate, $roundLocationsID, $roundID, $roundLocationsName, $gunID, $gunName, $gunType, $shooterDivisionID;
    var $divisionName, $shooterID, $shooterFirstName, $shooterLastName;
}

function QueryMatchByLocation($dbc, $query){
    $result = $dbc->query($query);
    if($result){
        $resultsArray = array();
        while ($row = $result->fetch_array()){
            $tempResult = new SecondLevelLocation();
            $tempResult->roundDate = $row['round_date'];
            $tempResult->roundLocationsID = $row['round_locations_id'];
            $tempResult->roundLocationsName = $row['round_locations_name'];
            $tempResult->roundID = $row['round_id'];
            $tempResult->gunID = $row['gun_id'];
            $tempResult->gunName = $row['gun_name'];
            $tempResult->gunType = $row['gun_type'];
            $tempResult->shooterDivisionID = $row['shooter_division_id'];
            $tempResult->divisionName = $row['division_name'];
            $tempResult->shooterID = $row['shooter_id'];
            $tempResult->shooterFirstName = $row['shooter_first_name'];
            $tempResult->shooterLastName = $row['shooter_last_name'];
            array_push($resultsArray, $tempResult);
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $resultsArray;
    } else {
        echo json_encode("Generic Query Error");
        return null;
    }
}

function QueryRoundResultsFromDate($dbc, $query){
    echo json_encode($query);
}

function QuerySeriesResultsSet($dbc, $query){
    echo json_encode($query);
}

// First query made by reporting page,
// Location, Date, Series
function GenericQuery($dbc){
    if(!isset($_GET['requestData']) || (empty($_GET['requestData']))){
        die("No Get Param set");
    }
    $query = "";
    switch($_GET['requestData']){
        case "Location":
            $query = "CALL Get_Match_Locations();";
            break;
        case "Date":
            $query = "CALL Get_All_Round_Dates();";
            break;
        case "Series":
            $query = "CALL Get_All_Round_Groups();";
            break;
    }

    $result = $dbc->query($query);
    if($result){
        $resultsArray = array();
        while ($row = $result->fetch_array(MYSQLI_NUM)){
            $resultsArray[$row['0']] = $row['1'];
        }
        mysqli_free_result($result);
        mysqli_close($dbc);
        return $resultsArray;
    } else {
        echo json_encode("Generic Query Error");
        return null;
    }
}
// Second query made by reporting page
// Specific Location, Date, Series
function SecondLevelQuery($dbc){
    if(!isset($_GET['requestType']) || (empty($_GET['requestType']))){die("No request type set");}
    if(!isset($_GET['queryData'])){die("No query data set"); }
    if(!isset($_GET['queryType']) || (empty($_GET['queryType']))){die("No query type set"); }

    $query = "";
    switch($_GET['queryType']){
        case "Location":
            $query = "CALL Get_Match_Locations_From('". $_GET['queryData']."');";
            echo json_encode(QueryMatchByLocation($dbc, $query));
            break;
        case "Date":
            $query = "CALL Get_Round_Results_From('". $_GET['queryData']."');";
            QueryRoundResultsFromDate($dbc, $query);
            break;
        case "Series":
            $query = "CALL Get_Series_Results_From('". $_GET['queryData']."');";
            QuerySeriesResultsSet($dbc, $query);
            break;
    }
}
// Get locations for select box
function GetLocations($dbc){
    $query = "CALL Get_Locations()";
    $result = $dbc->query($query);
    if($result){
        $locationsArray = array();
        while ($row = $result->fetch_array()){
            $locationsArray[$row['round_locations_ID']] = $row['round_locations_name'];
        }
        mysqli_free_result($result);
        $dbc->close();
        return $locationsArray;
    } else {
        echo json_encode("Locations Setup Error");
        return null;
    }
}

//Update Round Location
function UpdateLocation($dbc){
    if(!isset($_POST['targetRound']) || (empty($_POST['targetRound']))){die("No target round set");}
    if(!isset($_POST['targetLocation'])){die("No new location set");}

    $query = "Call Update_Location_Of_Round('".$_POST['targetRound']."','".$_POST['targetLocation']."');";
    if($dbc->query($query) === TRUE) {
        // Record was updated
        json_encode("Record Updated");
    } else {
        json_encode("Error Updating Record");
    }
    $dbc->close();
}

// Get Handler
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    switch ($_GET['requestType']){
        case "getLocations":
            echo json_encode(GetLocations($dbc));
            break;
        case "genericQuery":
            echo json_encode(GenericQuery($dbc));
            break;
        case "secondLevel":
            SecondLevelQuery($dbc);
            break;
    }
}

// Post Handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($_POST['requestType']){
        case "updateLocation":
            echo json_encode(UpdateLocation($dbc));
            break;
    }
}
