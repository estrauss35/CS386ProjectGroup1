<?php
/**
 * Created by PhpStorm.
 * User: agrze
 * Date: 29-Mar-17
 * Time: 9:16 PM
 */

?>

<ul class="nav navbar-nav navbar-right">
    <li><a href="#" style="color: rgb(255, 255, 255)" data-toggle="modal" data-target="#loginModal">Login</a> </li>
    <li><a href="signup.php" style="color: rgb(255,255,255)">Sign Up</a> </li>
</ul>

</div>
    <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Login</h4>
                </div>
                <form role="form" id="formLogin" name="formLogin" method="post">
                    <div class="modal-body">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="form-group">
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" type="password" name="pass" id="pass" placeholder="Password">
                                </div>
                                <div>
                                    <h4 id="errorLogin" name="errorLogin" style="display: none; color: red" >Your Email and Password do not match.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="modal-footer">
                    <ul class="login_footer">
                        <li><button type="submit" id="submitForm" name="submitForm" class="btn btn-primary">Log In</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
