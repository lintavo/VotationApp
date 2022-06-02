var myFirebaseRef;
var chart;
var charData=[];

$(document).ready(function() {
    myFirebaseRef = new Firebase("https://votationapp-1323f-default-rtdb.firebaseio.com");

    requestData();
});

requestData = function(){
    myFirebaseRef.on("value", function(data) {
        var comidas = data.val();
        console.log(comidas);
    });
};