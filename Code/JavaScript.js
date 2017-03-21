// Instruction counter and JSON text variables
var insNum = 0;
var JSONtext;

// No Idea how this works, but it loads the JSON file into the var
loadJSON(function(response) {
    JSONtext = JSON.parse(response);
});

function loadJSON(callback)
{

    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'Hardware.json', true);
    xobj.onreadystatechange = function () {

          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);

          }

    };

    xobj.send(null);

}

// Creates all HTML tags needed to hold instruction entering
function newIns()
{

    var newTag = "";

    // Increment the instruction number
    insNum++;

    // Add a label for the instruction
    newTag += "<h3>Instruction " + insNum + "</h3>";

    // Add p tags to hold condition tags
    newTag += "<p id=\"conHar" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"conCon" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"conInp" + insNum + "\" num=\"" + insNum + "\"></p>";

    // Add p tags to hold action tags
    newTag += "<p id=\"actHar" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"actAct" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"actInp" + insNum + "\" num=\"" + insNum + "\"></p>";

    // Seperator for between instructions
    newTag += "<p>====================</p>";

    // Add our new tag to the body
    document.getElementById("body").innerHTML += newTag;

    // Call the functions to get the hardware select menus
    conHar(insNum);
    actHar(insNum);

}

// Reads hardware from the JSON are creates a select tag with it
function conHar(num)
{

    var conHar = document.getElementById("conHar" + num);
    var newTag = "";
    var count;

    // Create a label for the hardware selection
    newTag += "<h4>Select Hardware for Condition " + num + "</h4>";

    // Open the select tag
    newTag += "<select onchange=\"conCon(" + num + ")\" ";
    newTag += "id=\"conHarSelect" + num + "\">";
    newTag += "<option selected disabled hidden style='display: none' value=''></option>";

    // Populate the select tag with hardware from the JSON
    for (count = 0; count < JSONtext.length; count++)
    {
        newTag += "<option>";
        newTag += JSONtext[count].Name;
        newTag += "</option>";
    }

    // Close the select tag
    newTag += "</select>";

    // Add our new tag to the condition hardware tag
    conHar.innerHTML += newTag;

}

// Reads the input from the hardware selection and creates a
// select tag with the available conditions
function conCon(num)
{

    var conCon = document.getElementById("conCon" + num);

    // Get the text selected from the hardware select tag
    var e = document.getElementById("conHarSelect" + num);
    var value = e.options[e.selectedIndex].text;

    var newTag = "";
    var count;
    var index;

    // Find the index in the JSON that the hardware is located
    for (count = 0; count < JSONtext.length; count++)
    {
        if (JSONtext[count].Name == value)
        {
            index = count;
        }
    }

    // Clear HTML from previous hardware and condition selections
    conCon.innerHTML = "";
    document.getElementById("conInp" + num).innerHTML = "";

    // Open the select tag for the condition select
    newTag += "<h4>Select Condition " + num + "</h4>";
    newTag += "<select onchange=\"conInp(" + num + ")\" ";
    newTag += "id=\"conConSelect" + num + "\">"
    newTag += "<option selected disabled hidden style='display: none' value=''></option>";

    // Populate the select with conditions from the JSON
    for (count = 0; count < JSONtext[index].Conditions.length; count++)
    {
        newTag += "<option>";
        newTag += JSONtext[index].Conditions[count].Name;
        newTag += "</option>";
    }

    // Close the condition select
    newTag += "</select>";

    // Add our new tag to the condition select tag
    conCon.innerHTML += newTag;

}

// Reads the input from the condition selection and creates a select
// tag with the needed inputs
function conInp(num)
{

    var conInp = document.getElementById("conInp" + num);

    // Get the text selected from the condition select tag
    var e = document.getElementById("conConSelect" + num);
    var value = e.options[e.selectedIndex].text;

    var newTag = "";
    var count1, count2;
    var index1, index2;

    // Get the indexes where the hardware and condition are located
    // in the JSON file
    for (count1 = 0; count1 < JSONtext.length; count1++)
    {
        for (count2 = 0; count2 < JSONtext[count1].Conditions.length; count2++)
        {
            if (JSONtext[count1].Conditions[count2].Name == value)
            {
                index1 = count1;
                index2 = count2;
            }
        }
    }

    // Clear previously selected inputs
    conInp.innerHTML = "";

    // Create a label for the input field
    newTag += "<h4>Fill Out Inputs</h4>";

    // Open the form tag for our inputs
    newTag += "<form>";

    // Loop through each input in the condition
    for (var key in JSONtext[index1].Conditions[index2].Inputs)
    {

        // Add the key name
        newTag += key

        // Add the corresponding tag based on the type of input
        if (JSONtext[index1].Conditions[index2].Inputs[key] == "INT")
        {
            newTag += "<input type=\"number\"/>";
        }
        else if (JSONtext[index1].Conditions[index2].Inputs[key] == "FLOAT")
        {
            newTag += "<input type=\"number\" step=\"0.01\"/>";
        }
        else if (JSONtext[index1].Conditions[index2].Inputs[key] == "STRING")
        {
            newTag += "<input type=\"text\"/>";
        }
        else
        {
            newTag += "<select>";
            newTag += "<option selected disabled hidden style='display: none' value=''></option>";
            newTag += "<option>True</option>";
            newTag += "<option>False</option>";
            newTag += "</select>";
        }

        // Add a line break
        newTag += "<br>";

    }

    // Close the form tag
    newTag += "</form>";

    // Add our new tag to the condition input tag
    conInp.innerHTML += newTag;

}

// Reads hardware from the JSON and creates a select tag with it
function actHar(num)
{

    var actHar = document.getElementById("actHar" + num);
    var newTag = "";
    var count;

    // Create a label for the action selection
    newTag += "<h4>Select Hardware for Action " + num + "</h4>";

    // Open the select tag
    newTag += "<select onchange=\"actAct(" + num + ")\" ";
    newTag += "id=\"actHarSelect" + num + "\">";
    newTag += "<option selected disabled hidden style='display: none' value=''></option>";

    // Populate the select tag with the hardware from the JSON
    for (count = 0; count < JSONtext.length; count++)
    {
        newTag += "<option>";
        newTag += JSONtext[count].Name;
        newTag += "</option>";
    }

    // Close the select tag
    newTag += "</select>";

    // Add our new tag to the action hardware tag
    actHar.innerHTML += newTag;

}

// Reads the input from the hardware selection and creates a
// select tag with the available actions
function actAct(num)
{

    var actAct = document.getElementById("actAct" + num);

    // Get the text selected from the hardware select tag
    var e = document.getElementById("actHarSelect" + num);
    var value = e.options[e.selectedIndex].text;

    var newTag = "";
    var count;
    var index;

    // Find the index in the JSON that the hardware is located
    for (count = 0; count < JSONtext.length; count++)
    {
        if (JSONtext[count].Name == value)
        {
            index = count;
        }
    }

    // Clear HTML from previous hardware and action selections
    actAct.innerHTML = "";
    document.getElementById("actInp" + num).innerHTML = "";

    // Open the select tag for the action select
    newTag += "<h4>Select Action " + num + "</h4>";
    newTag += "<select onchange=\"actInp(" + num + ")\" ";
    newTag += "id=\"actActSelect" + num + "\">";
    newTag += "<option selected disabled hidden style='display: none' value=''></option>";

    // Populate the select with actions from the JSON
    for (count = 0; count < JSONtext[index].Actions.length; count++)
    {
        newTag += "<option>";
        newTag += JSONtext[index].Actions[count].Name;
        newTag += "</option>";
    }

    // Close the action select
    newTag += "</select>";

    // Add our new tag to the action select tag
    actAct.innerHTML += newTag;

}

// Reads the input from the action selection and creates a select
// tag with the needed inputs
function actInp(num)
{

    var actInp = document.getElementById("actInp" + num);

    // Get the text selected from the action select tag
    var e = document.getElementById("actActSelect" + num);
    var value = e.options[e.selectedIndex].text;


    var newTag = "";
    var count1, count2;
    var index1, index2;

    // Get the indexes where the hardware and action are located in
    // the JSON file
    for (count1 = 0; count1 < JSONtext.length; count1++)
    {
        for (count2 = 0; count2 < JSONtext[count1].Actions.length; count2++)
        {
            if (JSONtext[count1].Actions[count2].Name == value)
            {
                index1 = count1;
                index2 = count2;
            }
        }
    }

    // Clear previously selected inputs
    actInp.innerHTML = "";

    // Create a label for the input field
    newTag += "<h4>Fill Out Inputs</h4>";

    // Open the form tag for our inputs
    newTag += "<form>";

    // Loop through each input in the action
    for (var key in JSONtext[index1].Actions[index2].Inputs)
    {

        // Add the key name
        newTag += key

        // Add the corresponding tag based on the type of input
        if (JSONtext[index1].Actions[index2].Inputs[key] == "INT")
        {
            newTag += "<input type=\"number\"/>";
        }
        else if (JSONtext[index1].Actions[index2].Inputs[key] == "FLOAT")
        {
            newTag += "<input type=\"number\" step=\"0.01\"/>";
        }
        else if (JSONtext[index1].Actions[index2].Inputs[key] == "STRING")
        {
            newTag += "<input type=\"text\"/>";
        }
        else
        {
            newTag += "<select>";
            newTag += "<option selected disabled hidden style='display: none' value=''></option>";
            newTag += "<option>True</option>";
            newTag += "<option>False</option>";
            newTag += "</select>";
        }

        // Add a line break
        newTag += "<br>";

    }

    // Close the form tag
    newTag += "</form>";

    // Add our new tag to the action input tag
    actInp.innerHTML += newTag;

}

// Not finished yet. Will call the necessary PHP functions to write
// to a file and allow the user to download it
function writeToFile()
{

    // Get all the inputs

    /*
    This can be done by getting the inner HTML of the body tag and looping
    through each instruction in it. The HTML can then be parsed for values.
    Each value should be placed into double array where the outer array is the
    instructions and the inner arrays are the values associated with those
    instructions.
    */

    // Check if any of the inputs are NULL

    /*
    Simply loop through the double array and check to make sure each value is
    not NULL.
    */


    // Parse the inputs into JSON text

    /*
    I do not have info on how to structure our outer JSON yet, so we don't need
    to worry about this part yet.
    */

    // Write the text to a file

    /*
    This will most likely have to be done by writting it to a file on the server
    and then allowing the user to download the file. PHP will most likely have
    to be used here, I just don't know how yey.
    */

}