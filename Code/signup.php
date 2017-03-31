<?php
/**
 * Created by PhpStorm.
 * User: agrze
 * Date: 29-Mar-17
 * Time: 10:01 PM
 */

include "resources/header.php";

?>


<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vulcan: Sign Up</title>
    <style>
        .error{
            color: red;
        }
    </style>
</head>
<body>
<form role="form" method="post" id="newUser">
    <div style="padding-left: 5em">
        <div class="row">
            <div class="form-group col-sm-2">
                <input type="text" class="form-control" name="fname" id="inputFirstName" placeholder="First Name">
            </div>
            <div class="form-group col-sm-2">
                <input type="text" class="form-control" name="lname" id="inputLastName" placeholder="Last Name">
            </div>
            <div id="error_name" class="col-sm-4" style="display: none">
                <h4 class="error" id="error_name_text" ><-----Please enter your name.</h4>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-4">
                <input type="text" class="form-control" name="email" id="inputEmail" placeholder="Email">
            </div>
            <div id="error_email" class="col-sm-4" style="display: none">
                <h4 class="error" id="error_email_text"><-----Please enter a valid email.</h4>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-4">
                <input type="text" class="form-control" name="pass" id="inputPassword" placeholder="Password">
            </div>
            <div id="error_pass" class="col-sm-4" style="display: none">
                <h4 class="error" id="error_pass_text"><-----Please enter a Password.</h4>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-4">
                <input type="text" class="form-control" name="pass2" id="inputPassword2" placeholder="Password...again">
            </div>
            <div id="error_pass2" class="col-sm-4" style="display: none">
                <h4 class="error" id="error_pass2_text"><-----Your passwords do not match.</h4>
            </div>
        </div>

        <div class="row">
            <button id="submit" type="submit" class="btn btn-primary col-sm-4">Submit</button>
        </div>
    </div>
</form>

<script>
    $(function(){
        $('#newUser').on('submit',function(e){
            e.preventDefault();
            var isGood=true;
            var fname=document.getElementById('inputFirstName').value;
            var lname=document.getElementById('inputLastName').value;
            var email=document.getElementById('inputEmail').value;
            var password=document.getElementById('inputPassword').value;
            var password2=document.getElementById('inputPassword2').value;
            if(fname=="" || lname==""){
                document.getElementById('error_name').style.display='inline';
                isGood=false;
            }
            else{
                document.getElementById('error_name').style.display='none';
            }

            if(email==""){
                document.getElementById('error_email_text').innerText="<-----Please enter your email."
                document.getElementById('error_email').style.display='inline';
                isGood=false;
            }
            else{
                document.getElementById('error_email').style.display='none';
            }
            if(password==""){
                document.getElementById('error_pass').style.display='inline';
                isGood=false;
            }
            else{
                document.getElementById('error_pass').style.display='none';
            }
            if(password!=password2){
                document.getElementById('error_pass2').style.display='inline';
                isGood=false;
            }
            else{
                document.getElementById('error_pass2').style.display='none';
            }
            var insert_success=false;
            //window.alert(isGood);
            if(isGood==true){
                $.ajax({
                    url: "lib/dbQuery.php?t=signup",
                    type: "POST",
                    data: $('#newUser').serialize(),
                    async: false,
                    success: function(data){
                        //window.alert(data);
                        if(data=="existing"){
                            insert_success=false;
                        }
                        else{
                            insert_success=true;
                            window.location.href = "Neptune.php";
                        }
                    }
                });
            }
            if(insert_success==false && isGood==true){
                document.getElementById('error_email_text').innerText="That email is already in use.";
                document.getElementById('error_email').style.display='inline';
            }

        });
    });
</script>
</body>
</html>
