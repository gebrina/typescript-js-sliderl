import './style.scss';


const IMAGE_URL =
  'https://pixabay.com/api/?key=40472257-dd3218f2647c2dcaa353b5119&q=yellow+flowers&image_type=photo&pretty=true';
let loadedImages = [];
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-btn');
const nextButtton = document.querySelector('.next-btn');
const playBtn = document.querySelector('.play-btn');
let imageIndex = 0;


let interval = null;
const handleAtuoPlay = (e)=>{
const button = e.target as HTMLButtonElement;
if(button.textContent.trim()==">>"){
  console.log(true)
   button.textContent="| |"
}else{
  button.textContent=">>"
}
if(interval){
  clearInterval(interval)
}else{
  interval = setInterval(()=>{
    if(imageIndex>=loadedImages.length-1){
       hanldePrevButtonClick();
     }else{
       handleNextButtonClick();
     }
   
   },3000)
}
}

const hanldePrevButtonClick = ()=>{
  if(imageIndex===0){
    imageIndex = loadedImages.length-1;
  }
  imageIndex--;
  createImage();
}

const handleNextButtonClick = ()=>{
  imageIndex++;
  if(imageIndex>=loadedImages.length-1){
    imageIndex=0;
  }
  createImage();
}

playBtn.addEventListener('click',handleAtuoPlay);
nextButtton.addEventListener('click',handleNextButtonClick);
prevButton.addEventListener('click',hanldePrevButtonClick);
async function fetchImages() {
  try {
    console.log('fetching..');
    const response = await fetch(IMAGE_URL);
    const images = await response.json();
     images.hits.forEach(hit=>{
       loadedImages.push(hit.largeImageURL);
     })
  } catch (e) {
    console.log(e);
  }
  loadedImages.forEach((image,index)=>{
    if(index===0){
      createImage();
    }
  })
}

let imageTimeout = null;
const createImage = ()=>{
  const prevImages = slider.querySelectorAll('img');
  let removedImage:HTMLImageElement;
  prevImages.forEach((image,index)=>{
      if(index===0){
        image.classList.add('remove-img');
        removedImage=image;
      }else{
        image.remove();
      }
  })
  
  imageTimeout&&clearTimeout(imageTimeout);

   imageTimeout = setTimeout(()=>{
     removedImage&&removedImage.remove();
     let img = document.createElement('img');
     img.style.transform = "translateX(0%)"
     img.src = loadedImages[imageIndex];
    img.classList.add('slider-img');
    slider.appendChild(img);
   },1000)
   
}

fetchImages();
