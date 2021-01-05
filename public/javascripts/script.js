const API_CLIENTID = 'bvLcBsY7B9y43773KumKpUWuFU6ec1Rv6hYzHyiMB3o'
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
const imagesPwet = Array.from(imageSection.querySelectorAll('img'));
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=10&client_id=${API_CLIENTID}`

form.addEventListener('submit', formSubmitted);


function formSubmitted(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  search(searchTerm)
    .then(displayImages)
}


function searchStart() {
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  let url = `${API_URL}&query=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.results;
    });
}

function clickImage() {
  console.log(imagesPwet)
}
function displayImages(images) {
  images.forEach(image => {
    let imageContainer = document.createElement('li');
    imageContainer.innerHTML = `<img src="${image.urls.regular}">`;
    imageSection.appendChild(imageContainer);

  });
  clickImage()
}



