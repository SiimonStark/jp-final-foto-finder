// ====================Variables============================
// *********************************************************
// ##BUTTONS/INPUTS
var inSearch = document.querySelector(".search__input");
var inTitle = document.getElementById("input-title");
var inCaption = document.getElementById("input-caption");
var inFile = document.getElementById("file");
var fave =document.getElementById("fav");
var create = document.getElementById("create");
// ##DOM
var albumField = document.querySelector(".album__cards");
// ##MISC
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();


// ====================Event Listeners======================
// *********************************************************
window.addEventListener('load', appendPhotos);
// window.addEventListener('input', enableBtn);
// inSearch.addEventListener('input', searchAlbum);
create.addEventListener('click', createElement);
albumField.addEventListener('click',queBtn)


// ============Functions========================
// *********************************************************
function appendPhotos() {
  // imagesArr = [];
  imagesArr.forEach(function (obj) {
    newPhoto(obj);
    var obj = new Photo(obj.id, obj.file, obj.title, obj.caption);
    imagesArr.push(obj);
  });
}

function createElement(e) {
  if (inFile.files[0]) {
    reader.readAsDataURL(inFile.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  var id = Date.now();
  var newImage = new Photo(id, e.target.result, inTitle.value, inCaption.value);
  imagesArr.push(newImage);
  newImage.saveToStorage(imagesArr);
  newPhoto(Photo);
}

function newPhoto(obj) {
    albumField.insertAdjacentHTML('afterbegin',
  `<article class="album__photo" id="${obj.id}">
    <h3>${obj.title}</h3>
    <img class="img__file" src="${obj.file}">
    <p>${obj.caption}</p>
    <div class="photo__icon--container">
      <img id="delete" class="kill photo__icon" src="resources/delete.svg">
      <img id="heart" class="love photo__icon" src="resources/favorite.svg">
    </div>
  </article>`);
}

function queBtn(e) {
  e.preventDefault();
  var photoId = parseInt(e.target.parentElement.parentElement.id);
  // var index = imagesArr.findIndex(photo => photo.id === imageId);
  var btnToCLick = e.target.className;

}

// function deleteCard(index, imageId) {
//       imagesArr[index].deleteFromStorage(index, imagesArr);
//       var card = document.getElementById(imageId);
//       card.remove();
// }

// function likeCard(index, imageId, name) {
//   if (name === "heart") {
//     e.target.classList.add(" liked");
//     imagesArr[index].updateCard();
//   }
// }


