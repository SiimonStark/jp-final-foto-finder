class Photo {
	constructor(id, file, title, caption, favorite) {
		this.id = id;
		this.file = file;
		this.title = title;
		this.caption = caption;
		this.favorite = favorite || false;
	}

	saveToStorage(array) {
		localStorage.setItem("photos", JSON.stringify(imagesArr));
	}

	deleteFromStorage(imagesArr, index) {
		imagesArr.splice(index, 1);
		this.saveToStorage(imagesArr);
	}

	updatePhoto(type, text) {
		if (type === "title") {
			this.title = text;
		}
		if (type === "caption") {
			this.caption = text;
		}
		this.saveToStorage(imagesArr);
	}

	favoritePhoto(imagesArr) {
		this.saveToStorage(imagesArr);
	}
}