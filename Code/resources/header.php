<?php
/**
 * Created by PhpStorm.
 * User: Alex Grzesiak
 * Date: 29-Mar-17
 * Time: 8:07 PM
 */

session_start();

?>

<html lang="en">
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- Links the css file -->
    <link type="text/css" rel="stylesheet", href="Neptune.css"/>

    <!-- Sets the webpage title -->
    <title>Vulcan Scheduler</title>
</head>

<body >
    <div class="header" >
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header" id="header">
                    <!-- Add image to header bar -->
                    <a class="navbar-brand" href="Neptune.php">
                        <img id="header-image" src="images/Logo.png">
                    </a>
                </div>
                <?php
                // If there is a user already signed in (ie user attributes in the session), load the user options.
                if(isset($_SESSION['first_name']) && $_SESSION['first_name']!="")
                {
                    echo("<div class=\"dropdown navbar-right\">");
                    echo("<button class=\"dropbtn\">". $_SESSION['first_name']."</button>");
                    echo("<div class='dropdown-content shift-left'><a href=\"profile.php\">Profile</a>");
                    echo("<a href=\"resources/logout.php\">Log Out</a></div></div></div>");
                }
                else
                {
                    // If there is no user logged in, use a different setup.
                    include "resources/notLoggedIn.php";
                }

                ?>
            </div>
        </nav>
    </div>

<script>
    $(function(){
        // Takes the form data from the login modal and sends it off to be validated.
        $('#submitForm').on('click',function(e){
            var isFound=false;
            e.preventDefault();
            $.ajax({
                url: "lib/dbQuery.php?t=login",
                type:"POST",
                data: $("#formLogin").serialize(),
                success: function(data){
                    if(data=="no_user"){
                        //no user found
                        isFound=false;
                    }
                    else if(data=="user_found"){
                        isFound=true;
                        window.location.reload();
                    }
                }
            });
            if(!isFound){
                document.getElementById('errorLogin').style.display='inline';
            }
        });
    });
</script>

</body>


</html>
