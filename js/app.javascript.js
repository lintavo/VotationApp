var myFirebaseRef;
var chart;
var charData=[
    ['tacos', 50],
    ['paella', 41],
    ['ceviche', 25],
    ['mangu', 35]
];


$(document).ready(function() {
    myFirebaseRef = new Firebase("https://votationapp-1323f-default-rtdb.firebaseio.com");
    $('#ceviche, #tacos, #paella, #mangu').click(vote);
    requestData();
    addChart();
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
    var comida;

    myFirebaseRef.on("value", function(data) {
        total = 0;
        var comidas = data.val();
        for(comida in comidas){
            $("#votos_" + comida + " i").text(comidas[comida].votos);

            total += Number(comidas[comida].votos);
        }

        $("#total span").html(total);
    });
};

//Funciones para gráficos.
addChart = function() {
    chart = c3.generate({
        bindto: "#chart",
        data: {
            type: 'donut',
            columns: charData,
            colors: {
                tacos: '#0d6efd',
                paella: '#198754',
                ceviche: '#0dcaf0',
                mangu: '#ffc107'
            },
            names: {
                tacos: 'Tacos al pastor',
                paella: 'Paella Valenciana',
                ceviche: 'Ceviche Peruano',
                mangu: 'Mangú'
            }
        },
        bar: {
            with: {
                ratio: 1
            }
        },
        tooltip: {
            format: {
                title: function(x) {
                    return "Estado de la votación";
                }
            }
        },
        axis: {
            rotated: true,
            y: {
                label: 'Cantidad de votos'
            },
            x: {
                show: true,
                label: 'platillos en votación'
            }
        },
        donut: {
            title: 'Platillos'
        }
    });
};