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
albumField.addEventListener('click',queBtn)
fave.addEventListener('click', )


// =====================Functions===========================
// *********************************************************
function enableSave(){
  if (inTitle.value !== "" && inCaption.value !== ""){
    create.disabled = false;
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
    reader.onload = addPhoto
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
  console.log(obj)
  albumField.insertAdjacentHTML('afterbegin',
    `<article class="album__photo" id="${obj.id}">
    <h3>${obj.title}</h3>
    <img class="img__file" src="${obj.file}">
    <p>${obj.caption}</p>
    <div class="photo__icon--container">
    <img id="delete" class="kill photo__icon" src="resources/delete.svg">
    <img id="heart" class="love ${obj.favorite} photo__icon" src="${obj.favorite ? 'resources/favorite-active.svg' : 'resources/favorite.svg'}">
    </div>
    </article>`);
}

function queBtn(e) {
  e.preventDefault();
  var photoId = parseInt(e.target.parentElement.parentElement.id);
  var thisTarget = e.target
  console.log(thisTarget)
  // 
  console.log(photoId);
  // 
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === photoId;
  });
  if (e.target.classList.contains('kill')){
    deleteCard(index);
  }
  if (e.target.classList.contains('love')){
    likeCard(index, thisTarget);
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
 } else if (imagesArr[index].favorite === true){
  thisTarget.src="resources/favorite.svg";
  imagesArr[index].favorite = false;
  FavCnt--;
 }
 imagesArr[index].favoritePhoto(imagesArr, index);
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
  console.log(filtCard)
  newPhoto(filtCard)
})
}

// searchForLove() {
//   if (heart.classList === "super-love"){
//     var filteredForLove = imagesArr.filter(function(imageArr)) {

// }
//   }
// }
