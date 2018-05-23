$(document).ready(function () {
    'use strict';
    // Cached Selectors
    // Target One Variables
    var TargetOneX = $('#t1x');
    var TargetOneTen = $('#t1ten');
    var TargetOneEight = $('#t1eight');
    var TargetOneFive = $('#t1five');
    // Target Two Variables
    var TargetTwoX = $('#t2x');
    var TargetTwoTen = $('#t2ten');
    var TargetTwoEight = $('#t2eight');
    var TargetTwoFive = $('#t2five');
    // Sum variables
    var SumX = $('#sumx');
    var SumTen = $('#sumten');
    var SumEight = $('#sumeight');
    var SumFive = $('#sumfive');
    var SumTotal = $('#sumtotal');
    var SumMisses = $('#summisses');
    // Calculated points variables
    var XScore = $('#xScore');
    var TenScore = $('#xTen');
    var EightScore = $('#xEight');
    var FiveScore = $('#xFive');
    var PenaltyScore = $('#noPenalty');
    var FinalScore = $('#finalScore');

    // Sum of target 1 and 2
    var SumOneTotalHits = $('#sumonetotalhitsmisses');
    var SumTwoTotalHits = $('#sumtwototalhitsmisses');

    var ShooterListGlobal;

    //HTML Presentational Functions
    // Models of glocks
    function CreateGunList(gunArray) {
        var gunList = jQuery.parseJSON(gunArray); // Parse our json results
        $('#gunModelSelect').empty();

        $.each(gunList, function (key, value) {
            $('<option>').val(key).text(value).appendTo("#gunModelSelect");
        });
    }
    // Users in Database
    function CreateShooterList(shooterArray) {  
        $('#shooterListSelect').empty(); // Empty the select box because we are dynamically adding to it        
        var shooterList = jQuery.parseJSON(shooterArray); // Parse our json results
        ShooterListGlobal = jQuery.parseJSON(shooterArray);

        for (var i = 0; i < shooterList.length; i++) {       
            $('<option>').val(i).text(shooterList[i].shooterName).appendTo("#shooterListSelect");
        }
        //$.each(shooterList, function (key, value) {
        //    $('<option>').val(key).text(value).appendTo("#shooterListSelect");
        //});
        // Select value 15 as default this is a hack
        $('#shooterListSelect').val('0');
        $('#shooterDivision').html(shooterList[1].shooterDivision);         
    }
    //Woman, Senior, Junior, etc
    function CreateDivisions(divisionsArray) {
        var divisionsList = jQuery.parseJSON(divisionsArray);
        $.each(divisionsList, function (key, value) {
            $('#shooterDivisions').append('<div class="form-check form-check-inline"><input class= "form-check-input division" type="radio" name="divisionTypesRadios" id="division' + key + '" value = "' + key + '" ><label class="form-check-label" for="division' + key +'">' + value + '</label></div >');
        });
    }
    //Stock, Unlimited, Pocket
    function CreateGunTypesList(gunTypesArray) {
        var gunTypes = jQuery.parseJSON(gunTypesArray);
        $.each(gunTypes, function (key, value) {
            $('#gunTypes').append('<div class="form-check form-check-inline"><input class="form-check-input form-control-lg gunType" type="radio" name="gunTypesRadios" id="gunTypes' + key + '" value="' + key + '" ><label class="form-check-label" for="gunTypes' + key + '">' + value + '</label></div>');
        });
    }

    function PrepFinalScoreSheet() {
        // Refactor this garbage        
        var targetOneNumOne = 0, targetOneNumTwo = 0, targetOneNumThree = 0, targetOneNumFour = 0;
        var targetTwoNumOne = 0, targetTwoNumTwo = 0, targetTwoNumThree = 0, targetTwoNumFour = 0;
        var shooterID = ShooterListGlobal[$('#shooterListSelect').val()].shooterID;
        var shootDate = $('#shootDate').val();
        var gunModel = $('#gunModelSelect').val();     
        var gunType = $('input[name=gunTypesRadios]:checked').val();
        
        //first target
        if (!isNaN(parseInt(TargetOneX.val()))) {
            targetOneNumOne = parseInt(TargetOneX.val());
        }
        if (!isNaN(parseInt(TargetOneTen.val()))) {
            targetOneNumTwo = parseInt(TargetOneTen.val());
        }
        if (!isNaN(parseInt(TargetOneEight.val()))) {
            targetOneNumThree = parseInt(TargetOneEight.val());
        }
        if (!isNaN(parseInt(TargetOneFive.val()))) {
            targetOneNumFour = parseInt(TargetOneFive.val());
        }

        // second target
        if (!isNaN(parseInt(TargetTwoX.val()))) {
            targetTwoNumOne = parseInt(TargetTwoX.val());
        }
        if (!isNaN(parseInt(TargetTwoTen.val()))) {
            targetTwoNumTwo = parseInt(TargetTwoTen.val());
        }
        if (!isNaN(parseInt(TargetTwoEight.val()))) {
            targetTwoNumThree = parseInt(TargetTwoEight.val());
        }
        if (!isNaN(parseInt(TargetTwoFive.val()))) {
            targetTwoNumFour = parseInt(TargetTwoFive.val());
        }

        AsyncAddNewTargetScore(targetOneNumOne, targetOneNumTwo, targetOneNumThree, targetOneNumFour, targetTwoNumOne, targetTwoNumTwo, targetTwoNumThree, targetTwoNumFour, shootDate, shooterID, gunModel, gunType);
    }


    // AJAX FUNCTIONS
    function AsyncAddNewTargetScore(targetOneNumOne, targetOneNumTwo, targetOneNumThree, targetOneNumFour, targetTwoNumOne, targetTwoNumTwo, targetTwoNumThree, targetTwoNumFour, shootDate, shooterID, gunModel, gunType) {
        var url = "http://192.168.1.3:1000/handlers/insertNewTargetResult.php";
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            data: {
                "targetOneNumOne": targetOneNumOne,
                "targetOneNumTwo": targetOneNumTwo,
                "targetOneNumThree": targetOneNumThree,
                "targetOneNumFour": targetOneNumFour,
                "targetTwoNumOne": targetTwoNumOne,
                "targetTwoNumTwo": targetTwoNumTwo,
                "targetTwoNumThree": targetTwoNumThree,
                "targetTwoNumFour": targetTwoNumFour,
                "shootDate": shootDate,
                "shooterID": shooterID,
                "gunModel": gunModel,
                "gunType": gunType
            },
            success: function (data) {
                console.log(data);
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            location.reload();
        });
    }

    function AsyncAddNewShooter(shooterType, firstName, lastName) {
        var url = "http://192.168.1.3:1000/handlers/insertNewShooter.php";
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            data: { "shooterType": shooterType, "firstName": firstName, "lastName": lastName },
            success: function (data) {
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            $('#shooterFirstName').val("");
            $('#shooterLastName').val("");
            AsyncGetShooterList();
            $('#myModal').modal('toggle');
        });
    }

    function AsyncGetGunList() {
        var url = "http://192.168.1.3:1000/handlers/getGunList.php";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log("Gun List Get Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            CreateGunList(data);
        });
    }

    function AsyncGetShooterList() {       
        var url = "http://192.168.1.3:1000/handlers/getShooterList.php";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log("Shooter List Get Success");                
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
           CreateShooterList(data);  
        });
    }

    function AsyncGetDivisionList() {
        var url = "http://192.168.1.3:1000/handlers/getDivisions.php";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log("Division List Get Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            CreateDivisions(data);
        });
    }

    function AsyncGetGunTypes() {
        var url = "http://192.168.1.3:1000/handlers/getGunTypes.php";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log("Gun Type List Get Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            CreateGunTypesList(data);
        });
    }
    //////////////////////

    function CalculateSums() {
        // Refactor this garbage
        var targetOneSum, targetTwoSum;
        var targetOneNumOne = 0, targetOneNumTwo = 0, targetOneNumThree = 0, targetOneNumFour = 0;
        var targetTwoNumOne = 0, targetTwoNumTwo = 0, targetTwoNumThree = 0, targetTwoNumFour = 0;
        var totalOne = 0, totalTwo = 0, totalThree = 0, totalFour = 0;
        var totalFinalScore = 0, calculatedFinalScore = 0;

        //first target
        if (!isNaN(parseInt(TargetOneX.val()))) {
            targetOneNumOne = parseInt(TargetOneX.val());
        }

        if (!isNaN(parseInt(TargetOneTen.val()))){
            targetOneNumTwo = parseInt(TargetOneTen.val());
        }

        if (!isNaN(parseInt(TargetOneEight.val()))) {
            targetOneNumThree = parseInt(TargetOneEight.val());
        }

        if (!isNaN(parseInt(TargetOneFive.val()))) {
            targetOneNumFour = parseInt(TargetOneFive.val());
        }

        // second target

        if (!isNaN(parseInt(TargetTwoX.val()))) {
            targetTwoNumOne = parseInt(TargetTwoX.val());
        }

        if (!isNaN(parseInt(TargetTwoTen.val()))) {
            targetTwoNumTwo = parseInt(TargetTwoTen.val());
        }

        if (!isNaN(parseInt(TargetTwoEight.val()))) {
            targetTwoNumThree = parseInt(TargetTwoEight.val());
        }

        if (!isNaN(parseInt(TargetTwoFive.val()))) {
            targetTwoNumFour = parseInt(TargetTwoFive.val());
        }
        ////
        targetOneSum = targetOneNumOne + targetOneNumTwo + targetOneNumThree + targetOneNumFour;   
        targetTwoSum = targetTwoNumOne + targetTwoNumTwo + targetTwoNumThree + targetTwoNumFour;

        // Final Scores
        totalOne = targetOneNumOne + targetTwoNumOne;
        totalTwo = targetOneNumTwo + targetTwoNumTwo;
        totalThree = targetOneNumThree + targetTwoNumThree;
        totalFour = targetOneNumFour + targetTwoNumFour;
        totalFinalScore = totalOne + totalTwo + totalThree + totalFour;
        calculatedFinalScore = ((totalOne * 10) + (totalTwo * 10) + (totalThree * 8) + (totalFour * 5));

        SumX.html(totalOne);
        SumTen.html(totalTwo);
        SumEight.html(totalThree);
        SumFive.html(totalFour);
        SumMisses.html('');
        SumTotal.html(totalFinalScore.toString());


        XScore.html(totalOne*10);
        TenScore.html(totalTwo*10);
        EightScore.html(totalThree*8);
        FiveScore.html(totalFour * 5);
        
        PenaltyScore.html();
        FinalScore.html(calculatedFinalScore);
        

        SumOneTotalHits.html(targetOneSum.toString());
        SumTwoTotalHits.html(targetTwoSum.toString());
    }

    // Correct Time Zone implementation
    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });
    // Use function to set the date picker to current day
    $('#shootDate').val(new Date().toDateInputValue());

    // On score input do calcs
    $('.targetOne').on('input', function () {
        CalculateSums();
    });

    $('.targetTwo').on('input', function () {
        CalculateSums();
    });
    /////
    //Dyanmic content selector
    $("body").on('change', '.division', function () {
        // This is for debugging purpose only
        console.log($(this).val());
    });

    $("body").on('change', '.gunType', function () {
        console.log($(this).val());
    });
    
    $("#gunModelSelect").on('change', function (e) {
        e.preventDefault();
        console.log($(this).prop('value'));
    });

    $("#shooterListSelect").on('change', function (e, shooterList) {
        e.preventDefault();
        $('#shooterDivision').html(ShooterListGlobal[$(this).prop('value')].shooterDivision);        
    });

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus');
    })

    $('#addShooterBtn').on('click', function (e) {
        e.preventDefault();
        $('#myModal').modal('toggle');
    });

    $('#saveShooterBtn').on('click', function (e) {
        e.preventDefault();
        var firstName = $('#shooterFirstName').val().trim();
        var lastName = $('#shooterLastName').val().trim();
        var shooterDivision = $('input[name=divisionTypesRadios]:checked').val();
         
        if (firstName.length > 2 && lastName.length > 2) {
            AsyncAddNewShooter(shooterDivision, firstName, lastName);
        } else {
            // Do some kind of error warning
        }
        
    });

    // Submit the scores
    $('#submitScore').on('click', function (e) {
        e.preventDefault();
        PrepFinalScoreSheet();
    });

    AsyncGetShooterList();
    AsyncGetGunList();
    AsyncGetDivisionList();
    AsyncGetGunTypes();
    

    console.log("Page Loaded");
});