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
                <div class="previewScoreArea">
                    <div class="row">
                        <div class="col">
                            <ul class="list-group">
                                <li class="list-group-item list-group-item-primary">Target 1</li>
                                <!-- X Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    X Hits
                                    <span id="t1XHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <!-- Ten Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Ten Hits
                                    <span id="t1TenHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <!-- Eight Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Eight Hits
                                    <span id="t1EightHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <!-- Five Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Five Hits
                                    <span id="t1FiveHits" class="badge badge-info badge-pill"></span>
                                </li>
                            </ul>
                        </div> <!-- End Left col-->
                        <div class="col">
                            <ul class="list-group">
                                <li class="list-group-item list-group-item-primary">Target 2</li>
                                <!-- X Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    X Hits
                                    <span id="t2XHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <!-- Ten Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Ten Hits
                                    <span id="t2TenHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <!-- Eight Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Eight Hits
                                    <span id="t2EightHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <!-- Five Hits -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Five Hits
                                    <span id="t2FiveHits" class="badge badge-info badge-pill"></span>
                                </li>
                            </ul>
                        </div><!-- End second col-->
                    </div> <!-- end Row-->
                <br/>
                    <div class="row">
                        <div class="col">
                            <ul class="list-group">
                                <li class="list-group-item list-group-item-primary">Totals</li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total X Hits
                                    <span id="totalXHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Ten Hits
                                    <span id="totalTenHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Eight Hits
                                    <span id="totalEightHits" class="badge badge-info badge-pill"></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Five Hits
                                    <span id="totalFiveHits" class="badge badge-info badge-pill"></span>
                                </li>
                            </ul> <!-- End List-->
                        </div><!-- End col -->
                        <!-- Final SCores-->
                        <div class="col">
                            <ul class="list-group">
                                <li class="list-group-item list-group-item-primary">Total Points</li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total X
                                    <span id="totalXScore" class="badge badge-info badge-pill"></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Ten
                                    <span id="totalTenScore" class="badge badge-info badge-pill"></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Eight
                                    <span id="totalEightScore" class="badge badge-info badge-pill"></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Five
                                    <span id="totalFiveScore" class="badge badge-info badge-pill"></span>
                                </li>
                            </ul> <!-- End List-->
                        </div><!-- End col -->
                    </div><!-- End Row-->
                <br/>
                <div class="row">
                    <div class="col">
                        <ul class="list-group">
                            <li id="totalPenaltiesPreview" class="list-group-item list-group-item-danger"></li>
                        </ul>
                    </div>
                    <div class="col">
                        <ul class="list-group">
                            <li id="previewFinalScore" class="list-group-item list-group-item-success"></li>
                        </ul>
                    </div>
                </div>

                        </div><!-- End Preview Score Area-->
                    </div> <!-- End modal body-->

                    <div class="modal-footer">
                        <button id="savePreviewScoreBtn" type="button" class="btn btn-success">Accept</button>
                        <button id="cancelPreviewScoreBtn" type="button" class="btn btn-warning">Cancel</button>
                    </div>



                </div><!-- End Modal-Content-->
    </div>
</div>