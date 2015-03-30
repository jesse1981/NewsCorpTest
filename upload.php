
<?php
$uploads_dir = '/public_html/newscorp';
foreach ($_FILES["fridge-upload"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["fridge-upload"]["tmp_name"][$key];
        $name     = $_FILES["fridge-upload"]["name"][$key];
        move_uploaded_file($tmp_name, "$uploads_dir/$name");
    }
}
?>
