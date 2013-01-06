<?php

  $host   = 'localhost';
  $user   = 'root';
  $pass   = '';
  $database = 'test';

  // connect to the mysql database server.
  $connect = @mysql_connect ($host, $user, $pass);

if (!$connect)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("test", $connect);

$sql="INSERT INTO userquest (userID, uQuestID)
VALUES('$_POST[userID]','$_POST[uQuestID]')";

if (!mysql_query($sql,$connect))
  {
  die('Error: ' . mysql_error());
  }

mysql_close($connect);
header("Location: Quests.php");
?>
