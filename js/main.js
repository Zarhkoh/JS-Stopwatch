
var timer = document.getElementById("timer");

var startBtn = document.getElementById("startBtn");

var stopBtn = document.getElementById("stopBtn");

var resetBtn = document.getElementById("resetBtn");

var saveBtn = document.getElementById("saveBtn");

var deleteBtn = document.getElementById("deleteBtn");

var showBtn = document.getElementById("showBtn");

var boardName = document.getElementById("boardName");

var boardTime = document.getElementById("boardTime");

var nameInput = document.getElementById("nameInput");

var lbArray = [];

var inputError = document.getElementById("inputError");

var printBtn = document.getElementById("printBtn");


var startTime = 0

var start = 0

var end = 0

var diff = 0

var timerID = 0

function chrono() {

    end = new Date()

    diff = end - start

    diff = new Date(diff)

    var msec = diff.getMilliseconds()

    var sec = diff.getSeconds()

    var min = diff.getMinutes()

    var hr = diff.getHours() - 1

    if (min < 10) {

        min = "0" + min

    }

    if (sec < 10) {

        sec = "0" + sec

    }

    if (msec < 10) {

        msec = "00" + msec

    }

    else if (msec < 100) {

        msec = "0" + msec

    }

    timer.innerHTML = hr + ":" + min + ":" + sec + ":" + msec

    timerID = setTimeout("chrono()", 10)

}

// We listen the start/stop button & apply the ChronoStart function.

startBtn.addEventListener("click", chronoStart)


function chronoStart() {

    // This function starts the Stopwatch if "Start" is in the button & display "Stop" in it.
    if (startBtn.innerHTML == "Start" && timer == "00:00:00:00") {

        start = new Date()

        chrono()

        startBtn.innerHTML = "Stop"

    }

    else if (startBtn.innerHTML == "Start" && timer != "00:00:00:00") {

        start = new Date() - diff

        start = new Date(start)

        chrono()

        startBtn.innerHTML = "Stop"

    }

    // Here, we stop the stopwatch & display "Start" again in the button.
    else {

        clearTimeout(timerID)

        startBtn.innerHTML = "Start"

    }

}

// we listen the "resetBtn" & execute chronoReset function.

resetBtn.addEventListener("click", chronoReset)


// We'll refresh the window to start a new Stopwatch.
function chronoReset() {
    document.location.reload(true);
}

// we listen the "deleteBtn" & execute removeTimer function.

deleteBtn.addEventListener("click", removeTimer);

// This function will clear EVERYTHING !  (localstorage & leaderboard saves)

function removeTimer(event) {

    localStorage.clear()
    lbArray = []

}



// we listen the "saveBtn" & execute saveTimer function who will save the timer in the localstorage & in a array.

saveBtn.addEventListener("click", saveTimer);

// This function will save the timer & the name in the local storage 

function saveTimer(event) {
    if (nameInput.value == "") {
        inputError.innerHTML = "please add a name to your time!"
    }

    else {
        var lbObject = {
            name: nameInput.value,
            time: timer.innerHTML,
        };
        lbArray.push(lbObject);
        localStorage.setItem("leaderboard", JSON.stringify(lbArray));
    }
}


// we listen the "showBtn" & execute the display function. It will show the leaderboard in the board on screen.

showBtn.addEventListener("click", display);

function display() {
    var leaderboardList = JSON.parse(localStorage.getItem('leaderboard'));
    boardName.innerHTML = '';
    boardTime.innerHTML = '';
    leaderboardList.forEach(function (score) {
        // We create a "li" element & add a classname.
        var liName = document.createElement("li");

        liName.className = "name";

        // We add the Li element at the end of the parent 
        boardName.appendChild(liName);

        // We do the same for the time.
        var liTime = document.createElement("li");

        liTime.className = "time";

        boardTime.appendChild(liTime);

        // We print the Localstorage in the li element we just created
        liName.innerText = score.name;

        liTime.innerText = score.time;
    }
    );
}
// We add a print button ! 
printBtn.addEventListener("click", leaderboardPrint);

function leaderboardPrint() {
    window.print();
}

