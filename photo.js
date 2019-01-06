class Photo {
	constructor(id, file, title, caption, favorite) {
		this.id = this.dataset;
		this.file = file;
		this.title = title;
		this.caption = caption;
		this.favorite = favorite;
	}

	saveToStorage() {
		localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
	}

	deleteFromStorage() {
		arrayCards.splice(index, 1);
		this.saveToStorage(arrayCards);
	}

	updatePhoto(input, type) {
		if (type === 'file') {
			this.file = file;
		}
		if (type === 'title') {
			this.title = title;
		}
		if (type === 'caption') {
			this.caption = caption;
		}
		this.saveToStorage(input, type);
	}
}