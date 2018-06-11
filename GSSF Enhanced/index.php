<?php
include 'includes/header.php';
include 'includes/addShooterModal.php';
include 'includes/confirmAddModal.php';
include 'includes/previewScoreEntry.php';
?>
<div class="container">
    <div id="mainContent">
        <div class="row">
            <!-- Left Nav area -->
            <div class="col-3">

                <form>
                    <div class="form-group">
                        <button type="button" id="addShooterBtn" class="btn btn-danger" disabled>Add shooter</button>
                    </div>

                </form>

            </div><!-- End Left area -->

            <!-- Right Content area -->
            <div class="col-sm">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Division</th>
                            <th scope="col">Date</th>
                            <th scope="col">Model</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <select class="form-control" id="shooterListSelect"></select>
                                </div>
                            </td>
                            <td>
                                <input class="form-control" id="shooterDivision" disabled />
                            </td>
                            <td>
                                <input class="form-control" id="shootDate" type="date" />
                            </td>
                            <td>
                                <select class="form-control" id="gunModelSelect"></select>
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div><!-- End Right Content Area -->
        </div><!-- End row -->

        <div class="row justify-content-end">
            <?php include 'includes/options.php';?>
        </div>

        <div class="row">
            <div class="col">
                <div id="info-center"></div>
                <?php include('includes/scoretable.php'); ?>
            </div>
        </div>

    </div><!-- End Main Content area -->
</div><!-- End Container -->


<?php include 'includes/footer.php'?>