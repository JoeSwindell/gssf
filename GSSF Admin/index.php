<?php include ('./includes/admin_header.php'); ?>
    <div id="pageTitleDiv" class="row justify-content-center">
        <div class="col-sm-12">
            <h1>SafeSide&reg; GSSF Admin</h1>
        </div>
    </div>

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

              <!-- <div class="btn-group" role="group">
                <button id="nameReportBtn" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Shooters
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a class="dropdown-item" href="#">Sho</a>
                  <a class="dropdown-item" href="#">Dropdown link</a>
                </div>
              </div>-->

              <!-- End Dropdown -->
            </div>
            <!-- End btn-group-->
        </div>
        <!-- End Col-sm-6-->
        <div class="col-sm-6 centerContent">
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="button" id="allResultsDataBtn" class="btn btn-primary">All Results Data</button>
                <button type="button" id="resultsBySeries" class="btn btn-primary">Resulst By Series</button>
                <button type="button" id="resultsByShooter" class="btn btn-primary">Resulst By Shooter</button>
            </div>           
        </div>
       <!-- End Col-sm-6-->
    </div>
     <!-- End Row -->
     <br />
     <?php include('./includes/alldatatable.php'); ?>


  


<?php include('./includes/admin_footer.php');