$(document).ready(function () {
    'use strict';
    var DATABASE_FUNCTIONS = "http://68.1.204.10:1001/handlers/databaseFunctions.php";

    // Giant array of all active shooters
    var ShooterListGlobal;
    // Var for Selected Gun Model
    var SelectedGunModel;
    // Var for Selected shooter
    var SelectedShooter;

    // Add Shooter Cached selectors
    var addShooterFirstName = $('#shooterFirstName');
    var addShooterLastName = $('#shooterLastName');
    var addShooterEmail = $('#shooterEmail');

    var confirmFirstName = $('#confirmFirstName');
    var confirmLastName = $('#confirmLastName');
    var confirmEmail = $('#confirmEmail');
    var confirmDivision = $('#confirmDivision');

    var $gunModelSelect = $('#gunModelSelect');
    var $shooterSelect = $('#shooterListSelect');

    var infoCenter = $('#info-center');
    var scoreTable = $('#scoreTableDiv');
    var optionsDiv = $('#optionsDiv');

    // Target One
    var TargetOneX = $('#t1x');
    var TargetOneTen = $('#t1ten');
    var TargetOneEight = $('#t1eight');
    var TargetOneFive = $('#t1five');
    var TargetOneMisses = $('#t1Misses');

    var TargetOneTotalHitsMisses = $('#sumonetotalhitsmisses');
    var targetOneRow = $('#targetOneRow');
    var TargetOneTotalShots = 0;
    var TargetOneTotalMisses;

    var targetOneNumOne;
    var targetOneNumTwo;
    var targetOneNumThree;
    var targetOneNumFour;

    // Target Two
    var TargetTwoX = $('#t2x');
    var TargetTwoTen = $('#t2ten');
    var TargetTwoEight = $('#t2eight');
    var TargetTwoFive = $('#t2five');
    var TargetTwoMisses = $('#t2Misses');

    var TargetTwoTotalHitsMisses = $('#sumtwototalhitsmisses');
    var targetTwoRow = $('#targetTwoRow');
    var TargetTwoTotalShots = 0;
    var TargetTwoTotalMisses;

    var targetTwoNumOne;
    var targetTwoNumTwo;
    var targetTwoNumThree;
    var targetTwoNumFour;

    // Sum columns
    var SumXRow = $('#sumx');
    var SumTenRow = $('#sumten');
    var SumEightRow = $('#sumeight');
    var SumFiveRow = $('#sumfive');
    var SumMissesRow = $('#summisses');
    var SumTotalRow = $('#sumtotal');

    // Total Columns
    var TotalScoreX = $('#xScore');
    var TotalScoreTen = $('#xTen');
    var TotalScoreEight = $('#xEight');
    var TotalScoreFive = $('#xFive');
    var TotalScore = $('#finalScore')
    var TotalPenalty = $('#penaltyInput');
    

    var sumX;
    var sumTen;
    var sumEight;
    var sumFive;
    var sumMisses;

    var finalScoreX;
    var finalScoreTen;
    var finalScoreEight;
    var finalScoreFive;
    var finalScoreTotal;
    var penalties;

    // Should Validate SCores
    var sVal = false;

    /////////////////////////////////////////////////
    // Drawing Section
    // Variables for referencing the canvas and 2dcanvas context
    var canvas, ctx;
    // Variables to keep track of the mouse position and left-button status 
    var mouseX, mouseY, mouseDown = 0;
    // Variables to keep track of the touch position
    var touchX, touchY;
    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawDot(ctx, x, y, size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        var r = 0; var g = 0; var b = 0; var a = 255;

        // Select a fill style
        ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown(e) {
        e.preventDefault();
        mouseDown = 1;
        drawDot(ctx, mouseX, mouseY, 6);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown = 0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) {
        e.preventDefault();
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown == 1) {
            drawDot(ctx, mouseX, mouseY, 6);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
    }

    // Draw something when a touch start is detected
    function sketchpad_touchStart(e) {
        e.preventDefault();
        // Update the touch co-ordinates
        getTouchPos();

        drawDot(ctx, touchX, touchY, 6);

    
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) {
        e.preventDefault();
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawDot(ctx, touchX, touchY, 6);

     
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                var rect = canvas.getBoundingClientRect();
               touchX = touch.pageX - touch.target.offsetLeft - rect.left;
               touchY = touch.pageY - rect.top;                
            }
        }
    }


    // Set-up the canvas and add our event handlers after the page has loaded
    function DrawInit() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('sketchpad');

        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }
    }

    ////////////////////////////////////////////////////



    /////////////////////////////////////////////////
    // Validation Functions
    /////////////////////////////////////////////////

    function ScoreLogic() {
        // Don't validate if nothing is score table is hidden
        if (sVal === false) {
            return;
        }
        var RulesSet = $('input[name=gunTypesRadios]:checked').val();       
        var ErrorState = false;

        // Target One        
        targetOneNumOne = (!isNaN(parseInt(TargetOneX.val())) ? parseInt(TargetOneX.val()) : 0);
        targetOneNumTwo = (!isNaN(parseInt(TargetOneTen.val())) ? parseInt(TargetOneTen.val()) : 0);
        targetOneNumThree = (!isNaN(parseInt(TargetOneEight.val())) ? parseInt(TargetOneEight.val()) : 0);
        targetOneNumFour = (!isNaN(parseInt(TargetOneFive.val())) ? parseInt(TargetOneFive.val()) : 0);
        // Target Two       
        targetTwoNumOne = (!isNaN(parseInt(TargetTwoX.val())) ? parseInt(TargetTwoX.val()) : 0);
        targetTwoNumTwo = (!isNaN(parseInt(TargetTwoTen.val())) ? parseInt(TargetTwoTen.val()) : 0);
        targetTwoNumThree = (!isNaN(parseInt(TargetTwoEight.val())) ? parseInt(TargetTwoEight.val()) : 0);
        targetTwoNumFour = (!isNaN(parseInt(TargetTwoFive.val())) ? parseInt(TargetTwoFive.val()) : 0);
        // Penalties
        penalties = (!isNaN(parseInt(TotalPenalty.val())) ? parseInt(TotalPenalty.val()) : 0);

        // Ruleset = 1 Stock, 2 Unlimited, 3 Pocket
        var TargetOneMaxShots = ((RulesSet == 1) || (RulesSet == 2)) ? 20 : 10;
        var TargetTwoMaxShots = ((RulesSet == 1) || (RulesSet == 2)) ? 30 : 15;

        // Total Number of shots by row
        TargetOneTotalShots = targetOneNumOne + targetOneNumTwo + targetOneNumThree + targetOneNumFour;
        TargetTwoTotalShots = targetTwoNumOne + targetTwoNumTwo + targetTwoNumThree + targetTwoNumFour;

        // Calc how many misses by row
        TargetOneTotalMisses = TargetOneMaxShots - TargetOneTotalShots;
        TargetTwoTotalMisses = TargetTwoMaxShots - TargetTwoTotalShots;

        // Sum Var
        sumX = targetOneNumOne + targetTwoNumOne;
        sumTen = targetOneNumTwo + targetTwoNumTwo
        sumEight = targetOneNumThree + targetTwoNumThree;
        sumFive = targetOneNumFour + targetTwoNumFour;
        sumMisses = TargetOneMisses + TargetTwoMisses;

        // Misses
        TargetOneMisses.html(TargetOneTotalMisses);
        TargetTwoMisses.html(TargetTwoTotalMisses);

        // Row end for Misses
        TargetOneTotalHitsMisses.html('<span class="text-success">' + TargetOneTotalShots + '</span> | <span class="text-danger">' + TargetOneTotalMisses + '</span>');
        TargetTwoTotalHitsMisses.html('<span class="text-success">' + TargetTwoTotalShots + '</span> | <span class="text-danger">' + TargetTwoTotalMisses + '</span>');

        // The "Shots" row
        SumXRow.html(sumX);
        SumTenRow.html(sumTen);
        SumEightRow.html(sumEight);
        SumFiveRow.html(sumFive);

        penalties = penalties * 10;

        // Calc final scores
        finalScoreX = sumX * 10;
        finalScoreTen = sumTen * 10;
        finalScoreEight = sumEight * 8;
        finalScoreFive = sumFive * 5;
        finalScoreTotal = (finalScoreX + finalScoreTen + finalScoreEight + finalScoreFive) - penalties;

        // The Total Score row
        TotalScoreX.html(finalScoreX);
        TotalScoreTen.html(finalScoreTen);
        TotalScoreEight.html(finalScoreEight);
        TotalScoreFive.html(finalScoreFive);
        TotalScore.html(finalScoreTotal);

        if (ValidateShotCount(TargetOneMaxShots, TargetOneTotalShots)) {
            // Target 1 is good
            targetOneRow.removeClass("bg-danger text-dark");
        } else { // Target 1 is NOT good
            targetOneRow.addClass("bg-danger text-dark")
            $('#previewScore').prop("disabled", true);
        }

        if (ValidateShotCount(TargetTwoMaxShots, TargetTwoTotalShots)) {
            // Target 2 is good
            targetTwoRow.removeClass("bg-danger text-dark");
            $('#previewScore').prop("disabled", false);
        } else { // Target 2 is NOT good
            targetTwoRow.addClass("bg-danger text-dark");
            $('#previewScore').prop("disabled", true);
        }
    }

    function ValidateShotCount(first, second) {
        return (first >= second) ? true : false;
    }

    function ValidateAddShooter() {
        var isErrorState = false;

        if (addShooterFirstName.val().trim().length < 2) {
            addShooterFirstName.addClass("is-invalid").removeClass("is-valid");
            isErrorState = true;
        } else {
            addShooterFirstName.addClass("is-valid").removeClass("is-invalid");
        }
        if (addShooterLastName.val().trim().length < 2) {
            addShooterLastName.addClass("is-invalid").removeClass("is-valid");
            isErrorState = true;
        } else {
            addShooterLastName.addClass("is-valid").removeClass("is-invalid");
        }
        if ((addShooterEmail.val().trim().length < 2) || (addShooterEmail.val().trim().indexOf('@') === -1)) {
            addShooterEmail.addClass("is-invalid").removeClass("is-valid");
            isErrorState = true;
        } else {
            addShooterEmail.addClass("is-valid").removeClass("is-invalid");
        }

        return (isErrorState ? true : false);
    }

    // This is broken right now
    function ValidateGetShooterData() {

        // Select the gun model global for validation
        SelectedGunModel = $gunModelSelect.prop('value');

        // The gun model isn't actually important.
        if (SelectedGunModel < 1){
            console.log("Gun model Undefiend");
            return;
        }

        if (SelectedShooter < 1) {
            console.log("Shooter Undefined");
            return;
        }

        AsyncGetShooterData(SelectedShooter);
    }

    function HandleShootCheck(result) {
        switch (result) {
            case "-2":
                infoCenter.html('<p class="text-danger">Something terrible has happened</p>');
                break;
            case "-1":
                infoCenter.html('');
                break;
            case "1":
                // Add in the view previous entry here
                infoCenter.html('<div class="alert alert-warning alert-dismissible fade show" role="alert">Shooter has records for this date already.<button type ="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button ></div >');
                break;
        }
    }

    // Check if the selected person has shot on this date
    function CheckForShoot() {
        var selectedShooter = $shooterSelect.prop('value');
        if (selectedShooter > 0) {
            var shootDate = $('#shootDate').val();
            AsyncCheckForPreviousShoot(selectedShooter, shootDate);
        }
    }

    // Check to see if we should show score table
    function ScoreTableToggler() {
        if (($gunModelSelect.val() > -1) && ($shooterSelect.val() > -1)) {
            scoreTable.show();
            optionsDiv.show();
            sVal = true;
        } else {
            scoreTable.hide();
            optionsDiv.hide();
            sVal = false;
        }
    }

    // If this is a pocket gun we will enable the radio and check it
    function GunTypesSwitcher() {
        if (($gunModelSelect.val() == 24) || ($gunModelSelect.val() == 25)) {
            $("input[name=gunTypesRadios][value='3']").prop("checked", true);
            $("input[name=gunTypesRadios][value='2']").prop("disabled", true);
            $("input[name=gunTypesRadios][value='1']").prop("disabled", true);           
        } else {
            $("input[name=gunTypesRadios][value='3']").prop("checked", false);
            $("input[name=gunTypesRadios][value='1']").prop("checked", true);
            $("input[name=gunTypesRadios][value='2']").prop("disabled", false);
            $("input[name=gunTypesRadios][value='1']").prop("disabled", false);           
        }
        ScoreLogic();
    }

    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    // Page Loading Functions
    // Function to Populate Divisions Radio buttons on Add Shooter Modal
    function PopulateDivisions(data) {
        var divisions = jQuery.parseJSON(data);

        $.each(divisions, function (key, value) {
            $('#shooterDivisions').append('<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="divisionTypesRadios" id="division' + key + '" value = "' + key + '" ><label class="form-check-label" for="division' + key + '">' + value + '</label></div >');
            $('#division5').prop("checked", true);
        });
    }
    // Reset the AddShooter Modal to all default values
    function CleanAddShooter() {
        // Clear inputs
        addShooterFirstName.val('');
        addShooterLastName.val('');
        addShooterEmail.val('');
        // Set Default Check Option
        $('#division5').prop("checked", true);
        // Remove any old validation
        addShooterFirstName.removeClass("is-valid is-invalid");
        addShooterLastName.removeClass("is-valid is-invalid");
        addShooterEmail.removeClass("is-valid is-invalid");
        // Reset add button
        $('#saveShooterBtn').removeClass("btn-success").addClass("btn-danger").prop("disabled", true);
        $('#previewSaveBtn').removeClass("btn-success").addClass("btn-danger").prop("disabled", true);
    }
    // Create the dropdown of active shooters
    function CreateShooterList(shooterArray) {
        $('#shooterListSelect').empty();// Empty the select box because we are dynamically adding to it
        $('<option>').val('-1').text('Select Shooter').appendTo("#shooterListSelect"); // Add in a default -1 value of select shooter
       
        ShooterListGlobal = jQuery.parseJSON(shooterArray);
        $.each(ShooterListGlobal, function (shooter) {
            $('<option>').val(ShooterListGlobal[shooter].shooterID).text(ShooterListGlobal[shooter].shooterFirstName + ' ' + ShooterListGlobal[shooter].shooterLastName).appendTo("#shooterListSelect");
        });

        $('#shooterListSelect').val('-1');
    }
    // Create the dropdown for gun models
    function CreateGunModelsList(gunModelsArray) {
        $gunModelSelect.empty();
        $('<option>').val('-1').text('Select Model').appendTo($gunModelSelect);

        var gunList = jQuery.parseJSON(gunModelsArray); // Parse our json results
        
        $.each(gunList, function (key, value) {
            $('<option>').val(key).text(value).appendTo($gunModelSelect);
        });
    }
    // Create the radios for gun types
    function CreateGunTypeRadios(gunTypes) {
        var gunTypes = jQuery.parseJSON(gunTypes);
        $.each(gunTypes, function (key, value) {
            var newString = '<div class="form-check form-check-inline"><input class="form-check-input form-control-lg gunType" type="radio" name="gunTypesRadios" id="gunTypes' + key + '" value="' + key + '"';
            if (key == 3) {
                newString += ' disabled '; // Disable pocket
            }
            newString += '> <label class="form-check-label" for="gunTypes' + key + '">' + value + '</label></div > ';

            $('#gunTypes').append(newString);                
        });
    }

    // End Page Loading Functions
    //////////////////////////////////////////////////


    //////////////////////////////////////////////////
    // Async Functions
    //////////////////////////////////////////////////
    // Final entry submit
    function AsyncFinalEntry() {
        // Get our signature
        var dataURL = canvas.toDataURL();

        var targetOneNumOne = 0, targetOneNumTwo = 0, targetOneNumThree = 0, targetOneNumFour = 0;
        var targetTwoNumOne = 0, targetTwoNumTwo = 0, targetTwoNumThree = 0, targetTwoNumFour = 0;

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

        var shooterID = ShooterListGlobal[$('#shooterListSelect').val()].shooterID;
        var shootDate = $('#shootDate').val();
        var gunModel = $('#gunModelSelect').val();
        var gunType = $('input[name=gunTypesRadios]:checked').val();

        $.ajax({
            type: "POST",
            url: DATABASE_FUNCTIONS,
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
                "gunType": gunType,                
                "signature": dataURL,
                "requestType": "addNewEntry"
        
            },
            success: function (data) {

            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {               
            location.reload();
         });


    }




    // Get Divisions out of the DB
    function AsyncGetDivisions() {
        $.ajax({
            type: "GET",
            url: DATABASE_FUNCTIONS,
            cache: false,
            data: { "requestType": "divisions" },
            success: function (data) {
                console.log("Divisions Retrieved Ok");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            PopulateDivisions(data);
            // Enable button now because we have the divisions
            $('#addShooterBtn').removeClass('btn-danger').addClass('btn-dark').prop("disabled", false);
        });
    }
    // Add a new shooter to the database
    function AsyncAddNewShooter(firstName, lastName, email, division) {
        $.ajax({
            type: "POST",
            url: DATABASE_FUNCTIONS,
            cache: false,
            data: {
                "requestType": "addNewShooter",
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "division": division
            },
            success: function (data) {

            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            AsyncGetActiveShooters();                      
            // Hide the confirmation page            
            $('#confirmAddModal').modal('toggle');
        });
    }
    // Get list of active shooters
    function AsyncGetActiveShooters() {
        $.ajax({
            type: 'GET',
            url: DATABASE_FUNCTIONS,
            cache: false,
            data: { "requestType": "activeShooters" },
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
    // Get list of gun Models
    function AsyncGetGunModels() {
        $.ajax({
            type: "GET",
            url: DATABASE_FUNCTIONS,
            cache: false,
            data: { "requestType": "gunModels" },
            success: function (data) {
                console.log("Gun Model List Get Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            CreateGunModelsList(data);
        });
    }
    // Get the Gun Types (Pocket, Stock, Unlimited)
    function AsyncGetGunTypes() {
        $.ajax({
            type: "GET",
            url: DATABASE_FUNCTIONS,
            cache: false,
            data: { "requestType": "gunTypes" },
            success: function (data) {
                console.log("Gun Type List Get Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            CreateGunTypeRadios(data);
        });
    }

    // I dunno
    function AsyncGetShooterData(shooter_ID) {
        console.log("Getting gun data doot doot doot");
    }
     // Check to see if the shooter has shot today
    function AsyncCheckForPreviousShoot(shooter_ID, shootDate) {       
        $.ajax({
            type: 'GET',
            url: DATABASE_FUNCTIONS,
            cache: false,
            data: { "requestType": "shootCheck", "shooterID": shooter_ID, "shootDate": shootDate},
            success: function (data) {
                console.log("Shooter Date Check Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            HandleShootCheck(data);
        });
    }

    // End Async Functions
    //////////////////////////////////////////////////

    //////////////////////////////////////////////////
    // ON CHANGE HANDLERS
    //////////////////////////////////////////////////
    // Handle First Name Change on Add Shooter Modal
    $('#shooterFirstName, #shooterLastName, #shooterEmail').on('input', function (e) {
        var isError = ValidateAddShooter();
        if (isError) {
            $('#previewSaveBtn').removeClass("btn-success").addClass("btn-danger").prop("disabled", true);
        } else {
            $('#previewSaveBtn').removeClass("btn-danger").addClass("btn-success").prop("disabled", false);
        }
    });

    // The Shooter is selected from a drop down
    $("#shooterListSelect").on('change', function (e, shooterList) {
        e.preventDefault();
        // Display the shooters division on drop down change
        if (ShooterListGlobal[$(this).prop('value')]){ // Check for undefined
            if (ShooterListGlobal[$(this).prop('value')].shooterID > -1) { // Check if a valid selection
                $('#shooterDivision').val(ShooterListGlobal[$(this).prop('value')].shooterDivision);
            }
        }
        // See if shooter has shot on this day
        CheckForShoot();      
        // Check to see if we need to show the gun score table
        ScoreTableToggler();
    });

    // Date is changed
    $('#shootDate').on('change', function (e) {
        // See if shooter has shot on this day
        CheckForShoot();     
    });

    // Gun Model is selected from a drop down
    $gunModelSelect.on('change', function (e) {       
        ValidateGetShooterData();      
        ScoreTableToggler();
        GunTypesSwitcher();       
    });

    // TARGET SCORE CHANGES
    $('.targetOne, .targetTwo').on('input', function () {        
        ScoreLogic();
    });

    // Preview save is show
    $('#previewAddRecordModal').on('shown.bs.modal', function (e) {
        // We can add in more validation here if we need to,
        // if not refactor into terniary 
        // Target 1
        if (targetOneNumOne > -1) {
            $('#t1XPreview').html(targetOneNumOne);
        }
        if (targetOneNumTwo > -1) {
            $('#t1TenPreview').html(targetOneNumTwo);
        }
        if (targetOneNumThree > -1) {
            $('#t1EightPreview').html(targetOneNumThree);
        }
        if (targetOneNumFour > -1) {
            $('#t1FivePreview').html(targetOneNumFour);
        }
        // Misses
        if (TargetOneTotalMisses) {
            $('#t1MissesPreview').html(TargetOneTotalMisses);
        }

        if (TargetOneTotalShots) {
            $('#t1TotalHitsMisses').html('<span class="text-success">' + TargetOneTotalShots + '</span> | <span class="text-danger">' + TargetOneTotalMisses + '</span>');
        }

        // Target 2
        if (targetTwoNumOne > -1) {
            $('#t2XPreview').html(targetTwoNumOne);
        }
        if (targetTwoNumTwo > -1) {
            $('#t2TenPreview').html(targetTwoNumTwo);
        }
        if (targetTwoNumThree > -1) {
            $('#t2EightPreview').html(targetTwoNumThree);
        }
        if (targetTwoNumFour > -1) {
            $('#t2FivePreview').html(targetTwoNumFour);
        }
        // Misses
        if (TargetTwoTotalMisses) {
            $('#t2MissesPreview').html(TargetTwoTotalMisses);
        }
        // Total hits/ misses
        if (TargetTwoTotalShots) {
            $('#t2TotalHitsMisses').html('<span class="text-success">' + TargetTwoTotalShots + '</span> | <span class="text-danger">' + TargetTwoTotalMisses + '</span>');
        }


        // Sums and final scores
        if (sumX > -1) {
            $('#totalXHitsPreview').html(sumX);
            $('#totalXScorePreview').html(finalScoreX);
        }
        if (sumTen > -1) {
            $('#totalTenHitsPreview').html(sumTen);
            $('#totalTenScorePreview').html(finalScoreTen);
        }
        if (sumEight > -1) {
            $('#totalEightHitsPreview').html(sumEight);
            $('#totalEightScorePreview').html(finalScoreEight);
        }
        if (sumFive > -1) {
            $('#totalFiveHitsPreview').html(sumFive);
            $('#totalFiveScorePreview').html(finalScoreFive);
        }

    


        $('#previewFinalScore').html(finalScoreTotal);
        $('#totalPenaltiesPreview').html(penalties);


    })

    //////////////////////////////////////////////////

    //////////////////////////////////////////////////
    // Button Handlers
    //////////////////////////////////////////////////

    //////////////////////////////////////////////////
    // Preview score modal handlers
    // Preview Score button click
    $('#previewScore').on('click', function (e) {
        e.preventDefault();
        $('#previewAddRecordModal').modal("toggle");
    });
    // preview Score Modal Cancel button
    $('#cancelPreviewScoreBtn').on('click', function (e) {
        e.preventDefault();
        $('#previewAddRecordModal').modal("toggle");
    });
    // Preview save button
    $('#savePreviewScoreBtn').on('click', function (e) {
        e.preventDefault();
        $('#previewAddRecordModal').modal("toggle");

        AsyncFinalEntry();
    });
    ///////////////////////////////////////////////////



    // Add Shooter Button
    $('#addShooterBtn').on('click', function (e) {
        e.preventDefault();
        CleanAddShooter();
        $('#addShooterModal').modal('toggle');
        addShooterFirstName.focus();
    });

    // Preview the attempted add shooter
    $('#previewSaveBtn').on('click', function (e) {
        e.preventDefault();

        confirmFirstName.val(addShooterFirstName.val().trim());
        confirmLastName.val(addShooterLastName.val().trim());
        confirmEmail.val(addShooterEmail.val().trim());
        confirmDivision.val($('input[name=divisionTypesRadios]:checked + label').text());

        $('#saveShooterBtn').removeClass("btn-danger").addClass("btn-success").prop("disabled", false);
        $('#addShooterModal').modal('toggle');
        $('#confirmAddModal').modal('toggle');
    });

    // Modify Button was clicked, just swap modals
    $('#modifyShooterBtn').on('click', function (e) {
        e.preventDefault();
        $('#addShooterModal').modal('toggle');
        $('#confirmAddModal').modal('toggle');
    });

    // Add Shooter Save button
    $('#saveShooterBtn').on('click', function (e) {
        e.preventDefault();
        var firstName = addShooterFirstName.val().trim();
        var lastName = addShooterLastName.val().trim();
        var email = addShooterEmail.val().trim();
        var division = $('input[name=divisionTypesRadios]:checked').val();
        AsyncAddNewShooter(firstName, lastName, email, division);
    });

    $('#clearbutton').on('click', function (e) {
        e.preventDefault();
        clearCanvas(canvas, ctx);
    });

    //End button Handlers
    //////////////////////////////////////////////////


    //////////////////////////////////////////////////
    // SHOOT DATE TIME STUFF
    //////////////////////////////////////////////////
    // Correct Time Zone implementation
    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });
    // Use function to set the date picker to current day
    $('#shootDate').val(new Date().toDateInputValue());
    /////////////////////////////////////////////////

    //////////////////////////////////////////////////
    // PageInit
    //////////////////////////////////////////////////
    function PageInit() {
        scoreTable.hide();
        optionsDiv.hide();
        DrawInit();
    }
    //////////////////////////////////////////////////



    ///////////////////////////////////////////////////
    // Page Loading commands
    //////////////////////////////////////////////////
    AsyncGetDivisions();
    AsyncGetActiveShooters();
    AsyncGetGunModels();
    AsyncGetGunTypes();
    PageInit();

});