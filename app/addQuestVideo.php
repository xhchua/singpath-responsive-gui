<?php

  $host   = 'localhost';
  $user   = 'root';
  $pass   = '';
  $database = 'test';

  // connect to the mysql database server.
  $connect = @mysql_connect ($host, $user, $pass);
  $a=$_POST['uQuestID']."";
if (!$connect)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("test", $connect);

$sql="INSERT INTO questvideo (uQuestID, VideoUrl)
VALUES
('$a','$_POST[VideoUrl]')";

if (!mysql_query($sql,$connect))
  {
  die('Error: ' . mysql_error());
  }

mysql_close($connect);
header("Location: videos.php?uQuestID=".$a);
?>
