var myFirebaseRef;
var chart;
var charData=[];


$(document).ready(function() {
    myFirebaseRef = new Firebase("https://votationapp-1323f-default-rtdb.firebaseio.com");
    $('#ceviche, #tacos, #paella, #mangu').click(vote);
    requestData();
});

vote = function(){
    var choice = this.id;
    var voteCount = Number($("#votos_" + choice + ' i').text());
    var self = this.id;

    console.log(voteCount);

    $("#" + choice).prop("disabled", true);

    myFirebaseRef.child(choice).update({
        "votos": ++voteCount
    }, function(){
        $("#" + choice).prop("disabled", false);
        //console.log('Se realizó un voto por ' + self);
        $("#chibi").prop("src", "img/" + self + ".png");
        $("#message").html('Gracias por tu voto');
        $("#msGracias").modal('show');
    });
};

requestData = function(){

    var total;

    myFirebaseRef.on("value", function(data) {
        total = 0;
        var comidas = data.val();
        for(comida in comidas){
            //console.log(comida, comidas[comida].votos, comidas[comida]);
            $("#votos_" + comida + " i").text(comidas[comida].votos);

            total += Number(comidas[comida].votos);
        }

        $("#total span").html(total);
    });
};