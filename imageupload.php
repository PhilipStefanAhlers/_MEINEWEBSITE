<?php

//Upload image

$target_dir = "Content/Slidercontent/";
$target_file = $target_dir . basename($_FILES["imageUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Allow certain file formats
if (!in_array($imageFileType, array("jpg", "png", "jpeg", "gif", "avif"))) {
  echo "Sorry, only JPG, JPEG, PNG, AVIF & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["imageUpload"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars(basename($_FILES["imageUpload"]["name"])). " has been uploaded.";

    //edit json

    $jsonString = file_get_contents("Content/Slidercontent/images.json");
    $jsondata = json_decode($jsonString, true);
    //new object in json file
    $jsondata["images"][] = ["imagelocation" => $target_file, "Date" => $_POST["imageDate"], "Discription" => $_POST["imageDiscription"], "tags" => ["illustration" => $_POST["illustration"],"3d" => $_POST["3d"],"digital" => $_POST["digital"], "tradtional" => $_POST["traditional"]]];

    $newjsonString = json_encode($jsondata);
    file_put_contents("Content/Slidercontent/images.json", $newjsonString);

  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}



header("Location: index.html");
exit;

?>
