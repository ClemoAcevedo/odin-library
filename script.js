const myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ` +
        (this.isRead ? "read" : "not read yet");
};

function addBookToLibrary(title, author, numberOfPages, isRead) {
    const temporalBook = new Book(title, author, numberOfPages, isRead);
    temporalBook.id = crypto.randomUUID();
    myLibrary.push(temporalBook);
}