/*
    Dette script er baseret på værdierne i input-felterne med ID
    'nyDataInput-Uid' og 'nyDataInput-CPR' under 'redigerData.html'
*/

// Blanding af Vanilla JS og jQuery for at vise, jeg kan anvende begge syntakser
$(document).ready(function() {
    // ID
    $('#nyDataInput-Uid').change(function() {
        let inputData = document.getElementById("nyDataInput-Uid").value;
        document.getElementById("nyDataTekst-Uid").innerHTML = inputData;
    });
    // Fulde navn
    $('#nyDataInput-CPR').change(function() {
        let inputData = document.getElementById("nyDataInput-CPR").value;
        document.getElementById("nyDataTekst-CPR").innerHTML = inputData;
    });
    // Nulstil data i form
    $('#nulstilData').click(function() {
        document.getElementById("redigerDataForm").reset();
        document.getElementById("nyDataTekst-Uid").innerHTML = "Intet angivet";
        document.getElementById("nyDataTekst-CPR").innerHTML = "Intet angivet";
    });
});