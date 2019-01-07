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

	deleteFromStorage(index, array) {
		imagesArr.splice(index, 1);
		this.saveToStorage(imagesArr);
	}

	static updatePhoto(index, type, newContent) {
		imagesArr.forEach(function(image) {
			if (image.id === index) {
				image[type] = newContent;
			}
		this.saveToStorage(input, type);
		});
	}
}