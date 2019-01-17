
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

// On écoute le bouton "startBtn" et exécute la fonction chronoStart.

startBtn.addEventListener("click", chronoStart)

// Fonction qui lance le chronomètre et le met en pause

function chronoStart() {

    if(startBtn.innerHTML == "Start" && timer == "00:00:00:00") {

    start = new Date()

    chrono()

    startBtn.innerHTML = "Stop"

    }

    else if (startBtn.innerHTML == "Start" && timer != "00:00:00:00"){

    start = new Date()-diff

	start = new Date(start)

    chrono()

    startBtn.innerHTML = "Stop"

    }

    else {

    clearTimeout(timerID)

    startBtn.innerHTML = "Start"

    }

}

// On écoute le bouton "resetBtn" et exécute la fonction chronoReset

resetBtn.addEventListener("click", chronoReset)

// Fonction qui remet à 0 le chronomètre

function chronoReset(){
document.location.reload(true);
}

// On écoute le bouton "deleteBtn" et exécute la fonction removeTimer

deleteBtn.addEventListener("click", removeTimer);

// Cette fonction vide TOUT le local storage

function removeTimer(event) { 

  localStorage.clear()
  lbArray = []

}



// On écoute le bouton "saveBtn" et exécute la fonction saveTimer

saveBtn.addEventListener("click", saveTimer);

// Cette fonction sauvegarde dans le localStorage le timer ainsi que la value inscrite dans l'input

function saveTimer(event) {
    if (nameInput.value == "") {
        inputError.innerHTML = "ECRIS UN NOM FDP !"
    }

    else {var lbObject = {name: nameInput.value, 
    time: timer.innerHTML,};
lbArray.push(lbObject);
localStorage.setItem("leaderboard", JSON.stringify(lbArray));
    }
}


// On écoute le bouton "showBtn" et exécute la fonction display

showBtn.addEventListener("click", display);

function display() {
    var leaderboardList = JSON.parse(localStorage.getItem('leaderboard'));
    boardName.innerHTML = '';
    boardTime.innerHTML = '';
	leaderboardList.forEach(function(score) {
 		// On crée l'élément p et lui donne une ID
		var liName = document.createElement("li");

		liName.className = "name";

 		// On envoie l'élément p dans le board
		boardName.appendChild(liName);

 		var liTime = document.createElement("li");

 		liTime.className = "time";

 		boardTime.appendChild(liTime);

 		//  On envoie le localStorage dans le contenu p
		liName.innerText =  score.name;

 		liTime.innerText =  score.time;
		// board.innerHTML += "nom: " + score.name + "time: " + score.time;
		}
	);

}