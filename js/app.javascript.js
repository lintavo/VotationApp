var myFirebaseRef;
var chart;
var charData = [];
var type = 'bar';

$(document).ready(function() {
    myFirebaseRef = new Firebase("https://votationapp-1323f-default-rtdb.firebaseio.com");
    $('#ceviche, #tacos, #paella, #mangu').click(vote);
    $('#bar, #pie, #donut').click(transformChart);
    requestData();
    addChart();
});

// Función para transformar el gráfico de las votaciones
transformChart = function() {
    chart.transform(this.id);
};

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
        charData = [];
        var comidas = data.val();
        var arr;
        for(comida in comidas){
            $("#votos_" + comida + " i").text(comidas[comida].votos);
            arr = [comida, comidas[comida].votos];// LLena arreglo con los datos de la base.
            charData.push(arr);

            total += Number(comidas[comida].votos);
        }

        $("#total span").html(total);

        chart.load({
            columns: charData
        });//Carga el gráfico con los datos obtenidos en el arreglo
    });
};

//Funciones para gráficos atributos y comportamiento.
addChart = function() {
    chart = c3.generate({
        bindto: "#chart",
        data: {
            type: type,
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
            width: {
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