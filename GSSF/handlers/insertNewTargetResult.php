<?php
    require('../includes/config.inc.php');


    function InsertNewTargetResult($dbc,
                            $tOneX,
                            $tOneTen,
                            $tOneEight,
                            $tOneFive,
                            $tTwoX,
                            $tTwoTen,
                            $tTwoEight,
                            $tTwoFive,
                            $shootDate,
                            $shooterID,
                            $gunModel,
                            $gunType,
                            $ip){
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
                .mysqli_real_escape_string($dbc, $gunType).'",);';
         if ($dbc->query($query) != TRUE){
          echo $query;
          return false;
        }
             return true;
        }


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



    InsertNewTargetResult($dbc,
                            $tOneX,
                            $tOneTen,
                            $tOneEight,
                            $tOneFive,
                            $tTwoX,
                            $tTwoTen,
                            $tTwoEight,
                            $tTwoFive,
                            $shootDate,
                            $shooterID,
                            $gunModel,
                            $gunType. $ip);





















?>