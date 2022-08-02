const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageSet = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
/* Looping through images */
imageSet.forEach(fileName => {
   const newImage = document.createElement('img');
   newImage.setAttribute('src', `images/${fileName}`);
   thumbBar.appendChild(newImage);
})
//assignment of new images to the display img field---------------------
function assignment(e) {
   displayedImage.setAttribute('src', `${e.target.getAttribute('src')}`)
}
thumbBar.addEventListener('click', assignment);

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
   if (overlay.style.backgroundColor === `rgba(0, 0, 0, 0)` || overlay.style.backgroundColor === ``) {
      overlay.style.backgroundColor = `rgba(200, 200, 200, 1)`;
   } else {
      overlay.style.backgroundColor = `rgba(0, 0, 0, 0)`;
   }
   

});
