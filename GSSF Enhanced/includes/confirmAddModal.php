<div id="confirmAddModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Confirm shooter to Add</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <form class="needs-validation">
                    <div class="form-group">
                        <input id="confirmFirstName" class="form-control" type="text" disabled>
                    </div>
                    <div class="form-group">
                        <input id="confirmLastName" class="form-control" type="text" disabled>
                    </div>
                    <div class="form-group">
                        <input id="confirmEmail" class="form-control" type="text" disabled>
                    </div>
                    <div class="form-group">
                         <input id="confirmDivision" class="form-control" type="text" disabled />
                    </div>
          
                </form>
            </div> <!-- End modal body-->

            <div class="modal-footer">
                <button id="saveShooterBtn" type="button" class="btn btn-success">Save Changes</button>
                <button id="modifyShooterBtn" type="button" class="btn btn-warning">Modify</button>
            </div>



        </div><!-- End Modal-Content-->
    </div>
</div>