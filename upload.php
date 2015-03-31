<?php
$uploads_dir = '/home/logisoft/public_html/newscorp/upload';

$tmp_name = $_FILES["fridge-upload"]["tmp_name"];
$name     = $_FILES["fridge-upload"]["name"];

$result = move_uploaded_file($tmp_name, "$uploads_dir/$name");
if (!$result) echo "Copy Failed!";
header('Location: /');
?>
