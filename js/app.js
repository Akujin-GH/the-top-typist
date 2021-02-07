let textDisplay = document.querySelector("#textDisplay");
let textInput = document.querySelector("#textInput");
let origText = document.querySelector("#origText");

let scoreModal = document.querySelector("#scoreModal");

let clickToFocus = document.querySelector("#focusClick");

let wpm = document.querySelector(".wpm span");
let chars = document.querySelector(".chars");
let err = document.querySelector(".errors span");
let timerDisplay = document.querySelector(".timer span");

let sup = document.querySelector("sup");

let header = document.querySelector("header");
let aside1 = document.querySelector(".ranking-container");
let aside2 = document.querySelector(".profile");
let footer = document.querySelector("footer");
let wordError = document.querySelector(".word-error");

let body = document.querySelector("body");
let textBackground = document.querySelector("#background");

// logo type animation
var typed3 = new Typed('#typed', {
  strings: ['<span class="blue">T</span>op', '<span class="blue">T</span>ypist', '<span class="blue">T</span>op <span class="blue">T</span>ypist'],
  typeSpeed: 100,
  backSpeed: 100,
  // fadeOut: true,
  startDelay: 2000,
  cursorChar: '',
  smartBackspace: true
});

var typed4 = new Typed('#typed4', {
  strings: ['Share this app.'],
  typeSpeed: 100,
  backSpeed: 1000,
  fadeOut: true,
  startDelay: 1000,
  // loop: true,
  // smartBackspace: true
});

let texts =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officiis quos minus dignissimos veniam, eaque similique eligendi fugit suscipit rem. Omnis delectus reiciendis magni iure modi earum, sapiente totam rerum hic ullam at eum nobis, deserunt et dolorem consectetur laudantium, alias explicabo nulla. Ipsum impedit hic et perferendis qui quam officia sit quis veritatis nisi, eius magnam porro, veniam ullam explicabo rem quo fugiat libero distinctio asperiores ut. Commodi atque quidem nesciunt, deleniti, aspernatur dolore voluptatum dolorum eius velit dolor architecto placeat magni accusantium expedita fuga rerum aliquid vero repellat, nisi eum distinctio excepturi fugiat est. Delectus accusamus animi velit unde inventore at neque fugit blanditiis, incidunt, libero corporis eveniet doloremque, accusantium harum voluptatum dolor sed explicabo atque aperiam quam? Blanditiis cum dolores, consequatur culpa quasi fugit. Reprehenderit dignissimos harum placeat illum!".toLowerCase();

origText.classList.add("borderBlue");
let txet;
function shuffleAgain() {
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  let text = texts.split(" ")
  shuffle(text);
  // text.join(" ")
  txet = text.join(" ")
  txet.split("");
  textDisplay.innerHTML = "";
  for (let i = 0; i < txet.length; i++) {
    let textSpan = document.createElement("span");
    textSpan.innerText = txet[i];
    textDisplay.appendChild(textSpan);
  }
  
}

shuffleAgain();


// TIMER
let interval;
let timerRunning = false;

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  interval = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(interval);
      let finalScore = document.querySelector("#score span");
      finalScore.innerText = wordPerMinute;
      timeout();

      if (user !== null) {
        submitUserinfo();
        submitScore(wordPerMinute);
      }
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

let countup = 0;

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
  timerDisplay.innerHTML = display;

  countup = Math.abs(remainderSeconds - 60);
  countup = countup / 60;
  wordPerMinute = Math.floor(textInput.value.length / 5 / countup);
  wpm.innerText = wordPerMinute;
  if(wordPerMinute > 120) {
    restart();
    document.querySelector('.userWarning').style.display = 'block';
    setTimeout(() => {
      location.reload();
    }, 7000)
    
  }
}


// Start the timer:
function start() {
  if (!timerRunning) {
    timerRunning = true;
    timer(60);
  }
}

// when time's up
function timeout() {
  bodyClick();
  textInput.disabled = true;
  clickToFocus.style.display = "none";
  timesUp.style.display = "block";
  scoreModal.style.display = "block";

}

// add first span blinking effect
let errors = 0;
let characters = 0;
let wordPerMinute = 0;
let timer2 = timerDisplay.innerText;

let sampleError = false;
let sampleChar = false;

function displaySup() {
  sup.classList.add("sup");
  setTimeout(() => {
    sup.classList.remove("sup");
  }, 1000);
}

function spellCheck() {
  let arrayDisplayText = textDisplay.querySelectorAll("span");
  let arrayInputText = textInput.value.split("");

  // ----------saving error-------------------------------------------
  let textEntered = textInput.value;

  let textHide = document.querySelector("#textHide").innerHTML = txet.split("").join("");
  let originTextMatch = textHide.substring(0, textEntered.length);

  if (textEntered == originTextMatch) {
    characters++;
    sampleError = false;
  } else {
    if (textEntered != originTextMatch && sampleError == false) {
      sampleError = true;
      errors++;
      displaySup();
    }
  }
  err.innerText = errors;
  chars.innerText = characters;

  // -------------------------------------------------------
  for (let i = 0; i < arrayDisplayText.length; i++) {
    let inputText = arrayInputText[i];
    let displayText = arrayDisplayText[i];
    // adding blink effect
    let indexNum = textInput.value.length;
    let firstSpan = arrayDisplayText[indexNum];
    firstSpan.classList.add("blinking");

    if (inputText == null) {
      displayText.classList.remove("correct", "incorrect", "blinking");
      origText.classList.remove("borderBlue");
    } else if (inputText == displayText.innerText && indexNum > 0) {
      displayText.classList.remove("blinking", "blink");
      displayText.classList.add("correct");
      origText.classList.add("borderCorrect");
    } else {
      displayText.classList.remove("blinking");
      displayText.classList.add("incorrect", "blink");
      origText.classList.add("borderRed");
      origText.classList.remove("borderCorrect");
      textInput.value = textInput.value.substring(0, textInput.value.length - 1);
    }
  }
}

textInput.addEventListener("input", start, false);
textInput.addEventListener("input", spellCheck, false);

// add style when clicking textDiv
let startClick = event => {
  textInput.disabled = false;
  textInput.focus();
  
  let textSpan = textDisplay.querySelectorAll("span");
  let textInputLength = textInput.value.length;

  textBackground.classList.remove("background");
  clickToFocus.style.visibility = "hidden";

  textDisplay.style.opacity = "1";
  textSpan[textInputLength].style.color = "";
  textSpan[textInputLength].style.background = "";

  if (textInput.value == 0) {
    textSpan[0].classList.add("blinking");
    if (textSpan[0].classList.contains("incorrect")) {
      textSpan[0].classList.add("blink");

    }
  } else {
    textSpan[textInputLength].classList.add("blinking");
    if (textSpan[textInputLength].classList.contains("incorrect")) {
      textSpan[textInputLength].classList.add("blink");
    }
  }
};

// add style when clicking body except text div
function bodyClick() {
  textInput.disabled = true;
  let textSpan = textDisplay.querySelectorAll("span");
  let textInputLength = textInput.value.length;
  textDisplay.style.opacity = ".8";
  textBackground.classList.add("background");
  clickToFocus.style.visibility = "visible";

  textSpan[textInputLength].style.background = "#f4efef";
  textSpan[0].classList.remove("blinking");
  textSpan[textInputLength].classList.remove("blinking", "blink");
  if (textSpan[textInputLength].classList.contains("incorrect")) {
    textSpan[textInputLength].style.color = "#f2552c";
  }
};

clickToFocus.addEventListener("click", startClick);
body.addEventListener("click", bodyClick);


origText.onclick = event => {
  event.stopPropagation();
  textInput.focus();
};

// restart
let restartBtn = document.querySelector("#restart");
function restart() {
  // event.stopPropagation;
  shuffleAgain();
  clickToFocus.style.display = "block";
  timesUp.style.display = "none";
  textInput.disabled = false;
  origText.classList.remove("borderCorrect", "borderRed");
  origText.classList.add("borderBlue");
  clearInterval(interval);
  interval = null;
  timerRunning = false;
  timerDisplay.innerText = "1:00";
  textInput.value = "";
  wpm.innerText = "0";
  err.innerText = "0";
  chars.innerText = "0";
  errors = 0;
  characters = 0;
  wordPerMinute = 0;
  let textSpan = textDisplay.querySelectorAll("span");
  for (let i = 0; i < textSpan.length; i++) {
    textSpan[i].classList.remove("correct", "incorrect", "blinking", "blink");
    textSpan[i].style.color = "";
    textSpan[i].style.background = "";
  }
};
restartBtn.addEventListener('click', restart);

// help button
let helpbtn = document.querySelector('.help span:first-child')
let helpinfo = document.querySelector('.help span:last-child')
helpbtn.addEventListener('click', () => {
  if (helpinfo.style.display === "inline") {
    helpinfo.style.display = "none";
    helpbtn.style.color = "#02a6f2";
  } else {
    helpinfo.style.display = "inline";
    helpbtn.style.color = "#35424a";
  }
})

// prevent delete and backspace
function isValidKey(e) {
  let charCode = e.keyCode || e.which;
  if (charCode == 8 || charCode == 9) return false;

  return true;
}

// start shorcut key
document.onkeyup = (e) => {
  let charCode = e.keyCode || e.which;
  if (e.ctrlKey && charCode == 13) {
    startClick();
  }
};

// prevent opening dev tools to avoid cheating
document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
}

// score modal
let closeModal = document.querySelector("#closeModal");
scoreModal.onclick = () => {
  event.stopPropagation();
};

closeModal.onclick = event => {
  event.stopPropagation();
  scoreModal.style.display = "none";

};

// opening signin form
let signinButton = document.querySelector("#loginButton");
let siginModal = document.querySelector("#signinModal");
signinButton.onclick = () => {
  siginModal.style.display = "block";
}
// closing signin form
let closeSignin = document.querySelector('.closeBtn');
closeSignin.onclick = () => {
  siginModal.style.display = "none";
}

// sign out modal
document.querySelector('.cancelbtn').onclick = () => {
  document.querySelector('.signoutModal').style.display = 'none';
}
// sign out
document.querySelector('.yesbtn').onclick = () => {
  document.querySelector('.signoutModal').style.display = 'none';
  firebase.auth().signOut();
  restart();
  location.reload();
}
// open sign out modal
document.querySelector('#logoutBtn').onclick = () => {
  document.querySelector('.signoutModal').style.display = 'block';
}


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDjHH0EmjjzmHN0ovWc1V1_ctUwPlmqLc4",
  authDomain: "thetoptypist.firebaseapp.com",
  databaseURL: "https://thetoptypist.firebaseio.com",
  projectId: "thetoptypist",
  storageBucket: "thetoptypist.appspot.com",
  messagingSenderId: "810639451867",
  appId: "1:810639451867:web:195e61291124b1409b0efe",
  measurementId: "G-LN199XNNSJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebase.auth().onAuthStateChanged(function (user) {

  var noUserBtn = document.getElementById('noUserBtn');
  var loginUserBtn = document.getElementById('loginUserBtn');
  if (user) {
    // User is signed in.

    signedOut.style.display = 'none';
    signedIn.style.display = 'block';

    user = firebase.auth().currentUser;
    if (user !== null) {
      document.getElementById('userName').innerHTML = user.displayName;
      document.getElementById('avatarImg').src = user.photoURL;
    }

  } else {
    // No user is signed in.
    signedOut.style.display = 'block';
    signedIn.style.display = 'none';
  }
});

// Submit form
function submitUserinfo() {
  // e.preventDefault();
  // Get value
  var user = firebase.auth().currentUser;
  var userId = user.uid;
  var name = user.displayName;
  name = (name.split(' '))[0];
  var userAvatar = user.photoURL;
  // Save message
  writeUserData(userId, name, userAvatar);
}

// save the user's profile into Firebase so we can list users,
function writeUserData(userId, name, userAvatar) {
  firebase.database().ref('users/' + userId + '/userInfo').update({
    username: name,
    userPhoto: userAvatar,
    id: randomId(userId + 'TT')
  }, function (error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
}

// Submit form
function submitScore(wordPerMinute) {
  // e.preventDefault();
  // Get value
  var user = firebase.auth().currentUser;
  var userId = user.uid;

  var score = wordPerMinute;

  // Save message
  writeUserScore(userId, score);
}

// save the user's profile into Firebase so we can list users,
function writeUserScore(userId, score) {
  firebase.database().ref('users/' + userId + '/userScore').update({
    score: score,
  }, function (error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
}


// Reference messages collection
var database = firebase.database();

var ref = database.ref('users/');
ref.orderByChild('score').on('value', gotData, errData);

function gotData(data) {
  var _ol = document.getElementsByTagName('ol')[0];
  var _content = '';

  data.forEach( function (child) {
    _content += "<li id='" + child.val().userInfo.id + "'><img src='" + child.val().userInfo.userPhoto + "' width='30' height='30' style='margin-right:5px;border-radius:5px;'>" + child.val().userInfo.username + "<span></span>" + child.val().score + "</li>";

  });
  _ol.innerHTML = _content;
  // Reverse the list items
  var players = document.querySelector("#players");
  var playerList = players.getElementsByTagName("li");
  for (var i = playerList.length - 1; i >= 0; i--) {
    players.appendChild(playerList[i]);
  }

  user = firebase.auth().currentUser;
  if (user !== null) {

    var userId = user.uid;
    firebase.database().ref('/users/' + userId + '/').once('value').then(function (snapshot) {
      var highestScore = (snapshot.val() && snapshot.val().score) || '0';
      var idd = (snapshot.val() && snapshot.val().userInfo.id) || '0';
      // ...
      document.getElementById('highestScore').innerHTML = highestScore;

      let items = document.getElementsByTagName("li");
      let currentRank = document.querySelector('#currentRank');
      for (i = 0; i < items.length; i++) {
        if (idd == items[i].id) {
          let rank = i + 1;

          var j = rank % 10,
            k = rank % 100;
          if (j == 1 && k != 11) {
            return currentRank.innerHTML = rank + "<sup>st</sup>";
          }
          if (j == 2 && k != 12) {
            return currentRank.innerHTML = rank + "<sup>nd</sup>";
          }
          if (j == 3 && k != 13) {
            return currentRank.innerHTML = rank + "<sup>rd</sup>";
          }
          return currentRank.innerHTML = rank + "<sup>th</sup>";
        }
        else {
          currentRank.innerHTML = "?";
        }
      }
    });
    
  }
};

function errData(err) {
  console.log('Error!');
  console.log(err);
}

// get random Id
function randomId(id) {
  let randomId = id.split('');
  for (let i = 0; i < randomId.length - 1; i++) {
    let j = Math.floor(Math.random() * randomId.length);
    let temp = randomId[i];
    randomId[i] = randomId[j]
    randomId[j] = temp;
  }
  return randomId.join('')
}



// Submit form
function submitUserinfo() {
  // e.preventDefault();
  // Get value
  var user = firebase.auth().currentUser;
  var userId = user.uid;
  var name = user.displayName;
  name = (name.split(' '))[0];
  var userAvatar = user.photoURL;
  // Save message
  writeUserData(userId, name, userAvatar);
}

// save the user's profile into Firebase so we can list users,
function writeUserData(userId, name, userAvatar) {
  firebase.database().ref('users/' + userId + '/userInfo').update({
    username: name,
    userPhoto: userAvatar,
    id: randomId(userId + 'TT')
  }, function (error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
}

// Submit form
function submitScore(wordPerMinute) {
  // e.preventDefault();
  // Get value
  var user = firebase.auth().currentUser;
  var userId = user.uid;

  var score = wordPerMinute;

  // Save message
  writeUserScore(userId, score);
}

// save the user's profile into Firebase so we can list users,
function writeUserScore(userId, score) {
  firebase.database().ref('users/' + userId).update({
    score: score,
  }, function (error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
}




// ------------ redirect to preventcheat page when devtools is open to avoid cheating --------
// var element = new Image();
// Object.defineProperty(element, 'id', {
//   get: function () {
//     /* TODO */
//     window.location.href = 'preventcheat.html';
//   }
// });
// console.log('%cHello', element);


