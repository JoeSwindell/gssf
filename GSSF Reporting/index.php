<?php include './includes/header.php';
      include './includes/navbar.php';?>
<div class="container-fluid">

    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
            <h2>Reporting</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
            <div class="btn-group" role="group">
                <button type="button" id="resultsByLocation" class="btn btn-primary">Rounds By Location</button>
                <button type="button" id="resultsByDate" class="btn btn-primary">By Date</button>
                <button type="button" id="resultsBySeries" class="btn btn-primary">By Series</button>
            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>
    <!-- End Row -->
    <!-- Notification area-->
    <div class="row">
        <div class="col">
            <div id="notificationArea"></div>
        </div>
    </div>
    <!-- END NOTIFICATION AREA-->
    <!-- Location Results Area-->
    <div class="row">
        <div id="locationResultsContainer">
            <div class="col">
                <h3>Locations</h3>
                <div id="locationResults"></div>
            </div>
        </div>
        <div id="locationRightCol"></div>
    </div>

    <!-- Date Results Area-->
    <div class="row">
        <div id="dateResultsContainer">
            <div class="col">
                <h3>Dates</h3>
                <div id="dateResults"></div>
            </div>
        </div>
        <div id="dateRightCol"></div>
    </div>

    <!-- Series Results Area-->
    <div class="row">
        <div id="seriesResultsContainer">
            <div class="col">
                <h3>Series By Start Date</h3>
                <div id="seriesResults"></div>
            </div>
        </div>
        <div id="seriesRightCol"></div>
    </div>


</div><!-- /.container -->

<?php 
include './modals/LocationChangeModal.php';
include './modals/DateChangeModal.php';
include './modals/GunChangeModal.php';
include './modals/DivisionChangeModal.php';
include './modals/FirstNameChangeModal.php';
include './modals/LastNameChangeModal.php';
include './includes/footer.php';?>