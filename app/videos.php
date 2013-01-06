<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Singpath - Quest Videos</title>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="../src/jquery.youtubeplaylist.js"></script>

<script type="text/ecmascript">

  	$(function() {
			$("ul.demo2").ytplaylist({
                addThumbs:true, 
                autoPlay: false,
                onChange: function() {
                    console.log('changed');
                },
                holderId: 'ytvideo2'});
		});

</script>

<style type="text/css">




#ytvideo,
#ytvideo2 {
    float: left;
	margin-right:10px;
}


.yt_holder {
    background: #f3f3f3;
    padding: 10px;
    float: left;
    border: 0px solid #e3e3e3;
	margin-bottom:15px;
    max-height: 500px;
}


ul {
    float: left;
    margin: 0;
    padding: 0;
    width: 150px;
    max-height: 500px;
    overflow-x: scroll;
}

ul li {
    list-style-type: none;
    display:block;
    background: #f1f1f1;
    float: left;
    width: 216px;
    margin-bottom: 5px;
	padding:2px;
    
}

ul li a {
    font-family: georgia;
    text-decoration: none;
    display: block;
    color: #000;
}

.currentvideo{
	background: #e6e6e6;
}

</style>

</head>

<body >
    <br>
    <table align = "center"><tr><td>
    <div class = "container">
    <div class="yt_holder">
        <div id="ytvideo2"></div>
        <ul class="demo2">
<?php
    // set your infomation.
    $host       =   'localhost';
    $user       =   'root';
    $pass       =   '';
    $database   =   'test';

    // connect to the mysql database server.
    $connect = @mysql_connect ($host, $user, $pass);

if (!$connect)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("test", $connect);

$result = mysql_query("SELECT * FROM questvideo where uQuestID = '$_GET[uQuestID]'");
if (!$result) { // add this check.
    die('Invalid query: ' . mysql_error());
}
$b = $_GET['uQuestID'];
while($row = mysql_fetch_array($result))
  {
        $a = $row['VideoUrl'];
        $deleteUrl = "<a href='Quests.php?VideoUrl=$a&uQuestID=$b'><img src='delete.png' width='120' height='35'></a>";
        echo '<li><a href="'.$a. '"></a>'.$deleteUrl."</li>";
        echo "<br />";
  }

mysql_close($connect);

?>
        </ul>
    </div>
</td>
</tr>
<tr>
<td>
<h3>Add videos for your Quest</h3>    
</td>
</tr>
<tr>
<td>
        <form class= "form-search" action="addQuestVideo.php" method="POST">
            Quest Id: <input type="text" data-provide="typeahead" class="input-medium search-query" name="uQuestID">
            Video Url: <input type="text" class="input-medium search-query" name="VideoUrl">
            <input class = "btn" type="submit">
        </form>
    </td>
</tr>
</table>
</div>


</body>
</html>
