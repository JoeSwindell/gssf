<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

function __autoload($class_name){
    include $class_name . '.php';
}

define ('WEB_DIRECTORY','gssf_admin');
define ('REAL_PATH', realpath(__DIR__ . '/../'));
define ('ROOT_PATH', ("C:\inetpub\wwwroot"));
define ('MYSQL', ROOT_PATH.'/gssf.inc.php');

REQUIRE(MYSQL);