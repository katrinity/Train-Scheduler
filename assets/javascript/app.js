


//  Clock 
function runningClock() {
    time = moment().format("hh:mm:ss A");
    $("#time").text(time);
}
clock = setInterval(runningClock, 1000);

var firebaseConfig = {
    apiKey: "AIzaSyAp1D2CD_TRQKgAju15Sggh8_yftrIhNbw",
    authDomain: "hello-229b6.firebaseapp.com",
    databaseURL: "https://hello-229b6.firebaseio.com",
    projectId: "hello-229b6",
    storageBucket: "hello-229b6.appspot.com",
    messagingSenderId: "1025167024395",
    appId: "1:1025167024395:web:8368b1f8259be399bcc20e",
    measurementId: "G-BY5GB1MNEJ"
};

firebase.initializeApp(firebaseConfig);
// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();


var clock;
var name;
var time;
var destination;
var arrival;
var frequency;
var database;
var trainData;




$(document).ready(function () {

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        name = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        arrival = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        trainData = {
            DataTrainName: name,
            DataDestination: destination,
            DataArrival: arrival,
            DataFrequency: frequency,

        };

        database.ref().push(trainData);
        clear();

    });

    database.ref().on("child_added", function (childSnapshot) {
        var snapName = childSnapshot.val().DataTrainName;
        var snapDestination = childSnapshot.val().DataDestination;
        var snapFrequency = childSnapshot.val().DataFrequency;
        var snapArrival = childSnapshot.val().DataArrival;

        //var time = moment();
        var arrival = moment(snapArrival, "hh:mm").subtract(1, "years");
        var diff = moment().diff(moment(arrival), "minutes");
        var Remainder = diff % snapFrequency;
        var timeLeft = snapFrequency - Remainder;
        var nextArrival = moment().add(timeLeft, "minutes").format("hh:mm");

        $("#trainTable").append("<tr><td>" + snapName + "</td><td>" + snapDestination + "</td><td>" + snapFrequency + "</td><td>" +
            nextArrival + "</td><td>" + timeLeft + "</td></tr>");

        //database.ref().child(childSnapshot.key).remove();
    });

    function clear() {
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
    }


});
