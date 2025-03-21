let DOM = {
    books: document.querySelector('#books'),
    dialog: document.querySelector('dialog'),
    form: document.querySelector('form') ?? undefined,
    btnOpenDialog: document.querySelector('button#open-dialog'),
    btnCloseDialog: document.querySelector('button.close-dialog'),
    btnCloseDialog: document.querySelector('button.close-dialog'),
    editBtns: document.querySelectorAll('button.edit'),
    removeBtns: document.querySelectorAll('button.remove'),
    bookArray: undefined,
};

bookArray = [...books.children];

bookArray.forEach(book => {
    let editBtn = book.querySelector('button.edit');
    let removeBtn = book.querySelector('button.remove');

    let uuid = book.dataset.uuid;
    editBtn.addEventListener('click', (event) => {
        delete proxiedList['uuid'];
        debugger
    });

    removeBtn.addEventListener('click', (event) => {
        delete proxiedList['uuid'];
        debugger
    });
});

// [...books.children].forEach(x => {});

// [...books.children][0].querySelector('button.edit')

// [...books.children][0].querySelector('button.edit').addEventListener('click', (event) => {})

handler.onDelete = function (uuid) {
    [...books.children].forEach(element => {
        if (element.dataset.uuid == uuid) {
            element.remove();
        }
    });
};

/**
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} pageCount - Page count book.
 * @this {Book}
 */
function Book(title, author, pageCount) {
    /** @type {string} */
    this.title = title;

    /** @type {string} */
    this.author = author;

    /** @type {number} */
    this.pageCount = pageCount;

    /** @type {string} */
    this.uuid = crypto.randomUUID();
}

DOM.btnOpenDialog?.addEventListener("click", event => {
    DOM.dialog?.showModal();
});

DOM.btnCloseDialog?.addEventListener('click', event => {
    DOM.dialog?.close();
});

DOM.dialog?.addEventListener('close', event => {
    DOM.form?.reset();
});

DOM.dialog?.addEventListener('submit', event => {
    let formData = new FormData(event.target);
    let obj = Object.fromEntries(formData);

    let book = new Book(obj.title, obj.author, obj.pages);

    proxiedList[book.uuid] = book;

    let domBook = getBookHTML(book);

    books.appendChild(domBook);

    let removeBtn = domBook.querySelector('button.remove');
    let editBtn = domBook.querySelector('button.edit');

    removeBtn.addEventListener('click', (event) => {
        delete proxiedList[book.uuid];
    });


    DOM.form?.reset();
});

function makeBook() {
    let obj = {};
    let val = DOM.form ? DOM.form : undefined;

    let formData = new FormData(val);

    formData.forEach((value, key) => {
        obj[key] = value;
    });

    let book = new Book(tttt.title, tttt.author, tttt.pageCount);

    proxiedList[book.uuid] = book;

    let domBook = getBookHTML(book);
    books.appendChild(domBook);
}

/**
 * Returns the sum of a and b
 * @param {Book} book
 * @returns {HTMLDivElement}
 */
function getBookHTML(book) {
    let bookDiv = document.createElement("div");

    bookDiv.className = "book-container box-style";

    bookDiv.innerHTML = `
    <div class="book-title box-style">
        <h6>Title:</h6>
        <h5 data-title="Xeelee Sequence">${book.title}</h5>
    </div>
    <div class="book-author box-style">
        <h6>Author:</h6>
        <h5>${book.author}</h5>
    </div>
    <div class="book-page-count box-style">
        <h6>Page Count:</h6>
        <h5>${book.pageCount}</h5>
    </div>
    <div class="actions box-style">
        <div class="form-check form-switch form-check-reverse">
            <label class="form-check-label"> Has been read? <input class="form-check-input" type="checkbox">
            </label>
        </div>
        <button type="button" class="btn edit btn-primary box-style">Edit</button>
        <button type="button" class="btn remove btn-primary box-style">Remove</button>
    </div>
    `;

    bookDiv.dataset.uuid = book.uuid;
    
    // bookDiv.querySelector('button.remove');

    // let editBtn = bookDiv.querySelector('button.edit');
    // let removeBtn = bookDiv.querySelector('button.remove');

    // removeBtn.addEventListener('click', (event) => {
    //     delete proxiedList[book.uuid];
    //     debugger
    // });

    // editBtn.addEventListener('click', (event) => {
    //     delete proxiedList[book.uuid];
    //     debugger
    // });

    return bookDiv;
}
