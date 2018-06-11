$(document).ready(function () {
    'use strict';
    var ASYNC_URL = "http://68.1.204.9:1001/handlers/databaseFunctions.php";

    // Cached Selectors
    var $locationResultsContainer = $('#locationResultsContainer');
    var $dateResultsContainer = $('#dateResultsContainer');
    var $seriesResultsContainer = $('#seriesResultsContainer');
    var $locationResults = $('#locationResults');
    var $locationResultsData = $('#locationRightCol');
    var $dateResults = $('#dateResults');
    var $dateResultsData = $('#dateResultsRightCol');
    var $seriesResults = $('#seriesResults');
    var $seriesResultsData = $('#seriesResultsRightCol');
    var $notificationArea = $('#notificationArea');
    ////////////////

    var targetedRound = null;

    // Which result area to show
    function ResultToggle(whichToDisplay) {
        switch (whichToDisplay) {
            case "Location":
                $locationResultsContainer.show();
                $dateResultsContainer.hide();
                $seriesResultsContainer.hide();
                break;
            case "Series":
                $seriesResultsContainer.show();
                $locationResultsContainer.hide();
                $dateResultsContainer.hide();

                break;
            case "Date":
                $dateResultsContainer.show();
                $locationResultsContainer.hide();
                $seriesResultsContainer.hide();
                break;
        }
    }

    ///////////////////////////////////////////////////////////////
    // Format functions
    // Locations for modals
    function InsertLocations(data) {
        var location = $.parseJSON(data);
        $('#locationModelSelect').empty();
        $.each(location, function (key, value) {
            $('<option>').val(key).text(value).appendTo('#locationModelSelect');
        });
    }
    // This is our first response
    function DisplayGenericAsyncResult(data, rd) {        
        $notificationArea.hide();
        switch (rd) {
            case "Location":
                DisplayResult(data, $locationResults, rd);               
                break;
            case "Series":
                DisplayResult(data, $seriesResults, rd);
                break;
            case "Date":                
                DisplayResult(data, $dateResults, rd);
                break;
        }

        // The jSON Data, the js var for the html element, the element toggle switcher name
        function DisplayResult(data, element, rd) {
            var $parsedData = $.parseJSON(data);            
            element.html('');
            $.each($parsedData, function (key, value) {
                element.append('<button type="button" data-resulttype="'+rd+'" data-queryattr="'+key+'" class="btn btn-outline-primary">' + value + '</button><br/> ');
            });   
            ResultToggle(rd);
        }
    }
    // Second Level Response 
    function DisplaySecondLevelResults(data, queryType) {
        switch (queryType) {
            case "Location":
                DisplaySecondLevelLocation(data);
                break;
            case "Date":
                DisplaySecondLevelDate(data);
                break;
            case "Series":
                DisplaySecondLevelSeries(data);
                break;
        }

        // Display the second level queries
        function DisplaySecondLevelLocation(data) {
            $notificationArea.hide();
            var $parsedData = $.parseJSON(data);      
            var rowBuilder = '';
            rowBuilder+='<table id="secondLevelLocationTable" class="table table-bordered text-center"><thead class="thead-dark">\
                <th scope="col">Date</th>\
                <th>Location</th>\
                <th>Gun</th>\
                <th>Gun Type</th>\
                <th>Division</th>\
                <th>First Name</th>\
                <th>Last Name</th>\
                </tr></thead><tbody>';
            $.each($parsedData, function (key, value) {
                rowBuilder += '<tr data-roundid="' + $parsedData[key].roundID + '">\
                    <td><a href="#" class="slItem" data-sltype="date">'+$parsedData[key].roundDate+'</a></td>\
                    <td><a href="#" class="slItem" data-sltype="location">'+$parsedData[key].roundLocationsName+'</a></td>\
                    <td>' + $parsedData[key].gunType + '</td>\
                    <td><a href="#" class="slItem" data-sltype="guntype" data-gunid="'+$parsedData[key].gunID+'">'+$parsedData[key].gunName+'</a></td>\
                    <td><a href="#" class="slItem" data-sltype="division" data-divisionid="'+$parsedData[key].shooterDivisionID+'">'+$parsedData[key].divisionName+'</a></td>\
                    <td><a href="#" class="slItem" data-sltype="firstname">'+$parsedData[key].shooterFirstName+'</a></td>\
                    <td><a href="#" class="slItem" data-sltype="lastname">'+$parsedData[key].shooterLastName+'</a></td>';
            });   
            rowBuilder += '</tbody></table>';
            $locationResultsData.html(rowBuilder);
            return;
        }

        function DisplaySecondLevelDate(data) {
            $notificationArea.hide();
            return;
        }

        function DisplaySecondLevelSeries(data) {
            $notificationArea.hide();
            return;
        }
    }
    ///////////////////////////////////////////////////////////////

     ///////////////////////////////////////////////////////////////
    // Async Functions
    // Handle the initial Generic Ajax Query
    function AsyncGenericGetQuery(requestData) {
        $notificationArea.html('<h3>Please wait...</h3>');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType": "genericQuery", "requestData" : requestData },
            success: function (data) {
                console.log("Generic Query Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            DisplayGenericAsyncResult(data, requestData);            
        });
    }
    // Handle the second level Ajax
    function AsyncGetSecondLevelResults(queryData, queryType) {
        $notificationArea.html('<h3>Please wait...</h3>');
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: {
                "requestType": "secondLevel",
                "queryData": queryData,
                "queryType": queryType
            },
            success: function (data) {
                console.log("Second Level Query Success");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            DisplaySecondLevelResults(data, queryType);
        });
    }
    // Grab the locations for modal
    function AsyncGetLocations() {
        $.ajax({
            type: "GET",
            url: ASYNC_URL,
            cache: false,
            data: { "requestType": "getLocations"},
            success: function (data) {
                console.log("Locations Loaded");
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            InsertLocations(data);
        });
    }
    // Change the location
    function AsyncChangeLocation(newLocation) {
        $.ajax({
            type: "POST",
            url: ASYNC_URL,
            cache: false,
            data: {
                "requestType": "updateLocation",
                "targetRound": targetedRound,
                "targetLocation": newLocation,
            },
            success: function (data) {
                
            },
            error: function (response) {
                console.log(response);
            }
        }).done(function (data) {
            AsyncGetSecondLevelResults(newLocation, "Location");
        });
    }

    ///////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////
    // Button Handlers
    // Handle the top layer of 3 button clicks
    $('#resultsByLocation, #resultsByDate,#resultsBySeries ').click(function () {
        var id;
        switch (this.id) {
            case "resultsByLocation":
                id = 'Location'; break;
            case "resultsByDate":
                id = 'Date'; break;
            case "resultsBySeries":
                id = "Series"; break;          
        }        
        AsyncGenericGetQuery(id);
    });

    // Handlers For Result Data
    // Location Handler
    $("body").on('click', '#locationResults button, #dateResults button,  #seriesResults button', function (e) {
        e.preventDefault();
        var queryData = $(this).data('queryattr');
        var queryType = $(this).data('resulttype');
        AsyncGetSecondLevelResults(queryData, queryType);        
    });
     ///////////////////////////////////////////////////////////////


    // Handler for second level table stuff
    $("body").on('click', '.slItem', function (e) {
        targetedRound = $(this).closest('tr').data('roundid');
        switch ($(this).data('sltype')) {
            case "location":
                $('#LocationChangeModal').modal('toggle');
                break;
            case "date":
                $('#DateChangeModal').modal('toggle');
                break;
            case "guntype":
                $('#GunChangeModal').modal('toggle');
                break;
            case "division":
                $('#DivisionChangeModal').modal('toggle');
                break;
            case "firstname":
                $('#FirstNameChangeModal').modal('toggle');
                break;
            case "lastname":
                $('#LastNameChangeModal').modal('toggle');
                break;
            default:
                console.log($(this).data('sltype'));
                break;
        }
    });

     ///////////////////////////////////////////////////////////////
    // MODAL DIALOGUE HANDLERS
    // Location Save button clicked
    $('#saveLocationBtn').on('click', function (e) {
        var newLocation = $('#locationModelSelect').val();
        AsyncChangeLocation(newLocation);
        $('#confirmLocationChangeModal').modal('toggle');
    });


    // Modal Diaglogue cancel buttons
    // Location Cancel button clicked
    $('#cancelLocationBtn').on('click', function (e) {
        $('#LocationChangeModal').modal('toggle');
        targetedRound = null;
    });
    
    $('#cancelDateBtn').on('click', function (e) {
        $('#DateChangeModal').modal('toggle');      
        targetedRound = null;
    });

    $('#cancelGunBtn').on('click', function (e) {
        $('#GunChangeModal').modal('toggle');
        targetedRound = null;
    });

    $('#cancelDivisionBtn').on('click', function (e) {
        $('#DivisionChangeModal').modal('toggle');
        targetedRound = null;
    });

    $('#cancelFirstNameBtn').on('click', function (e) {
        $('#FirstNameChangeModal').modal('toggle');
        targetedRound = null;
    });

    $('#cancelLastNameBtn').on('click', function (e) {
        $('#LastNameChangeModal').modal('toggle');
        targetedRound = null;
    });
     ///////////////////////////////////////////////////////////////


    function init() {
        AsyncGetLocations();
    }

    init();
    console.log("Reporting page loaded");
});