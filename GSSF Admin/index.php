<?php include ('./includes/admin_header.php'); 
	  include './includes/navbar.php';
?>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 centerContent"><h2>Admin Utilities</h2></div>
            <div class="col-sm-6 centerContent"><h2>Reporting</h2></div>
        </div>
        <div class="row">
            <div class="col-sm-6 centerContent">
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button type="button" id="shooterListBtn" class="btn btn-danger">Shooters List</button>
                    <button type="button" id="gunClassBtn" class="btn btn-danger">Gun Class</button>
                    <button type="button" id="gunModelBtn" class="btn btn-danger">Gun Models</button>
                    <button type="button" id="shooterDivisionBtn" class="btn btn-danger">Divisions</button>
                   <!-- End Dropdown -->
                </div>
                <!-- End btn-group-->
            </div>
            <!-- End Col-sm-6-->
            <div class="col-sm-6 centerContent">
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button type="button" id="allResultsDataBtn" class="btn btn-primary">All Results Data</button>
                    <button type="button" id="resultsByLocation" class="btn btn-primary">Location</button>
                    <button type="button" id="resultsByMatch" class="btn btn-primary">Match</button>
                    <button type="button" id="resultsBySeries" class="btn btn-primary">Series</button>
                </div>
            </div>
            <!-- End Col-sm-6-->
        </div>
        <!-- End Row -->
        <br />
        <div id="largeResultData" class="row justify-content-center">
            <div class="col-sm-12">
                </div>
            </div>

                <div id="allShooterData" class="row justify-content-center">
                    <div class="col-sm-12">
                        <table id="allDataTable" class="table table-bordered">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Gun Model</th>
                                    <th scope="col">Gun Class</th>
                                    <th scope="col">Shooter Division</th>
                                    <th scope="col">Shoot Date</th>
                                    <th scope="col">Target One X</th>
                                    <th scope="col">Target One Ten</th>
                                    <th scope="col">Target One Eight</th>
                                    <th scope="col">Target One Five</th>
                                    <th scope="col">Target Two X</th>
                                    <th scope="col">Target Two Ten</th>
                                    <th scope="col">Target Two Eight</th>
                                    <th scope="col">Target Two Five</th>
                                </tr>
                            </thead>
                            <tbody id="resultArea"></tbody>
                        </table>
                    </div>
                </div>

                <!-- Left Column-->
                <div class="row">
                    <div class="col-sm-6">
                        <div id="adminColumn">

                        </div>
                    </div>

                    <!-- Right Column-->
                    <div class="col-sm-6">
                        <div id="asyncData">
                        </div>
                    </div>
                </div><?php include('./includes/admin_footer.php');
