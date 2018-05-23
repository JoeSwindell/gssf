<div id="myModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add a new shooter</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input id="shooterFirstName" class="form-control" type="text" placeholder="First Name">
                <input id="shooterLastName" class="form-control" type="text" placeholder="Last Name">
                <div class="card">
                    <div class="card-body">
                        <div id="shooterDivisions"></div>
                     </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="saveShooterBtn" type="button" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>