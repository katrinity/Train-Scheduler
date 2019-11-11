


//  Clock 
function runningClock() {
    time = moment().format("hh:mm:ss A");
    $("#time").text(time);
}
//  Call function with setInterval
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



var name;
var destination;
var firstArrival;
var frequency;
var database;
var trainFirebaseData;
var newFirebaseData;
var time;
var clock;



$(document).ready(function () {

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        name = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstArrival = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        trainFirebaseData = {
            DataTrainName: name,
            DataDest: destination,
            DataFirstArrival: firstArrival,
            DataFrequency: frequency,
            TimeStamp: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(trainFirebaseData);
        clear();

    });

    database.ref().on("child_added", function (childSnapshot) {
        var snapName = childSnapshot.val().DataTrainName;
        var snapDest = childSnapshot.val().DataDest;
        var snapFreq = childSnapshot.val().DataFrequency;
        var snapArrival = childSnapshot.val().DataFirstArrival;

        //  Time
        var timeNow = moment();
        //  Convert Time and configure for Future use by pushing firstArrival back 1 year
        var firstArrivalConverted = moment(snapArrival, "HH:mm A").subtract(1, "years");
        //  Calculate now vs First Arrival
        var diff = moment().diff(moment(firstArrivalConverted), "minutes");
        var left = diff % snapFreq;
        // Wait s
        var timeLeft = snapFreq - left;
        var newArrival = moment().add(timeLeft, "m").format("HH:mm: A");

        $("#trainTable").append("<tr><td>" + snapName + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" +
            newArrival + "</td><td>" + timeLeft + "</td></tr>");

        // database.ref().child(childSnapshot.key).remove();
    });

    function clear() {
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    }


});
