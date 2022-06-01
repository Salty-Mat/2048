// Wait till the browser is ready to render the game (avoids glitches)
const socket = io("ws://localhost:3000");
const user = fetch("http://localhost:3000/count").then(res => res.json());

window.requestAnimationFrame(function () {
  console.log(user)
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  new GameManagerP2(4, HTMLActuatorP2, LocalStorageManager);
});
