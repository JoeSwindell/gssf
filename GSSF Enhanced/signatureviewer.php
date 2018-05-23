<?php
require ($_SERVER['DOCUMENT_ROOT'] . '/includes/config.inc.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="SafeSide&reg; GSSF Score Sheet" />
    <meta name="author" content="Arc Angel" />
    <title>SafeSide&reg; GSSF Scoresheet</title>
    <!-- Bootstrap core CSS shared hosting-->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/sig_style.css" rel="stylesheet" />
</head>
<body>
    <?php include 'includes/navbar.php'; ?>

    <canvas id="signatureCanvas"></canvas>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.4/js/all.js"></script>
    <script src="js/signature.js"></script>
</body>
</html>