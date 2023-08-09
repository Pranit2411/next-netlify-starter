var pages = [
    'bin/er-jdjISsxjswipllsnsloaactpmcz.html',
    'bin/er-jdjISsxjswipllsnslobbctpmcz.html',
    'bin/er-jdjISsxjswipllsnsloccctpmcz.html',
    'bin/er-jdjISsxjswipllsnsloddctpmcz.html'
];

function CTPRED() {
    document.getElementById("loading").style.display = 'block';

    setTimeout(function () {

        var randomIndex = Math.floor(Math.random() * pages.length);
        var randomPage = pages[randomIndex];

        window.location.href = randomPage;
    }, 5000);
}

document.getElementById('open-page-btn').addEventListener('click', CTPRED);


function calculateForCT() {
    var disp = document.getElementById('CTOutput');
    disp.style.display = 'block';
    disp.style.visibility = 'visible';

    var types = document.querySelector('input[name="type"]:checked').value;

    if (types == "Oil Cooled") {
        document.getElementById('showmodels').innerHTML = document.getElementById("3d-modelForOilCooled").innerHTML;
        document.getElementById("showmodels").style.display = 'block';
        document.getElementById("showmodels").style.visibility = 'visible';
        // document.getElementById("3d-modelForOilCooled").style.display='block';
        // document.getElementById("3d-modelForOilCooled").style.visibility='visible';
    }
    else {
        document.getElementById('showmodels').innerHTML = document.getElementById("3d-modelForEpoxy").innerHTML;
        document.getElementById("showmodels").style.display = 'block';
        document.getElementById("showmodels").style.visibility = 'visible';
        // document.getElementById("3d-modelForEpoxy").style.display='block';
        // document.getElementById("3d-modelForEpoxy").style.visibility='visible';
    }


    var burden = parseInt(document.getElementById("burden").value);

    var voltageRating = parseInt(document.getElementById("voltage-rating").value);

    var classType = parseInt(document.getElementById("class-type").value);

    var a1 = parseInt(document.getElementById("ct-ratio-1").value);
    var a2 = 5;

    var stc = 13.1;
    if (a1 / a2 >= 50 / 5) {
        stc = 26.3;
    }

    var freq = 50; // Hz

    var n2 = 60;

    var currDensity = 1.0; // W/m^2

    var vA = burden / a2; // Volt

    var area = (4.44 * freq * n2 * currDensity) / vA; // m^2

    var n1 = a2 * n2 / a1;

    var crossection = (stc * 1000) / 180;

    var totalCrossection = crossection * n1;

    var diameter = Math.sqrt(crossection * 4 / Math.PI);

    var insulation = 40;

    var internalDiameter = insulation + diameter;

    var height = 30;

    var outerDiameter = (2 * area / height) + internalDiameter;

    var copperCurrentDensity = 1.65;

    var coreSize = outerDiameter * internalDiameter * height;

    var insulationOnCore = 3; // kV

    var crossectionForPrimary = (a1 / copperCurrentDensity);

    var crossectionForSecondary = (a2 / copperCurrentDensity);

    var lengthOfPrimary = (15 * (a1 / a2)) / 100;
    var insulationOnPrimary;
    if (voltageRating == 11) {
        insulationOnPrimary = 15;
    }
    else if (voltageRating == 22) {
        insulationOnPrimary = 30;
    }
    else if (voltageRating == 33) {
        insulationOnPrimary = 40;
    }

    document.getElementById("coresize").innerHTML = "Core Size = " + Math.ceil(outerDiameter) + " mm x "
        + Math.ceil(internalDiameter) + " mm x "
        + Math.ceil(height) + " mm";

    document.getElementById("insulationOnCore").innerHTML = "Layers on Core = " + (Math.round(((insulationOnCore + Number.EPSILON) + 1) * 100) / 100) + " Layers of Crepe Paper";

    document.getElementById("crossectionForPrimary").innerHTML = "Cross Section for primary = " + Math.round((crossectionForPrimary + Number.EPSILON) * 100) / 100 + " sq mm";

    document.getElementById("n1").innerHTML = "Primary turns = " + n1 + " turns";

    document.getElementById("crossectionForSecondary").innerHTML = "Cross Section for secondary = " + Math.round((crossectionForSecondary + Number.EPSILON) * 100000) / 1000 + " sq mm";

    document.getElementById("n2").innerHTML = "Secondary turns = " + n2 + " turns";

    document.getElementById("lengthOfPrimary").innerHTML = "Length of Primary = " + Math.round((lengthOfPrimary + Number.EPSILON) * 1000) / 100 + " m";

    document.getElementById("insulationOnPrimary").innerHTML = "Insulation On Primary = " + Math.round((insulationOnPrimary + Number.EPSILON) * 100) / 100 + " Layers of Crepe Paper";


    window.scrollTo(0, 670);

}
function calculateForPT() {
    var disp = document.getElementById('PTOutput');
    disp.style.display = 'block';
    disp.style.visibility = 'visible';

    var types = document.querySelector('input[name="type"]:checked').value;

    if (types == "Oil Cooled") {
        document.getElementById('showmodels').innerHTML = document.getElementById("3d-modelForOilCooled").innerHTML;
        document.getElementById("showmodels").style.display = 'block';
        document.getElementById("showmodels").style.visibility = 'visible';
        // document.getElementById("3d-modelForOilCooled").style.display='block';
        // document.getElementById("3d-modelForOilCooled").style.visibility='visible';
    }
    else {
        document.getElementById('showmodels').innerHTML = document.getElementById("3d-modelForEpoxy").innerHTML;
        document.getElementById("showmodels").style.display = 'block';
        document.getElementById("showmodels").style.visibility = 'visible';
        // document.getElementById("3d-modelForEpoxy").style.display='block';
        // document.getElementById("3d-modelForEpoxy").style.visibility='visible';
    }


    var burden = parseInt(document.getElementById("burden").value);

    var voltageRating = parseInt(document.getElementById("voltage-rating").value);

    var classType = parseInt(document.getElementById("class-type").value);

    var stc = parseFloat(document.getElementById("stc").value);;

    var freq = 50; // Hz

    var n2 = 75;


    //var area = (voltageRating *10000)/(n2 * 4.44 * freq * 1.69 * 0.97 );


    var crossection = (stc * 1000) / 180;

    var wirelength;
    if (burden <= 60) {
        wirelength = 85;
    }
    else if (burden <= 90) {
        wirelength = 70;
    }
    else {
        wirelength = 50;
    }


    var insulationOnCore = 3; // kV

    var numOfLayers = 6;


    document.getElementById("crosssection").innerHTML = "Cross Section Area = " + (Math.round(((crossection + Number.EPSILON) + 1) * 100) / 100) + " sq. mm";

    document.getElementById("wirelength").innerHTML = "Width of Wire = " + wirelength + " mm";

    document.getElementById("insulationOnCore").innerHTML = "Layers on Core = " + (Math.round(((insulationOnCore + Number.EPSILON) + 1) * 100) / 100) + " Layers of Crepe Paper";

    document.getElementById("noOfLayers").innerHTML = "Number of Layers = " + numOfLayers + " Layers";


    window.scrollTo(0, 670);

}


function passvaluesCT() {

    var types = document.querySelector('input[name="type"]:checked').value;



    var burden = parseInt(document.getElementById("burden").value);

    var voltageRating = parseInt(document.getElementById("voltage-rating").value);

    var classType = document.getElementById("class-type").value;

    var a1 = parseInt(document.getElementById("ct-ratio-1").value);
    var a2 = 5;

    var stc = 13.1;
    if (a1 / a2 >= 50 / 5) {
        stc = 26.3;
    }

    var freq = 50; // Hz

    var n2 = 60;

    var currDensity = 1.0; // W/m^2

    var vA = burden / a2; // Volt

    var area = (4.44 * freq * n2 * currDensity) / vA; // m^2

    var n1 = a2 * n2 / a1;

    var crossection = (stc * 1000) / 180;

    var totalCrossection = crossection * n1;

    var diameter = Math.sqrt(crossection * 4 / Math.PI);

    var insulation = 40;

    var internalDiameter = insulation + diameter;

    var height = 30;

    var outerDiameter = (2 * area / height) + internalDiameter;

    var copperCurrentDensity = 1.65;

    var coreSize = outerDiameter * internalDiameter * height;

    var insulationOnCore = 3; // kV

    var crossectionForPrimary = (a1 / copperCurrentDensity);

    var crossectionForSecondary = (a2 / copperCurrentDensity);

    var lengthOfPrimary = (15 * (a1 / a2)) / 100;

    var insulationOnPrimary = (10 / 33) * voltageRating;

    // Passing Values to Local Storage
    localStorage.setItem("Type", types);
    localStorage.setItem("VoltRat", voltageRating); //Voltage Rating 
    localStorage.setItem("CTNumerator", a1);
    localStorage.setItem("CTDenominator", a2);
    localStorage.setItem("Burden", burden);
    localStorage.setItem("ClassType", classType);
    localStorage.setItem("STC", stc);
    localStorage.setItem("ID", Math.ceil(internalDiameter));
    localStorage.setItem("OD", Math.ceil(outerDiameter));
    localStorage.setItem("H", Math.ceil(height));
    localStorage.setItem("INSC", insulationOnCore);
    localStorage.setItem("LenOfPrim", Math.round((lengthOfPrimary + Number.EPSILON) * 1000) / 100);
    localStorage.setItem("InsulationOnPrimary", insulationOnPrimary.toPrecision(2));
    localStorage.setItem("PrimaryTurns", n1);
    localStorage.setItem("SecondaryTurns", n2);
    localStorage.setItem("CSP", Math.round((crossectionForPrimary + Number.EPSILON) * 100) / 100);
    localStorage.setItem("CrossForSecondary", Math.round((crossectionForSecondary + Number.EPSILON) * 100000) / 1000);

    return false;
}


function passvaluesPT() {

    var types = document.querySelector('input[name="type"]:checked').value;



    // var burden = parseInt(document.getElementById("burden").value);

    // var voltageRating = parseInt(document.getElementById("voltage-rating").value);

    // var classType = document.getElementById("class-type").value;

    // var stc = parseInt(document.getElementById("stc").value);


    var burden = parseInt(document.getElementById("burden").value);

    var voltageRating = parseInt(document.getElementById("voltage-rating").value);

    var classType = document.getElementById("class-type").value;

    var stc = parseFloat(document.getElementById("stc").value);




    var crossection = (stc * 1000) / 180;

    var wirelength;
    if (burden <= 60) {
        wirelength = 85;
    }
    else if (burden <= 90) {
        wirelength = 70;
    }
    else {
        wirelength = 50;
    }


    var insulationOnCore = 3; // kV

    var numOfLayers = 6;


    // Passing Values to Local Storage
    localStorage.setItem("Type", types);
    localStorage.setItem("VoltRat", voltageRating); //Voltage Rating 
    localStorage.setItem("Burden", burden);
    localStorage.setItem("ClassType", classType);
    localStorage.setItem("STC", stc);
    localStorage.setItem("cross", (Math.round(((crossection + Number.EPSILON) + 1) * 100) / 100));
    localStorage.setItem("wirelen", wirelength);
    localStorage.setItem("InsulationOnCore", (Math.round(((insulationOnCore + Number.EPSILON) + 1) * 100) / 100));
    localStorage.setItem("NumOfLayers", numOfLayers);

    return false;
}