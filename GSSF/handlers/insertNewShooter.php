<?php
    require('../includes/config.inc.php');

    $firsrName = null;
    $lastName = null;
    $shooterType = null;

    if (isset($_POST['firstName'])){
        $firstName = $_POST['firstName'];
    } else {
        exit();
    }

    if (isset($_POST['lastName'])){
        $lastName = $_POST['lastName'];
    } else {
        exit();
    }

    if (isset($_POST['shooterType'])){
        $shooterType = $_POST['shooterType'];
    } else {
        exit();
    }
   

    function InsertNewShooter($dbc, $shooterType, $firstName, $lastName){
        $query= 'CALL Insert_new_shooter("'
                .mysqli_real_escape_string($dbc, $shooterType).'","'
                .mysqli_real_escape_string($dbc, $firstName).'","'
                .mysqli_real_escape_string($dbc, $lastName).'");';
      
        if ($dbc->query($query) != TRUE){
            echo $query;
            return false;
        }
             return true;    
    }



    InsertNewShooter($dbc, $shooterType, $firstName, $lastName);

?>