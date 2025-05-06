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

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
};


function addBookToLibrary(title, author, numberOfPages, isRead) {
    const temporalBook = new Book(title, author, numberOfPages, isRead);
    temporalBook.id = crypto.randomUUID();
    myLibrary.push(temporalBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, false);
addBookToLibrary("Sapiens", "Yuval Noah Harari", 443, true);


function displayBooks() {
    const libraryContainer = document.querySelector(".library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        card.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.numberOfPages}</p>
        <p><strong>Status:</strong> ${book.isRead ? "Read" : "Not read yet"}</p>
        <button class="toggle-read">Toggle Read</button>
        <button class="remove-book">Remove</button>
      `;

        libraryContainer.appendChild(card);
    });

    document.querySelectorAll(".remove-book").forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".book-card");
            const id = card.dataset.id;
            removeBookById(id);
            displayBooks();
        });
    });

    document.querySelectorAll(".toggle-read").forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".book-card");
            const id = card.dataset.id;
            const book = myLibrary.find((b) => b.id === id);
            if (book) {
                book.toggleReadStatus();
                displayBooks();
            }
        });
    });
}


displayBooks();


const dialog = document.getElementById("book-dialog");
const openBtn = document.querySelector(".newbook-button");

openBtn.addEventListener("click", () => {
    dialog.showModal();
});

const closeBtn = document.getElementById("close-dialog");
closeBtn.addEventListener("click", () => {
    dialog.close();
});

const form = document.getElementById("book-form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // evitamos recargar la página, mas control

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("isRead").checked;

    if (!title || !author || isNaN(pages)) {
        alert("Please fill in all required fields.");
        return;
    }

    addBookToLibrary(title, author, pages, isRead);
    displayBooks();
    form.reset();         // limpiamos el formulario
    dialog.close();       // cerramos el modal
});


// botones de las tarjetas

function removeBookById(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}
