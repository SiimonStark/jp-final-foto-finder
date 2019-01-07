class Photo {
	constructor(id, file, title, caption, favorite) {
		this.id = id;
		this.file = file;
		this.title = title;
		this.caption = caption;
		this.favorite = false;
	}

	saveToStorage(array) {
		localStorage.setItem("photos", JSON.stringify(arrayCards));
	}

	deleteFromStorage(index, array) {
		array.splice(index, 1);
		this.saveToStorage(array);
	}

	favoritePhoto() {
		
	}

	updatePhoto(input, type) {
		
		this.saveToStorage(input, type);
	}
}