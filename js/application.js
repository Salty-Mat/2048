// Wait till the browser is ready to render the game (avoids glitches)
const socket = io("localhost:8080");

window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  new GameManagerP2(4, HTMLActuatorP2, LocalStorageManager);
});
