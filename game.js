// load all contents...
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 3;
  const settingsBtn = document.querySelector("#settingsBtn");
  const settings = document.querySelector(".settings");
  const content = document.querySelector(".content");
  const alert = document.querySelector("h2");
  const restart = document.getElementById("restart"); // restart button.
  const computer = document.getElementById("computer"); //computer play button.
  const user = document.getElementById("user"); // user play button.
  const xP = document.getElementById("xp"); // X score.
  const oP = document.getElementById("op"); // O score.
  const body = document.querySelector("body"); // body
  const darkLightMode = document.querySelector(".dark-mode"); // dark mode.
  const checkBox = document.querySelector("input#checkboxA"); // sound check box input.
  let darkModeText = document.querySelector(".dark-mode > p"); // dark mode text.
  let darkModsIcons = document.querySelector(".dark-mode  .icons"); //dark mode icon.
  let soundsText = document.querySelector(".sounds > p"); // sound text.
  let aboutBody = document.querySelector("#about-us"); //about uss body.
  let aboutCloseBtn = document.querySelector("#about-us button"); // about close button.
  let about = document.querySelector(".about"); // about button.
  let checkBoxB = document.querySelector("input#checkboxB"); //  fullscreen checkbox input.
  let xoChoose = false; // 'x' or 'o' change default.
  let userPlay = false; // user play button default.
  let computerPLay = true; // computer play mode default.
  let gameStart = true; // game start default.
  let gameRestart = false; // game restart button default.
  let botPlay = false; // computer play button default.
  let stablePlay = false; // stable play default.
  let userPoints = true; // user high score  point default.
  let pointCounter = false; // point Counter , Default.
  // game sounds...
  let muted = false;

  // adding game board...
  function gameBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
    }
    // X or O Choose alert
    alert.style.opacity = 1;
    alert.innerText =
      "🙃Please choose '1v1; Or 'Computer' mode And also enable fullscreen ☑️";
  }
  //when page is loaded call game board function.
  gameBoard();
  // dark mode is enable  on loading...
  if (typeof Storage !== "undefined") {
    if (localStorage.darkMode === "false") {
      darkModeText.innerText = "Light Mode";
      darkModsIcons.setAttribute("class", "bi-brightness-high");
      body.setAttribute("id", "dark-mode");
    } else {
      darkModeText.innerText = "Dark Mode";
      darkModsIcons.setAttribute("class", "bi-moon-stars");
      body.removeAttribute("id", "dark-mode");
    }
  } else {
    console.log(" Sorry! No Web Storage support..");
  }
  // settings menu options.
  settingsBtn.addEventListener("click", () => {
    if (settings.style.display === "none") {
      settings.style.display = "block";
    } else {
      settings.style.display = "none";
      aboutBody.style.display = "none";
    }
  });
  // hide settings menu when click outside.
  content.addEventListener("click", () => {
    if (settings.style.display === "block") {
      settings.style.display = "none";
      aboutBody.style.display = "none";
    }
  });

  // dark mode toggle.
  darkLightMode.addEventListener("click", () => {
    localStorage.darkMode = body.hasAttribute("id");
    // remove dark mode.
    if (body.hasAttribute("id")) {
      darkModeText.innerText = "Dark Mode"; // text
      darkModsIcons.setAttribute("class", "bi-moon-stars"); // icon
      body.removeAttribute("id");
    } else {
      // add dark mode.
      darkModeText.innerText = "Light Mode";
      darkModsIcons.setAttribute("class", "bi-brightness-high");
      body.setAttribute("id", "dark-mode");
    }
  });
  // sounds enable on loading...
  if (typeof Storage !== "undefined") {
    if (localStorage.checkBox === "true") {
      soundsText.innerText = "Sound On";
      checkBox.checked = true;
      muted = false;
    } else {
      soundsText.innerText = "Sound Off";
      checkBox.checked = false;
      muted = true;
    }
  }
  // sounds on off button.
  checkBox.addEventListener("click", () => {
    localStorage.checkBox = checkBox.checked;
    if (checkBox.checked === true) {
      soundsText.innerText = "Sound On";
      muted = false;
    } else {
      soundsText.innerText = "Sound Off";
      checkBox.checked = false;
      muted = true;
    }
  });

  // fullscreen button.
  var el = document.documentElement;
  checkBoxB.addEventListener("click", () => {
    localStorage.checkBoxB = checkBoxB.checked;
    // add full screen, if document is window mode.
    if (checkBoxB.checked === true && !document.fullscreenElement) {
      el.requestFullscreen();
    }
    // exit full screen, if document is full screen mode.
    else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });

  // about close
  aboutCloseBtn.addEventListener("click", () => {
    if (aboutBody.style.display === "block") {
      aboutBody.style.display = "none";
    }
  });
  // about us
  about.addEventListener("click", () => {
    if (aboutBody.style.display === "none") {
      aboutBody.style.display = "block";
    } else {
      aboutBody.style.display = "none";
    }
  });

  // GAME SECTIONS...
  // when reload, user score load again...
  if (Number(localStorage.winCountX) >= 0) {
    xP.innerHTML = "X : " + localStorage.winCountX;
  }
  if (Number(localStorage.winCountO) >= 0) {
    oP.innerHTML = "O : " + localStorage.winCountO;
  }
  // user play button.
  user.addEventListener("click", () => {
    user.style.backgroundColor = "var(--button-color-0)"; // add user pay button color before active user mode.
    user.style.color = "var(--pry-text-color-5)"; /// add user play button active color.
    restart.style.backgroundColor = "var(--pry-color-2)"; // restart button bg old color.
    restart.style.color = "var(--pry-text-color)"; // restart button old color.
    if (!userPlay) {
      gameStart = false; //game is started.
      // xoChoose = true; // 'x' or 'o' button disable.
      computerPLay = true; // computer play mode off.
      botPlay = true; // computer click button disable.
      userPlay = true; // user play button disable.
      pointCounter = false; // user point count enable.
      user.style.backgroundColor = "var(--button-color-1)"; // user button bg color.
      // x or o choose control.
      if (typeof Storage !== "undefined") {
        xoChoose = true; // 'x' or 'o' button enable.
        alert.innerText = "👍Please Choose 'X' or 'O'.";
        // // 'x' or 'o'  choose button disable.
        if (
          xoChoose === true &&
          userPoints === true &&
          Number(localStorage.winCountX) >= 1
        ) {
          xoChoose = false; // 'x' or 'o' button enable.
          alert.innerText =
            "👍Please Choose 'X' or 'O' on higher points reached.🌚";
        }
        // // 'x' or 'o'  choose button disable.
        if (
          xoChoose === true &&
          userPoints === true &&
          Number(localStorage.winCountO) >= 1
        ) {
          xoChoose = false; // 'x' or 'o' button enable.
          alert.innerText =
            "👍Please Choose 'X' or 'O' on higher points reached.🌚";
        }
      }
      // user point control.
      else if (!userPoints) {
        xoChoose = true; // 'x' or 'o' button enable.
        alert.innerText = "👍Please Choose 'X' or 'O'.";
        userPoints = true; // user points disable.
      } else {
        xoChoose = false; // 'x' or 'o' button disable.
      }
    }
  });
  // computer play button.
  computer.addEventListener("click", () => {
    computer.style.backgroundColor = "var(--button-color-0)"; // add computer play button bg color before active computer mode.
    computer.style.color = "var(--pry-text-color-5)"; /// add computer play button active computer mode.
    restart.style.backgroundColor = "var(--pry-color-2)"; // restart button bg old color.
    restart.style.color = "var(--pry-text-color)"; // restart button old color.
    if (!botPlay) {
      computer.style.backgroundColor = "var(--button-color-2)"; // computer play button color.
      gameStart = false; // game is started.
      computerPLay = false; // computer play ON.
      userPlay = true; // user play stop when computer play on.
      botPlay = true; // computer button stop.
      stablePlay = false; // auto pick enable.
      gameRestart = true; // game restart disable.
      pointCounter = true; // user point count disable.
      computerPick(); // call computer pick fun and add first 'x' or 'o'.
      localStorage.removeItem("winCountX"); // clear user score.
      localStorage.removeItem("winCountO"); // clear user score.
      alert.innerText = " User And Computer Play mode [ 👤 vs 🤖 ].";
      oP.innerHTML = "O : 00"; // clear x point.
      xP.innerHTML = "X : 00"; // clear o point.
    }
  });
  // Restart button.
  restart.addEventListener("click", () => {
    restart.style.backgroundColor = "var(--button-color-3)"; // restart button bg new color.
    restart.style.color = "var(--pry-text-color-5)"; // restart button new color.
    user.style.backgroundColor = "var(--pry-color-2)"; // user button bg old color.
    user.style.color = "var(--pry-text-color)"; // user button old color.
    computer.style.backgroundColor = "var(--pry-color-2)"; // computer button bg old color.
    computer.style.color = "var(--pry-text-color)"; // computer button old color.
    divBox.forEach((el) => {
      if (!gameRestart && el.innerText !== "") {
        el.innerText = ""; // clear all inner text(blank).
        xoChoose = false; // 'x' or 'o' choose button enable.
        userPlay = false; // user play button enable.
        botPlay = false; // computer play button enable.
        stablePlay = false; // auto pick enable.
        pointCounter = true; // user point count disable.
        alert.innerText = "🙃Please choose '1v1; Or 'Computer' mode....";
        // set new background color for all div  boxes.
        for (let a = 0; a < 9; a++) {
          divBox[a].style.backgroundColor = "var(--pry-color-2)";
          divBox[a].style.color = "var(--pry-color)";
        }
      }
    });
  });
  // Add X or O on Click
  var divBox = document.querySelectorAll(".grid  div");
  let XO = "X"; // default.
  // add forEach method to change div element inner text when click.
  divBox.forEach((el) => {
    el.innerHTML = "";
    el.addEventListener("click", () => {
      // 1v1 play mode.
      if (!gameStart && el.innerHTML === "" && computerPLay === true) {
        // game sounds.
        if (XO == "X" && !muted) {
          var clickSoundX = new Audio("./sounds/select-1.wav"); // click sound.
          clickSoundX.play();
        } else if (!muted) {
          var clickSoundO = new Audio("./sounds/select-2.wav"); // click sound.
          clickSoundO.play();
        }
        el.style.backgroundColor = "#747b84"; //div box click bg color.
        el.innerHTML = XO; // change boxes inner text
        alert.innerText = "Game is Started...🎮 ";
        userPlay = true; // user play button disable.
        xoChoose = false; // X,O choose option
        gameRestart = true; // restart button disable
        changeXo(); // X,O changing
        winningCheck(); // check winning
        checkDraw(); // check draw chance.
      }
      // user to computer play mode.
      if (!gameStart && el.innerHTML === "" && !computerPLay && !stablePlay) {
        // game sounds.
        if (XO == "X" && !muted) {
          var clickSoundX = new Audio("./sounds/select-1.wav"); // click sound.
          clickSoundX.play();
        } else if (!muted) {
          var clickSoundO = new Audio("./sounds/select-2.wav"); // click sound.
          clickSoundO.play();
        }
        el.style.backgroundColor = "#747b84"; //div box click bg color.
        el.innerHTML = XO; // add 'x' or 'o'.
        changeXo(); // change 'x' or 'o'.
        winningCheck(); // check winning
        checkDraw(); // check draw chance.
        stablePlay = true; // stable play disable, prevent extra clicks.
        autoPick(); // automatic 'x' or 'o' pick.
        setTimeout(() => {
          alert.innerText = "Computer choose: " + XO;
        }, 500);
      }
    });
  });

  function autoPick() {
    // prevent extra computer picks and playing.
    if ((stablePlay = true)) {
      // add time to add auto 'x' or 'o'.
      setTimeout(() => {
        computerPick(); // computer pick
      }, 1400);
    }
  }

  // Change  X or O on Clicking
  function changeXo() {
    if (XO === "X") {
      XO = "O";
    } else {
      XO = "X";
    }
  }
  // select X or O on game start
  let x = document.getElementById("X");
  let o = document.getElementById("O");
  // X,O Click functions
  // click 'X'.
  x.addEventListener("click", () => {
    if (xoChoose === true) {
      if (!muted) {
        var xoSound = new Audio("./sounds/select-1.wav"); // click sound.
        xoSound.play();
      }
      XO = "X";
      alert.innerText = "You choose:- X and score is reset";
      // clear all current points.
      localStorage.removeItem("winCountX"); // clear user score.
      localStorage.removeItem("winCountO"); // clear user score.
      xP.innerHTML = "X : 00";
      oP.innerHTML = "O : 00";
    }
  });
  // click 'O'.
  o.addEventListener("click", () => {
    if (xoChoose === true) {
      if (!muted) {
        var xoSound = new Audio("./sounds/select-2.wav"); // click sound.
        xoSound.play();
      }
      XO = "O";
      alert.innerText = "You choose:- O and score is reset";
      // clear all current points.
      localStorage.removeItem("winCountX"); // clear user score.
      localStorage.removeItem("winCountO"); // clear user score.
      oP.innerHTML = "O : 00";
      xP.innerHTML = "X : 00";
    }
  });

  // check if win...
  function winningCheck() {
    // winning formations...
    let winningFormula = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [6, 4, 2],
      [0, 4, 8],
    ];
    // find the match box for example box-0 = x box-1= x box-2 = x.
    for (var i = 0; i < winningFormula.length; i++) {
      // check all formations.
      let valueA = divBox[winningFormula[i][0]].innerHTML;
      let valueB = divBox[winningFormula[i][1]].innerHTML;
      let valueC = divBox[winningFormula[i][2]].innerHTML;
      // if formation is true.
      if (valueA != "" && valueA === valueB && valueA === valueC) {
        console.log(valueA); //dleeee
        if (!muted) {
          var winSound = new Audio("./sounds/win-1.wav"); // game win music sound.
          winSound.play();
        }

        // add new background color in all div boxes.
        for (let c = 0; c < 9; c++) {
          divBox[c].style.backgroundColor = "var(--pry-color-5)";
          divBox[c].style.color = "#282828;";
        }
        // then set new winner div boxes background color only.
        for (let x = 0; x < 3; x++) {
          divBox[winningFormula[i][x]].style.backgroundColor =
            "var(--pry-color-6)";
          divBox[winningFormula[i][x]].style.color = "var(--pry-text-color-5)";
          divBox[winningFormula[i][x]].innerText = valueA;
        }
        computerPLay = true; // computer play mode disable.
        gameRestart = false; //restart button enable.
        gameStart = true; // game start false.
        userPlay = true; // user play button disable.
        botPlay = true; //computer play button disable.
        stablePlay = true; // stop extra pick.
        userPoints = true; // user higher score point, and disable xo changing too.
        // alert
        alert.innerText = "🏆" + "The Winner is : " + valueA;
        //Add X or O  Winning Points.
        if (valueA === "X") {
          if (!pointCounter) {
            // call 'X' points calculator.
            pointSystemX();
            // add 'X' points in score board.
            xP.innerHTML = "X : " + localStorage.winCountX;

            // higher 'X' score  points check and alerts.
            if (Number(localStorage.winCountX) === 10) {
              // game sounds.
              if (!muted) {
                var winSoundA = new Audio("./sounds/bonus-1.wav"); // click sound.
                winSoundA.play();
              }
              userPoints = false; // user points enable, and enable xo changing too.
              alert.innerText = " 🏆10 points❗";
            }
            if (Number(localStorage.winCountX) === 50) {
              if (!muted) {
                var winSoundB = new Audio("./sounds/bonus-2.wav"); // click sound.
                winSoundB.play();
              }
              userPoints = false; // user points enable, and enable xo changing too.
              alert.innerText = " 🏆50 points❗";
            }

            if (Number(localStorage.winCountX) === 99) {
              // clear all score.
              if (!muted) {
                var winSoundC = new Audio("./sounds/bonus-3.wav"); // click sound.
                winSoundC.play();
              }
              localStorage.removeItem("winCountX"); // clear user score.
              localStorage.removeItem("winCountO"); // clear user score.
              alert.innerText = "🎉Congratulations, You achieve 99 Points...";
              userPoints = false;
              xP.innerHTML = "X : 00";
              oP.innerHTML = "O : 00";
            }
          }
        } else {
          if (!pointCounter) {
            // call 'O' points calculator.
            pointSystemO();
            // add 'O' points in score board.
            oP.innerHTML = "O : " + localStorage.winCountO;
            // higher 'O' score  points check and alerts.
            if (Number(localStorage.winCountO) === 10) {
              // game sounds.
              if (!muted) {
                var winSoundA = new Audio("./sounds/bonus-1.wav"); // click sound.
                winSoundA.play();
              }
              userPoints = false; // user points enable, and enable xo changing too.
              alert.innerText = " 🏆10 points❗";
            }

            if (Number(localStorage.winCountO) === 50) {
              if (!muted) {
                var winSoundB = new Audio("./sounds/bonus-2.wav"); // click sound.
                winSoundB.play();
              }
              userPoints = false; // user points enable, and enable xo changing too.
              alert.innerText = " 🏆50 points❗";
            }
            if (Number(localStorage.winCountO) === 99) {
              if (!muted) {
                var winSoundC = new Audio("./sounds/bonus-3.wav"); // click sound.
                winSoundC.play();
              }
              // clear all score.
              localStorage.removeItem("winCountX"); // clear user score.
              localStorage.removeItem("winCountO"); // clear user score.
              alert.innerText = "🎉Congratulations, You achieve 99 Points...";
              userPoints = false;
              oP.innerHTML = "O : 00";
              xP.innerHTML = "X : 00";
            }
            console.log("o"); //dellll
          }
        }
        setTimeout(() => {
          alert.innerText = "Please Restart the Game...❗";
        }, 1000);
        console.log("win"); //delll
      }
    }
  }

  // Check if Draw...
  function checkDraw() {
    if (!gameStart) {
      let draw = true; // default
      // check all boxes inner content is blank
      divBox.forEach((el) => {
        if (el.innerHTML === "") {
          draw = false; // draw status false.
        }
      });
      // all element is not blank, choose as draw.
      // draw true
      if (draw === true) {
        if (!muted) {
          var drawSounds = new Audio("./sounds/fail-1.wav"); // game draw music sound.
          drawSounds.play();
        }
        gameStart = true; // game not start.
        gameRestart = false; // game restart button active.
        userPlay = true; // user play button disable.
        computerPLay = true; // computer play mode disable.
        botPlay = true; //computer play button disable.
        stablePlay = true; // prevent extra pick.
        userPoints = true; // user higher score points disable, and stop xo changing too.
        alert.innerText = "📍 Match is Draw !...";
        for (let d = 0; d < 9; d++) {
          divBox[d].style.backgroundColor = "var(--pry-color-4)";
        }
        setTimeout(() => {
          alert.innerText = "Please Restart the Game...❗";
        }, 1000);
        console.log("draw"); //// delll
      }
    }
  }
  // computer mode
  function computerPick() {
    if (!gameStart && !computerPLay) {
      // game sounds.
      if (XO == "X" && !muted) {
        var clickSoundX = new Audio("./sounds/select-1.wav"); // click sound.
        clickSoundX.play();
      } else if (!muted) {
        var clickSoundO = new Audio("./sounds/select-2.wav"); // click sound.
        clickSoundO.play();
      }
      randomGenerate(); // pick random X or O.
      changeXo(); // X,O changing.
      winningCheck(); // check winning.
      checkDraw(); // check draw.
      stablePlay = false; // stable play enable..
    }
  }
  // random X or O add function.
  function randomGenerate() {
    var randomPick = Math.floor(Math.random() * 9); // random num generating...
    if (divBox[randomPick].innerHTML === "") {
      divBox[randomPick].style.backgroundColor = "#747b84"; //add div box bg color.
      divBox[randomPick].innerHTML = XO; // add X or O On random.
      console.log("ok"); // deeee
    } else {
      console.log("not ok");
      randomGenerate(); // call function again when if condition not true..
    }
  }

  function pointSystemX() {
    if (typeof Storage !== "undefined") {
      //if local storage support.
      if (localStorage.winCountX) {
        // increase x points and stored in locally.
        localStorage.winCountX = Number(localStorage.winCountX) + 1;
      } else {
        localStorage.winCountX = 1;
      }
    } else {
      // Web Storage not support..
      console.log(" Sorry! No Web Storage support..");
    }
  }

  function pointSystemO() {
    if (typeof Storage !== "undefined") {
      //if local storage support.
      if (localStorage.winCountO) {
        // increase o points and stored in locally.
        localStorage.winCountO = Number(localStorage.winCountO) + 1;
      } else {
        localStorage.winCountO = 1;
      }
    } else {
      // Web Storage not support..
      console.log(" Sorry! No Web Storage support..");
    }
  }
});
