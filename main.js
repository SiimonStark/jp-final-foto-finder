// var create = document.querySelector('button');
// var input = document.querySelector('input');
// var photoGallery = document.querySelector('.images');
// var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
// var reader = new FileReader();

// window.addEventListener('load', appendPhotos);
// create.addEventListener('click', createElement);

// function appendPhotos() {
//   imagesArr.forEach(function (photo) {
//     photoGallery.innerHTML += `<img src=${photo.file} />`
//   })
// }

// function createElement() {
//   console.log(input.files[0])
//   if (input.files[0]) {
//     reader.readAsDataURL(input.files[0]); 
//     reader.onload = addPhoto
//   }
// }

// function addPhoto(e) {
//   console.log(e.target.result);
//   var newPhoto = new Photo(Date.now(), e.target.result);
//   photoGallery.innerHTML += `<img src=${e.target.result} />`;
//   imagesArr.push(newPhoto)
//   newPhoto.saveToStorage(imagesArr)
// }

// ====================Variables============================
// *********************************************************
// ##BUTTONS/INPUTS
var inSearch = document.querySelector(".search__input");
var inTitle = document.getElementById("input-title");
var inCaption = document.getElementById("input-caption");
var inFile = document.getElementById("add-file");
var fave = document.getElementById("fav");
var create = document.getElementById("create");
// ##DOM
var albumField = document.querySelector(".album__cards");
// ##MISC
var photoGallery = document.querySelector('.images');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

// ====================Event Listeners======================
// *********************************************************
// window.addEventListener('load', appendPhotos);
// inSearch.addEventListener('input', searchAlbum);
create.addEventListener('click', createElement);


// ============Functions========================
// *********************************************************
function createElement(e) {
  e.preventDefault();
  console.log('CreateElement=checkpoint1');
  console.log(inFile.files[0])
  if (inFile.files[0]) {
    reader.readAsDataURL(inFile.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  console.log('AddPhoto=checkpoint1');
  console.log(e.target.result);
  data.set.id = Date.now;
  var cardId = data.set.id;
  var title = inTitle.innerHTML;
  var caption = inCaption.innerHtml;
  var quality = 
  var newPhoto = new Photo(Date.now(), e.target.result);
  photoGallery.innerHTML += 
  `<article class="album__photo" id="card" data-id=`${cardId}`>
    <h3>${title}</h3>
    <img class=`${e.target.result}`>
    <p>${caption} Lots of text goes here so that image can be described precisely and accurately. With much precision comes great responsibility.</p>
    <div class="photo__icon--container">
      <img class="photo__icon" src="resources/delete.svg">
      <img class="photo__icon" src="resources/favorite.svg">
    </div>
  </article>`
  imagesArr.push(newPhoto)
  newPhoto.saveToStorage(imagesArr)
}



