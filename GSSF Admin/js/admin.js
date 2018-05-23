$(document).ready(function () {
    'use strict';
    var ASYNC_URL = "http://192.168.1.3:1002";


     var NotificationArea = $('#notifications');
    // Table garbage selectors
    var ResultArea = $("#resultArea");
    var ResultSetGlobal;

    // Hide some stuff
    $('#allShooterData').hide();

    // Format ALL results request
    function FormatResults(data) {
        console.log("FormatResults Function start");
        ResultSetGlobal = jQuery.parseJSON(data);
        console.log(data);

        for (var i = 0; i < ResultSetGlobal.length; i++) {
            ResultArea.append("<tr>");
            // General Shooter Info
            ResultArea.append("<td>" + ResultSetGlobal[i].shooterFirst + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].shooterLast + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].gunName + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].gunType + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].divisionName + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].roundDate + "</td>");

            // Target One
            ResultArea.append("<td>" + ResultSetGlobal[i].targetOneX + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].targetOneTen + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].targetOneEight + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].targetOneFive + "</td>");

            ResultArea.append("<td>" + ResultSetGlobal[i].targetTwoX + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].targetTwoTen + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].targetTwoEight + "</td>");
            ResultArea.append("<td>" + ResultSetGlobal[i].targetTwoFive + "</td>");

            ResultArea.append("</tr>");
        }       
    }

    // Get ALL shoot data this will turn into a huge result set...
    function AsyncGetAllShootData() {
        NotificationArea.html('Pleas wait');
        var url = ASYNC_URL + "/handlers/getAllShooterData.php";
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log("Gun All Data Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            $('#allShooterData').show();
            FormatResults(data);
        });
    }

    // This will be our logic to capture button presses so we don't 
    // have 10,000 button event listeners
    $("button").on('click', function (e) {
        switch ($(this).attr('id')) {
            // ADMIN BUTTONS
            case "shooterListBtn":
                console.log("The shooter list button was pressed");
                break;
            case "gunClassBtn":
                console.log("The gun class button was pressed");
                break;
            case "gunModelBtn":
                console.log("The gun model button was pressed");
                break;
            case "shooterDivisionBtn":
                console.log("The shooter division button was pressed");
                break;

                // REPORTING BUTTONS
            case "allResultsDataBtn":
                AsyncGetAllShootData();
                break;
        }        
    });
});