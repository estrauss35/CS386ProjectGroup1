<?php
include "resources/header.php";
?>


<!-- Declares the doctype as html -->
<!DOCTYPE html>


<html>

<body>
    <!-- Links the JavaScript file -->
    <script type="text/javascript" src="JavaScript.js"></script>

    <div class="center">
        <h1>Vulcan Scheduler</h1>

        <!-- All generated tags are placed into this paragraph tag -->
        <p id="body"></p>

        <!-- Button to add new actions -->
        <button onclick="newIns()">Add New Instruction</button>

        <!-- Line breaks -->
        <br>
        <br>

        <!-- Button to finalize all instruction inputs -->
        <button onclick="writeToFile()">Submit</button>

        <!-- Paragraph to display generated instructions -->
        <p id="output"></p>
    </div>



</body>

</html>
