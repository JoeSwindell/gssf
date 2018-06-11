$(document).ready(function () {
    'use strict';
    var ASYNC_URL = "http://68.1.204.9:1002/handlers/databaseFunctions.php";
    
    var NotificationArea = $('#notifications');
    // Table garbage selectors
    var ResultArea = $("#resultArea");
    var ResultSetGlobal;

    var LargeResultArea = $('#largeResultArea');

    var AdminResultColumn = $('#adminColumn');

    var asyncData = $('#asyncData');
    var currentQueryDate;
    var currentQueryLocation;
    var currentMatchName;

    // Hide some stuff
    var asyncAllData = $('#allShooterData').hide();

    ////////////////////////////////////////////////////////////
    // DISPLAY FUNCTIONS
    // Format ALL results request
    function FormatResults(data) {
        ResultSetGlobal = jQuery.parseJSON(data);

        for (var i = 0; i < ResultSetGlobal.length; i++) {
            ResultArea.append("<tr>");
            // General Shooter Info
            ResultArea.append('<td><a href="#" class="shooterInfo" data-shooterid="' + ResultSetGlobal[i].shooterID + '">' + ResultSetGlobal[i].shooterFirst + '</a></td>');
            ResultArea.append('<td><a href="#" class="shooterInfo" data-shooterid="' + ResultSetGlobal[i].shooterID + '">' + ResultSetGlobal[i].shooterLast + '</a></td>');
            ResultArea.append('<td><a href="#" class="shooterInfo" data-shooterid="' + ResultSetGlobal[i].shooterID + '">' + ResultSetGlobal[i].gunName + '</a></td>');
            ResultArea.append('<td><a href="#" class="shooterInfo" data-shooterid="' + ResultSetGlobal[i].shooterID + '">' + ResultSetGlobal[i].gunType + '</a></td>');
            ResultArea.append('<td><a href="#" class="shooterInfo" data-shooterid="' + ResultSetGlobal[i].shooterID + '">' + ResultSetGlobal[i].divisionName + '</a></td>');
            ResultArea.append('<td><a href="#" class="shooterInfo" data-shootdate="' + ResultSetGlobal[i].roundDate + '">' + ResultSetGlobal[i].roundDate + '</a></td>');

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

    // Display Locations
    function FormatLocations(data) {
        var locations = $.parseJSON(data);
        asyncData.html("");
        $.each(locations, function (key, value) {                
            asyncData.append('<button type="button" data-location="'+locations[key].id+'" class="btn btn-primary locationBtn">' + locations[key].name + '</button> &nbsp;');
                        
        });
       
    }

    // Single Date with all shots
    function FormatSingleDate(data) {
        var dates = $.parseJSON(data);
        asyncData.html('');
        var tableBuilder = '<table id="singleDateShootTable" class="table table-bordered"><thead class="thead-dark"><tr><th scope ="col">Round ID</th><th scope ="col">Target ID</th><th scope ="col">Shooter ID</th><th scope ="col">Division ID</th><th scope ="col">Gun Type</th><th scope ="col">Gun ID</th><th scope ="col">Round Group</th><th scope="col">Round Location</th></tr ></thead ><tbody>';
        $.each(dates, function (key, value) {
            tableBuilder += '<tr><td>' + dates[key].roundID + '</td>';
            tableBuilder += '<td>' + dates[key].targetID + '</td>';
            tableBuilder += '<td>' + dates[key].shooterID + '</td>';
            tableBuilder += '<td>' + dates[key].divisionID + '</td>';
            tableBuilder += '<td>' + dates[key].gunType + '</td>';
            tableBuilder += '<td>' + dates[key].gunID + '</td>';
            tableBuilder += '<td>' + dates[key].roundGroup + '</td>';
            tableBuilder += '<td>' + dates[key].roundLocation + '</td></tr>';           
        });

        tableBuilder += '</tbody>';
        asyncData.append(tableBuilder);
    }

    // Match Button Format
    function FormatRoundDates(data) {
        var dates = $.parseJSON(data);
        var rowItem;
        asyncData.html('');
        rowItem = '<ul class="list-group">';
        $.each(dates, function (key, value) {
            var listGroupColor = "list-group-item-";
            if (dates[key].roundCount > 5) {
                listGroupColor += "success";
            } else {
                listGroupColor += "warning";
            }
            rowItem += ('<li data-matchdate="' +
                dates[key].roundDate +
                '" class="list-group-item d-flex justify-content-between align-items-center dateListGroupItem ' +
                listGroupColor + '">' +
                dates[key].roundDate +
                 '<span class="badge badge-primary badge-pill"> '+ dates[key].roundCount + '</span></li>');            
        });
        rowItem += '</ul>';
        asyncData.append(rowItem);
    }

    // Display Locations by Shoot Date
    function FormatLocationsByDate(data){
        var locations = $.parseJSON(data);
        var rowItem;
        asyncData.html('');
        rowItem = '<ul class="list-group">';
        $.each(locations, function (key, value) {
            rowItem += '<li class="list-group-item d-flex justify-content-between align-items-center locationsByDateLi" data-locationindex="'+key+'">' + value + '</li>';
        })
        rowItem += '</ul>';
        asyncData.append(rowItem);
    }

    // Display Match Types For a Specific location and date
    function FormatMatchTypesByLocationAndDate(data) {
        var locations = $.parseJSON(data);
        var rowItem;
        asyncData.html('');
        rowItem = '<ul class="list-group">';
        $.each(locations, function (key, value) {
            rowItem += '<li class="list-group-item d-flex justify-content-between align-items-center matchTypeByLD" data-matchname="'+value+'" data-matchindex="' + key + '">' + value + '</li>';
        });
        rowItem += '</ul>';
        asyncData.append(rowItem);
    }

    // Final Results 
    function FormatFinalResults(data) {
        var result = $.parseJSON(data);
        var rowBuilder = '';
        asyncData.html('');

        rowBuilder += '<h3>'+currentMatchName+'</h3>'
        rowBuilder += '<table class="table table-bordered"><thead class="thead-dark"><tr><th scope="col">Rank</th><th scope="col">Name</th><th scope="col">Division</th><th scope="col">Gun</th><th scope="col">Total X\'s</th><th scope="col">Total Score</th></tr></thead>';
        rowBuilder +=  '<tbody>';
        var rank = 1;
        $.each(result, function (key, value) {
            rowBuilder += '<tr>';
            rowBuilder += '<td>' + rank + '</td>';
            rowBuilder += '<td>' + result[key].shooterName + '</td>';
            rowBuilder += '<td>' + result[key].divisionName + '</td>';
            rowBuilder += '<td>' + result[key].gunName + '</td>';
            rowBuilder += '<td>' + result[key].totalX + '</td>';
            rowBuilder += '<td>' + result[key].totalScore + '</td>';
            rowBuilder += '</tr>';
            rank++;
        });

        rowBuilder += '</tbody></table>';

        asyncData.append(rowBuilder);
    }

    // Admin util show all active shooters
    function FormatAllActiveShooters(data) {
        var result = $.parseJSON(data);
        var rowBuilder = '';
        rowBuilder += '<h3>Active People</h3>'
        rowBuilder += '<table id="allShooterList" class="table table-bordered"><thead class="thead-dark"><tr><th scope="col">First</th><th scope="col">Last</th><th scope="col">Email</th><th scope="col">Division</th></tr></thead > ';
        rowBuilder += '<tbody>';
        $.each(result, function (key, value) {
            rowBuilder += '<tr>';
            rowBuilder += '<td>' + result[key].shooterFirst + '</td>';
            rowBuilder += '<td>' + result[key].shooterLast + '</td>';
            rowBuilder += '<td>' + result[key].email + '</td>';
            rowBuilder += '<td>' + result[key].divisionName + '</td>';            
            rowBuilder += '</tr>';
        });

        rowBuilder += '</tbody></table>';
        AdminResultColumn.html(rowBuilder);
    }

    function FormatSeries(data) {
        var series = $.parseJSON(data);
        var rowBuilder = '';
        rowBuilder += '<h3>Group Series</h3>'
        rowBuilder += '<table id="SeriesTable" class="table table-bordered"><thead class="thead-dark"><tr><th scope="col">One</th><th scope="col">Two</th><th scope="col">Three</th><th scope="col">Four</th><th scope="col">Five</th><th scope="col">Six</th></tr></thead > ';
        rowBuilder += '<tbody>';
        $.each(series, function (key, value) {
            rowBuilder += '<tr>';            
            rowBuilder += '<td>' + series[key].dateOne + '</td>';
            rowBuilder += '<td>' + series[key].dateTwo + '</td>';
            if (series[key].dateThree != null) { rowBuilder += '<td>' + series[key].dateThree + '</td>';}
            if (series[key].dateFour != null) { rowBuilder += '<td>' + series[key].dateFour + '</td>'; }
            if (series[key].dateFive != null) { rowBuilder += '<td>' + series[key].dateFive + '</td>'; }
            if (series[key].dateSix != null) { rowBuilder += '<td>' + series[key].dateSix + '</td>'; }

            rowBuilder += '</tr>';
        });

        rowBuilder += '</tbody></table>';
        LargeResultArea.append(rowBuilder);
    }
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////
    // ASYNC FUNCTIONS
    // Get ALL shoot data this will turn into a huge result set...
    function AsyncGetAllShootData() {
        NotificationArea.html('Please wait...');        
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: {"requestType" : "allData"},
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

    // Get ALL locations
    function AsyncGetAllLocations() {
        NotificationArea.html('Please wait...');      
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType" : "locations" },
            success: function (data) {
                console.log("Location Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {           
            FormatLocations(data);
        });
    }

    // Get all dates that have data
    function AsyncGetShootDates() {
        NotificationArea.html('Please wait...');        
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType": "roundDates" },
            success: function (data) {
                console.log("Round Dates Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            FormatRoundDates(data);
        });
    }

    // Get all results for this date at this location
    function AsyncQueryDateForMatches(dateToQuery) {
        NotificationArea.html('Please wait...');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType": "singleDate", "singleDate": dateToQuery },
            success: function (data) {
                console.log("Single Dates Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            FormatSingleDate(data);
        });
    }

    // Get locations that have matches on this date
    function AsyncQueryLocationsForDate(dateToQuery) {
        NotificationArea.html('Please wait...');
        currentQueryDate = dateToQuery;
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType": "locationsByDate", "singleDate": dateToQuery },
            success: function (data) {
                console.log("Single Dates Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {            
            FormatLocationsByDate(data);
        });
    }

    // Get All Match Types for location by date
    function AsyncQueryMatchesByLocationAndDate(locationID) {
        NotificationArea.html('Please wait...');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType": "matchesByLocationAndDate", "singleDate": currentQueryDate, "location": locationID },
            success: function (data) {
                console.log("Matches by Locations and Dates Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            FormatMatchTypesByLocationAndDate(data);        
        });
    }

    // Get the Actual shooters for a match by Location->date->type
    function AsyncQueryShootersByDateByLocationByType(matchType) {
        NotificationArea.html('Please wait...');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: {
                "requestType": "matchesByLocationAndDateAndType",
                "singleDate": currentQueryDate,
                "location": currentQueryLocation,
                "matchType" : matchType
            },
            success: function (data) {
                console.log("Matches by Locations and Dates and Type Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            FormatFinalResults(data);
        });
    }

    // Get all the active shooters
    function AsyncGetAllActiveShooters() {
        NotificationArea.html('Please wait...');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,       
            data: {
                "requestType": "allActiveShooters"       
            },
            success: function (data) {
                console.log("All Active Shooters Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            FormatAllActiveShooters(data);
        });
    }

    // Get all the series
    function AsyncGetAllSeries() {
        NotificationArea.html('Please wait...');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: {
                "requestType": "allSeries"
            },
            success: function (data) {
                console.log("All Series Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            FormatSeries(data);
        });
    }
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    // ON CLICK HANDLERS
    // This will be our logic to capture button presses so we don't 
    // have 10,000 button event listeners
    $("button").on('click', function (e) {
        switch ($(this).attr('id')) {
            // ADMIN BUTTONS
            case "shooterListBtn":
                AsyncGetAllActiveShooters();
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
                asyncData.hide();
                AsyncGetAllShootData();
                break;
            case "resultsByLocation":
                asyncAllData.hide();
                asyncData.show();
                AsyncGetAllLocations();
                break;
            case "resultsByMatch":      
                asyncData.show();
                asyncAllData.hide();
                AsyncGetShootDates();
                break;
            case "resultsBySeries":
                AsyncGetAllSeries();
                asyncAllData.hide();
                break;
        }        
    });

    // Location result link clicked
    $("body").on('click', '.locationBtn', function (e) {
        console.log($(this).data('location'));
    });

    // When a Match Date is clicked on
    $("body").on('click', '.dateListGroupItem', function (e) {
        var dateToQuery = $(this).data("matchdate");
       // AsyncQueryDateForMatches(dateToQuery);
        AsyncQueryLocationsForDate(dateToQuery);
    });

    // When a Match By Date is LI is clicked
    $("body").on('click', '.locationsByDateLi', function (e) {
        var locationID = $(this).data("locationindex");      
        currentQueryLocation = locationID;
        AsyncQueryMatchesByLocationAndDate(locationID);
    });

    // Match By Date ->location -> Class is clicked, 
    $("body").on('click', '.matchTypeByLD', function (e) {
        var matchIndex = $(this).data("matchindex");
        currentMatchName = $(this).data("matchname");
        AsyncQueryShootersByDateByLocationByType(matchIndex);
    });
    











    // First or Last Name Clicked
    $("body").on('click', '.shooterInfo', function (e) {
        // Retrieve info based on this id
        console.log($(this).data('shooterid'));
    });

    // Gun model Clicked
    $("body").on('click', '.shooterInfo', function (e) {
        // Retrieve info based on this id
        console.log($(this).data('shooterid'));
    });

});