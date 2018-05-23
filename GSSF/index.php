<?php include 'includes/header.php'?>

<body>
    <div class="container">

        <div id="pageTitleDiv" class="row justify-content-center">
            <div class="col-sm-12">
                <h1>SafeSide&reg; GSSF Scoresheet</h1>
            </div>
        </div>

        <div id="shooterTableDiv" class="row justify-content-center">
            <div class="col-sm-12">
                <?php include './includes/shooterTable.php';?>
            </div>
        </div>

        <div id="optionsTableDiv" class="row justify-content-center">
            <div class="col-sm-6">
                <?php include './includes/options.php';?>
            </div>
        </div>


        <br />

        <div id="scoreTableDiv" class="row justify-content-center">
            <div class="col-sm-12"><?php include './includes/scoreTable.php';?>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <button id="submitScore" type="button" class="btn btn-primary">Submit Score</button>
            </div>


            <?php include 'includes/addShooterModal.php'; ?>

        </div><?php include 'includes/footer.php' ?>