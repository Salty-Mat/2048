// Wait till the browser is ready to render the game (avoids glitches)
//const socket = io("ws://localhost:3000")
//const ip = prompt("endter ip")
const socket = io("ws://localhost:3000");
let userName = "guest";


window.requestAnimationFrame(function () {
  //userName = prompt("Enter your name: ");
  
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  new GameManagerP2(4, HTMLActuatorP2, LocalStorageManager);
  

});
