<div id="previewAddRecordModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Confirm Score to Add</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <?php include 'includes/previewScore.php';?>
            </div> <!-- End modal body-->

            <div class="modal-footer">
                <button id="savePreviewScoreBtn" type="button" class="btn btn-success">Submit</button>
                <button id="cancelPreviewScoreBtn" type="button" class="btn btn-warning">Cancel</button>
                <button id="clearbutton" type="button" class="btn btn-warning">Clear Signature</button>
            </div>



        </div><!-- End Modal-Content-->
    </div>
</div>