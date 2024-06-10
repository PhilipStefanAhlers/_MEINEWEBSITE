<?php
$msg = $_POST["Message"];
$msg = wordwrap($msg,70);

if (mail($_POST["Email"], $_POST["Subject"], $msg)) {
    echo "Email sent";
    header("Location: index.html");
    exit;
} else {
    echo "Email not sent";
};
?>