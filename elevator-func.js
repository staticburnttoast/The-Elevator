let currentFloor = "Main Lobby";
  let lobbyButtonSpam = 0;
  let elevatorButtonSpam = 0;
  let elevatorGirlClicks = 0;
  let isAnnoyed = false;

  document.addEventListener('DOMContentLoaded', function () {
    currentFloor = localStorage.getItem('currentFloor') || 'Main Lobby';
    document.querySelector('.container h1').textContent = currentFloor;
  });

  function selectFloor(floor) {
    if (isAnnoyed) return;

    const floorNames = {
      "floor4": "4th Floor",
      "floor3": "3rd Floor",
      "floor2": "2nd Floor",
      "lobby": "Main Lobby",
      'basement': '???'
    };

    currentFloor = floorNames[floor];
    document.querySelector('.container h1').textContent = currentFloor;
    document.querySelectorAll('.button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(floor).classList.add('selected');

    if (floor === 'lobby') {
      lobbyButtonSpam++;
      elevatorButtonSpam = 0;
      if (lobbyButtonSpam >= 10) {
        unlockBasement();
      }
    } else {
      elevatorButtonSpam++;
      isElevatorGirlAnnoyed();
    }

    const button = document.getElementById(floor);
    button.classList.add('selected');
    setTimeout(() => button.classList.remove('selected'), 500);
  }

  function leaveElevator() {
    if (isAnnoyed) return;

    const exitElevator = {
      "Main Lobby": "lobby",
      "2nd Floor": "floor2",
      "3rd Floor": "floor3",
      "4th Floor": "floor4",
      "???": "basement"
    }

    window.location.href = exitElevator[currentFloor] + ".html";
  }

  function unlockBasement() {
    let panel = document.querySelector('.elevator-panel');
    if (!document.getElementById('basement')) {
      let basementButton = document.createElement('button');
      basementButton.id = 'basement';
      basementButton.classList.add('button');
      basementButton.textContent = '?';
      basementButton.onclick = () => selectFloor('basement');
      panel.appendChild(basementButton);
    }
  }

  function elevatorGirlFloorArrival() {
    if (isAnnoyed) return;

    let girlImg = document.querySelector('.elevator-girl');
    let speechBubble = document.getElementById('speech-bubble');

    if (!speechBubble) {
      speechBubble = document.createElement('div');
      speechBubble.id = 'speech-bubble';
      speechBubble.classList.add('speech-bubble');
      document.querySelector('.elevator-container').appendChild(speechBubble);
    }

    elevatorGirlClicks = 0;
    isAnnoyed = false;

    girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_yap.png';
    speechBubble.textContent = 'You have arrived at the ' + currentFloor + '.';

    setTimeout(() => {
      girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_neutral.png';
      speechBubble.remove();
    }, 2000);
  }

  function elevatorGirlFloorInfo() {
    if (isAnnoyed) return;
    elevatorGirlClicks++;

    let girlImg = document.querySelector('.elevator-girl');
    let speechBubble = document.getElementById('speech-bubble');

    if (!speechBubble) {
      speechBubble = document.createElement('div');
      speechBubble.id = 'speech-bubble';
      speechBubble.classList.add('speech-bubble');
      document.querySelector('.elevator-container').appendChild(speechBubble);
    }

    const floorInfo = {
      "Main Lobby": "This is the main lobby. Not much to see here if I'm being honest. You can step outside if you want, just don't wander too far.",
      "2nd Floor": "This floor contains information about the creator of this website. It has information like his personal and school life, which honestly isn't that interesting to read. But don't take it from me though because I've read it a million times.",
      "3rd Floor": "This floor contains information about this website. You're not gonna find anything about me in here though, so don't bother looking.",
      "4th Floor": "This floor contains information about whatever images or assets that were used in this website that the creator does not own. That doesn't apply to me because I'm all natural. Sounds weird coming from an image on a screen, right? But there's no way in hell I'm saying 'I belong to my creator' or something like that. That's just weird.",
      "???": "I didn't even know we had a basement. If you're going in there then have fun, I guess."
    };

    let dialogue = floorInfo[currentFloor];

    girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_yap.png';
    speechBubble.textContent = dialogue;

    if (elevatorGirlClicks >= 10) {
      isAnnoyed = true;
      girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_frown.png';
      speechBubble.textContent = "Please don't touch me like that.";
      
      setTimeout(() => {
        isAnnoyed = false;
        speechBubble.remove();
    }, 3000);
  }

    setTimeout(() => {
      girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_neutral.png';
      speechBubble.remove();
    }, 10000);
  }

  function isElevatorGirlAnnoyed() {
    if (elevatorButtonSpam >= 10) {
      isAnnoyed = true;
      let girlImg = document.querySelector('.elevator-girl');
      let speechBubble = document.getElementById('speech-bubble');

      if (!speechBubble) {
        speechBubble = document.createElement('div');
        speechBubble.id = 'speech-bubble';
        speechBubble.classList.add('speech-bubble');
        document.querySelector('.elevator-container').appendChild(speechBubble);
      }

      girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_frown.png';
      speechBubble.textContent = "Please stop messing with the elevator buttons.";

      setTimeout(() => {
        isAnnoyed = false;
        elevatorButtonSpam = 0;
        speechBubble.remove();
        girlImg.src = 'https://USERNAME.github.io/REPO/resources/elevator-girl/elevator_girl_neutral.png';
      }, 3000);
    }
  }