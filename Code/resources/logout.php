<?php
/**
 * Created by PhpStorm.
 * User: agrze
 * Date: 29-Mar-17
 * Time: 9:30 PM
 */

session_start();
session_unset();
session_destroy();
header('Location: ../Neptune.php');
?>