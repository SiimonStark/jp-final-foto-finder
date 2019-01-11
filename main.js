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
// ##Global Variable
var favCnt = 0;

// ====================Event Listeners======================
// *********************************************************
window.addEventListener('load', appendPhotos(imagesArr));
window.addEventListener('input', enableSave);
inSearch.addEventListener('input', searchAlbum);
create.addEventListener('click', createElement);
albumField.addEventListener('click',queBtn);
albumField.addEventListener('keydown', pressEnter);

// =====================Functions===========================
// *********************************************************
function enableSave(){
  if (inTitle.value !== "" && inCaption.value !== ""){
    create.disabled = false;
  }
  if (inFile.files === 0) {
    inFile.value = "Please Choose an Image";
  }
}

function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (photo) {
    newPhoto(photo);
    var obj = new Photo(photo.id, photo.file, photo.title, photo.caption, photo.favorite);
    imagesArr.push(obj);
  });
}

function createElement(e) {
  if (inFile.files[0]) {
    reader.readAsDataURL(inFile.files[0]); 
    reader.onload = addPhoto;
  }
}

function addPhoto(e) {
  var id = Date.now();
  var newImage = new Photo(id, e.target.result, inTitle.value, inCaption.value);
  imagesArr.push(newImage);
  newImage.saveToStorage(imagesArr);
  newPhoto(newImage);
}

function newPhoto(obj) {
  albumField.insertAdjacentHTML('afterbegin',
    `<article class="album__photo" id="${obj.id}">
    <h3 class="photo__content photo__h" contenteditable="true">${obj.title}</h3>
    <img class="img__file" src="${obj.file}">
    <p class="photo__content photo__p" contenteditable="true">${obj.caption}</p>
    <div class="photo__icon--container">
    <img id="photo__delete" class="photo__kill photo__icon" src="resources/delete.svg">
    <img id="photo__heart" class="photo__love ${obj.favorite} photo__icon" 
    src="${obj.favorite ? 'resources/favorite-active.svg' : 'resources/favorite.svg'}">
    </div>
    </article>`);
}
// ##Btn/Edit Func----------------------------------------------
function queBtn(e) {
  e.preventDefault();
  var photoId = parseInt(e.target.parentElement.parentElement.id);
  var thisTarget = e.target;
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === photoId;
  });
  if (e.target.classList.contains('photo__kill')){
    deleteCard(index);
  }
  if (e.target.classList.contains('photo__love')){
    likeCard(index, thisTarget);
  }
}

function pressEnter(e) {
  var photoId = parseInt(event.target.parentElement.id);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === photoId;
  });
  if(event.keyCode === 13) {
    updateContent(index);
  }
}

function deleteCard(index) {
  imagesArr[index].deleteFromStorage(imagesArr, index);
  event.target.closest('.album__photo').remove();
}

function likeCard(index, thisTarget) {
 if (imagesArr[index].favorite === false){
  thisTarget.src="resources/favorite-active.svg";
  imagesArr[index].favorite = true;
  favCnt++;
  fave.value = `View ${favCnt} Favorites`;
 } else if (imagesArr[index].favorite === true){
  thisTarget.src="resources/favorite.svg";
  imagesArr[index].favorite = false;
  favCnt--;
  fave.value = `View ${favCnt} Favorites`;
 }
 imagesArr[index].favoritePhoto(imagesArr);
}

function updateContent(index) {
  var targetText = event.target.innerText;
  var classnam = event.target.className;
  if (classnam === "photo__content photo__h") {
    imagesArr[index].updatePhoto("title", targetText);
  }
  if (event.target.className === "photo__content photo__p") {
    imagesArr[index].updatePhoto("caption", targetText);
  }
}

function searchAlbum() {
  var search = inSearch.value.toUpperCase();
  var filtered = imagesArr.filter(function(imageArr){
    var titleSearch = imageArr.title.toUpperCase();
    var captionSearch = imageArr.caption.toUpperCase();
    return titleSearch.includes(search) || captionSearch.includes(search);
  });
  albumField.innerHTML = '';
  filtered.forEach(function(filtCard) {
    newPhoto(filtCard)
  });
}