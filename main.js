// initialization -------------------------------------------------------------

const buttonThen = document.querySelector('.buttonThen');
const buttonCallBack = document.querySelector('.buttonCallBack');
const buttonPromise = document.querySelector('.buttonPromise');
const buttonAsync = document.querySelector('.buttonAsync');

const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
  
const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
};
  
  const alice1 = document.querySelector("#alice1");
  const alice2 = document.querySelector("#alice2");
  const alice3 = document.querySelector("#alice3");
  
  
  

// callback hell version -----------------------------------------
  
  

  function tumbleAlice() {
   
    
    const showAnimateObject = alice1.animate(aliceTumbling, aliceTiming);

    let interval = 2001;
    
    setTimeout(() => {
      const showAnimateObject2 = alice2.animate(aliceTumbling, aliceTiming);
      
      const interval1 = 2001;
      
      setTimeout(() => {
        const showAnimateObject3 = alice3.animate(aliceTumbling, aliceTiming);
        
      }, 2001);

    }, interval);
  };

// .then() hell version ---------------------------------------------
function tumbleAliceThen() {
  const showAnimateObject = alice1.animate(aliceTumbling, aliceTiming);
  const promise1 = Promise.resolve(showAnimateObject.finished);
    
    promise1.then(() => {
      const showAnimateObject2 = alice2.animate(aliceTumbling, aliceTiming);  
      const promise2 = Promise.resolve(showAnimateObject2.finished);
        
        promise2.then(() => {
          const showAnimateObject3 = alice3.animate(aliceTumbling, aliceTiming);
        });
    });

  
    
};

  

// promise version ----------------------------------------------------

function tumbleAliceProm() {
  
  const showAnimateObject = alice1.animate(aliceTumbling, aliceTiming);

  const launch = showAnimateObject.finished;
    
  launch.then(() => {
      
    const showAnimateObject2 = alice2.animate(aliceTumbling, aliceTiming);
    return showAnimateObject2.finished;
  })

  .then(() => {
    const showAnimateObject3 = alice3.animate(aliceTumbling, aliceTiming);
  });

};

// async version -----------------------------------------------------

async function tumbleAliceAsync() {
  
  
  const showAnimateObject = alice1.animate(aliceTumbling, aliceTiming);
  await showAnimateObject.finished;
  const showAnimateObject2 = alice2.animate(aliceTumbling, aliceTiming);
  await showAnimateObject2.finished;
  const showAnimateObject3 = alice3.animate(aliceTumbling, aliceTiming);
   
};

// button Set ----------------------------------------------------------
buttonThen.addEventListener('click', tumbleAliceThen);
buttonCallBack.addEventListener('click', tumbleAlice);
buttonPromise.addEventListener('click', tumbleAliceProm);
buttonAsync.addEventListener('click', tumbleAliceAsync);

  
    
    
    
    

