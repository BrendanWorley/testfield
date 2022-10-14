const squareNumber = document.querySelector("#number3");

const result2 = document.querySelector(".result2");

if (!!window.SharedWorker) {
  const myWorker = new SharedWorker("workerholder/worker.js");

  squareNumber.onchange = function () {
    myWorker.port.postMessage([squareNumber.value, squareNumber.value]);
    console.log("Message posted to worker");
  };

  myWorker.port.onmessage = function (event) {
    result2.textContent = event.data;
    console.log("Message received from worker");
  };
}