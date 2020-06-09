/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-sequences */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const addBtn = document.querySelector('#add');
const cardContainer = document.querySelector('.card-container');
const addToLibraryBtn = document.querySelector('#addToLibrary');
const form = document.querySelector('#add-form');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const radioButtons = document.querySelectorAll('input[name="read"]');
const library = [];
// prettier-ignore
function Book(title, author, pages, read) {
    // eslint-disable-next-line no-unused-expressions
    this.title = title,
    this.author = author,
    this.pages = pages, 
    this.read = read
}

// creates the display for each book in the library and renders in the DOM
function renderLibrary() {
        let iterateNum = 0;
        for (const book of library) {
                const displayBook = document.createElement('div');
                displayBook.setAttribute('class', 'book');
                for (const prop in book) {
                        const cardItem = document.createElement('div');
                        cardItem.setAttribute('class', 'book-item');
                        cardItem.innerText = `${prop.charAt(0).toUpperCase() + prop.slice(1)}: ${book[prop]}`;
                        displayBook.appendChild(cardItem);
                }
                // create garbage can for delete
                const exitBook = document.createElement('div');
                exitBook.innerHTML = '<i class="fas fa-trash"></i>';
                exitBook.setAttribute('class', 'exit');
                exitBook.setAttribute('data-num', iterateNum);

                displayBook.appendChild(exitBook);
                // add button for read mode
                const readBtn = document.createElement('button');
                readBtn.innerText = 'Was read?';
                readBtn.setAttribute('class', 'read');
                readBtn.setAttribute('data-readnum', iterateNum);
                displayBook.appendChild(readBtn);
                // push book to html container
                cardContainer.appendChild(displayBook);
                iterateNum++;
        }
        deleteBook();
        toggleRead();
}

// adds delete functionality
function deleteBook() {
        const exits = document.querySelectorAll('.exit');
        exits.forEach(exit => {
                exit.addEventListener('click', function() {
                        library.splice(this.dataset.num, 1);
                        cardContainer.innerHTML = '';
                        renderLibrary();
                });
        });
}

// adds read toggle
function toggleRead() {
        const readButton = document.querySelectorAll('.read');
        readButton.forEach(btn => {
                btn.addEventListener('click', function() {
                        library[this.dataset.readnum].read === true
                                ? (library[this.dataset.readnum].read = false)
                                : (library[this.dataset.readnum].read = true);
                        cardContainer.innerHTML = '';
                        renderLibrary();
                });
        });
}

// makes form appear as add button disappears
addBtn.addEventListener('click', function() {
        form.style.display = 'flex';
        addBtn.style.display = 'none';
        cardContainer.style.display = 'none';
});

// gets values out of form, creates new object and inserts it into library array
addToLibraryBtn.addEventListener('click', function() {
        let isRadio;
        for (const rb of radioButtons) {
                if (rb.checked) {
                        // check which radio button is selected and set isRadio equal to proper
                        rb.value === 'true' ? (isRadio = true) : (isRadio = false);
                }
        }
        // checks to make sure form is fully filled out
        if (formTitle.value && formAuthor.value && formPages.value) {
                library[library.length] = new Book(
                        formTitle.value,
                        formAuthor.value,
                        // parseInt just to keep value types all the same
                        parseInt(formPages.value),
                        isRadio
                );
        }
        form.style.display = 'none';
        addBtn.style.display = 'inline-block';
        cardContainer.style.display = 'flex';
        cardContainer.innerHTML = '';
        renderLibrary();
});

const theHobbit = new Book('The Hobbit', 'someguy', 295, true);
library.push(theHobbit);
const thebobbit = new Book('hobbit', 'someguy', 325, true);
library.push(thebobbit);
const thetobbit = new Book('hobbit', 'someguy', 295, true);
library.push(thetobbit);

renderLibrary();
