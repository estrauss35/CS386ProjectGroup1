// Instruction counter and JSON text variables
var insNum = 0;
var JSONtext;

// No Idea how this works, but it loads the JSON file into the variable
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

/*
 *  Name:        newIns
 *  Description: Runs when the "Add New Instruction" button is clicked. Creates
 *               several new tags that will be necessary to hold all the HTML
 *               elements required when entering an instruction. Each of these
 *               new tags are marked with an instruction number and then
 *               appended to the "body" section of the webpage.
 */
function newIns()
{

    var child, newTag;

    // Initialize our new tag
    newTag = "";

    // Increment the instruction number
    insNum++;

    // Add a label for the instruction
    newTag += "<h2>Instruction " + insNum + "</h2>";

    // Add p tags to hold condition tags
    newTag += "<p id=\"conHar" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"conCon" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"conInp" + insNum + "\" num=\"" + insNum + "\"></p>";

    // Add p tags to hold action tags
    newTag += "<p id=\"actHar" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"actAct" + insNum + "\" num=\"" + insNum + "\"></p>";
    newTag += "<p id=\"actInp" + insNum + "\" num=\"" + insNum + "\"></p>";

    // Seperator for between instructions
    newTag += "<p>================================</p>";

    // Add our new tag to the body
    document.getElementById("body").innerHTML += newTag;

    // Call the functions to get the hardware select menus
    conHar(insNum);
    actHar(insNum);

}

/*
 *  Name:        conHar
 *  Description: Creates a select menu of hardware from the JSON file and places
 *               it into the condition hardware tag that corresponds to the
 *               number parameter.
 */
function conHar(num)
{

    var conHar, newTag, count;

    // Fetch our condition hardware tag and initialize our new HTML tag
    conHar = document.getElementById("conHar" + num);
    newTag = "";

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

/*
 *  Name:        conCon
 *  Description: Creates a select menu of conditions from the JSON file and
 *               places it into the condition condition tag that corresponds to
 *               the number parameter.
 */
function conCon(num)
{

    var conCon;
    var e, value, newTag;
    var count, index;

    // Fetch our condition tag and initialize our new HTML tag
    conCon = document.getElementById("conCon" + num);
    newTag = "";

    // Get the text selected from the hardware select tag
    e = document.getElementById("conHarSelect" + num);
    value = e.options[e.selectedIndex].text;

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

/*
 *  Name:        conInp
 *  Description: Creates a form of inputs specified in the JSON file and places
 *               it in the condition input tag that corresponds to the number
 *               parameter.
 */
function conInp(num)
{

    var conInp;
    var e, value, newTag;
    var count1, count2;
    var index1, index2;

    // Fetch our condition input tag and initialize our new HTML tag
    conInp = document.getElementById("conInp" + num);
    newTag = "";

    // Get the text selected from the condition select tag
    e = document.getElementById("conConSelect" + num);
    value = e.options[e.selectedIndex].text;

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
    newTag += "<form id=\"conForm" + num + "\">";

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

/*
 *  Name:        actHar
 *  Description: Creates a select menu of hardware from the JSON file and places
 *               it into the action hardware tag that corresponds to the number
 *               parameter.
 */
function actHar(num)
{

    var actHar, newTag, count;

    // Fetch our action hardware tag and initialize our new HTML tag
    actHar = document.getElementById("actHar" + num);
    newTag = "";

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

/*
 *  Name:        actAct
 *  Description: Creates a select menu of actions from the JSON fil and places
 *               it into the action action tag that corresponds to the number
 *               parameter.
 */
function actAct(num)
{

    var actAct;
    var e, value, newTag;
    var count, index;

    // Fetch our action tag and initialize our new HTML tag
    actAct = document.getElementById("actAct" + num);
    newTag = "";

    // Get the text selected from the hardware select tag
    e = document.getElementById("actHarSelect" + num);
    value = e.options[e.selectedIndex].text;

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

/*
 *  Name:        actInp
 *  Description: Creates a form of inputs specified in the JSON file and places
 *               it in the action input tag that corresponds to the number
 *               parameter.
 */
function actInp(num)
{

    var actInp;
    var e, value, newTag;
    var count1, count2;
    var index2, index2;

    // Fetch our action input tag and initialize our new HTML tag
    actInp = document.getElementById("actInp" + num);
    newTag = "";

    // Get the text selected from the action select tag
    e = document.getElementById("actActSelect" + num);
    value = e.options[e.selectedIndex].text;

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
    newTag += "<form id=\"actForm" + num + "\">";

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
