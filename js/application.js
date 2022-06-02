// Wait till the browser is ready to render the game (avoids glitches)
const socket = io("ws://localhost:3000");


window.requestAnimationFrame(async function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  new GameManagerP2(4, HTMLActuatorP2, LocalStorageManager);
  const res = await fetch("http://localhost:3000/count"); 
  const json = await res.json();
  const test = await json 
  console.log(test)
});
