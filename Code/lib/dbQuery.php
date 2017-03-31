<?php
/**
 * Created by PhpStorm.
 * User: agrze
 * Date: 29-Mar-17
 * Time: 9:33 PM
 */


$host = "tund.cefns.nau.edu";
$username = "hostUsername";
$password = "hostPassword";
$database = "Vulcan";
$server = "localhost";


$db = new mysqli($server,$username,$password);//Use if on localhost
//$db = new mysqli($host, $username,$password);//Use it on CEFNS

if($db -> connect_error){
    die("Connection Failed " . $db->connect_error);
}


$db->query("USE". $database ." ;");

$table = $_GET['t'];
if($table == "signup")
{
    $sql = "SELECT * FROM user WHERE email = '" . $_POST['email'] . "';";
    $result = $db->query($sql);
    if ($result->num_rows == 0) {
        $sql = "INSERT INTO user(first_name, last_name, email, pass, join_date) ";
        $sql .= "VALUES ('" . $_POST['fname'] . "', '" . $_POST['lname'] . "', '" . $_POST['email'];
        $sql .= "', '" . $_POST['pass'] . "', " . "CURDATE()" . ");";

        if ($db->query($sql) === TRUE) {
            //echo "Query Success";
        }

        session_start();
        session_unset();
        $_SESSION['first_name'] = $_POST['fname'];
        $_SESSION['last_name'] = $_POST['lname'];
        $_SESSION['user_id'] = $user_id['id'];

    } else {
        echo("existing");
    }
}
elseif($table=="login"){
    $sql = "SELECT * FROM user WHERE email = '" . $_POST['email'] . "' and pass='" .$_POST['pass']."';";
    $result=$db->query($sql);
    if($result->num_rows==0){
        echo("no_user");
    }
    elseif ($result->num_rows==1){
        echo("user_found");
        session_start();
        session_unset();
        $user=$result->fetch_array(MYSQLI_ASSOC);
        $_SESSION['first_name']=$user['first_name'];
        $_SESSION['last_name']=$user['last_name'];
        $_SESSION['user_id']=$user['id'];
    }
}

$db->close();