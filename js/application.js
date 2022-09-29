// Wait till the browser is ready to render the game (avoids glitches)
const socket = io("https://salty-mat-2048-7w5xp7g4p4fx6q9-3000.githubpreview.dev/")
//const ip = prompt("endter ip")
//const socket = io(ip);
let userName = "guest";


window.requestAnimationFrame(function () {
  //userName = prompt("Enter your name: ");
  
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  new GameManagerP2(4, HTMLActuatorP2, LocalStorageManager);
  

});
