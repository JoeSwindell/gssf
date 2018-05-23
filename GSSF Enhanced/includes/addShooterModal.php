<div id="addShooterModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        
            <div class="modal-header">
                <h5 class="modal-title">Add a new shooter to the database</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <form class="needs-validation">
                    <div class="form-group">
                        <input id="shooterFirstName" class="form-control" type="text" placeholder="First Name">
                    </div>
                    <div class="form-group">
                        <input id="shooterLastName" class="form-control" type="text" placeholder="Last Name">
                    </div>
                    <div class="form-group">
                        <input id="shooterEmail" class="form-control" type="text" placeholder="Email Address">
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div id="shooterDivisions"></div>
                        </div>
                    </div>
                </form>
            </div> <!-- End modal body-->

            <div class="modal-footer">
                <button id="previewSaveBtn" type="button" class="btn btn-danger" disabled>Preview Changes</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
            </div>



        </div><!-- End Modal-Content-->
    </div>
</div>