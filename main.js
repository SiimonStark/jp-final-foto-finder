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
var photo = document.querySelector(".photo");
var create = document.getElementById("create");
// ##DOM
var albumField = document.querySelector(".album__cards");
// ##MISC
var photoGallery = document.querySelector(".images");
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();

// ====================Event Listeners======================
// *********************************************************
window.addEventListener('load', appendPhotos);
// inSearch.addEventListener('input', searchAlbum);
create.addEventListener('click', createElement);
albumField.addEventListener('click',queBtn)


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
  var photo = new Photo(Date.now(), inTitle.value, inCaption.value, inFile.image);
  imagesArr.push(photo);
  photo.saveToStorage(imagesArr);
  newPhoto(photo);
}

function appendPhotos(array) {
  imagesArr = [];
  imagesArr.forEach(function (obj) {
    newPhoto(obj);
    var photo = Photo(obj.id, obj.file, obj.title, obj.caption);
    imagesArr.push(photo);
  });
}

function newPhoto(photo) {
    photoGallery.innerHTML += 
  `<article class="album__photo" id="${photo.id}">
    <h3>${photo.title}</h3>
    <img class="img__file" src="${photo.file}">
    <p>${photo.caption} Lots of text goes here so that image can be described precisely and accurately. With much precision comes great responsibility.</p>
    <div class="photo__icon--container">
      <img id="delete" class="kill photo__icon" src="resources/delete.svg">
      <img id="fav" class="heart photo__icon" src="resources/favorite.svg">
    </div>
  </article>`
}

function queBtn(e) {
  e.preventDefault();
  var photoId = parseInt(e.target.parentElement.parentElement.id);
  var index = imagesArr.findIndex(photo => photo.id === imageId);
  var btnToCLick = e.target.className;
  if (btnToCLick === 'delete') {
    deletePhoto(index, photoId);
  }
  if (btnToCLick === 'fave') {
    likeCard(index, imageId, btnToCLick);
  }
}

function deleteCard(index, imageId) {
      imagesArr[index].deleteFromStorage(index, imagesArr);
      var card = document.getElementById(imageId);
      card.remove();
}

function likeCard(index, imageId, name) {
  if (name === "heart") {
    e.target.classList.add(" liked");
    imagesArr[index].updateCard();
  }
}


