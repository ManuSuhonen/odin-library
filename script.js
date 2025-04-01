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

    /** @type {boolean} */
    this.isRead = false;
}

/** @type {Book[]} */
let bookArray = [];

let DOM = {
    dialog: {
        dialog: document.querySelector('dialog'),
        btnCloseDialog: document.querySelector('button.close-dialog'),
    },
    books: document.querySelector('#books'),
    form: document.querySelector('form'),
    formButton: function (isEdit) {
        let content = document.querySelector('#template-buttons').content;
        let selector = isEdit ? '#form-edit-btn' : '#form-submit-btn';
        let btn = content.querySelector(selector).cloneNode(true);
        DOM.form['form-edit-btn']?.remove();
        DOM.form['form-submit-btn']?.remove();
        DOM.form.appendChild(btn);
    },
    btnOpenDialog: document.querySelector('button#open-dialog'),
    editBtns: document.querySelectorAll('button.edit'),
    removeBtns: document.querySelectorAll('button.remove'),
    getBookTemplate: function () {
        let elem = document.querySelector('#bookTemplate');
        let clone = elem.content.cloneNode(true);
        return clone.firstElementChild;
    },
};

DOM.btnOpenDialog.onclick = function (event) {
    DOM.dialog.dialog.showModal();
    DOM.formButton();
};

DOM.dialog.btnCloseDialog.onclick = function (event) {
    DOM.dialog.dialog.close();
};

DOM.dialog.dialog.onclose = function (event) {
    DOM.form.reset();
};

function setBookDOM(bookNode, obj) {
    bookNode.querySelector('.title').textContent = obj.title;
    bookNode.querySelector('.author').textContent = obj.author;
    bookNode.querySelector('.pages').textContent = obj.pages;
}

function formSubmitBookEdit(event) {
    let formData = new FormData(event.target);
    let obj = Object.fromEntries(formData);
    let parent = event.submitter.parentBookNode;
    setBookDOM(parent, obj);

    bookArray.forEach((book) => {
        if (book.uuid == obj.uuid) {
            book.title = obj.title;
            book.author = obj.author;
            book.pageCount = obj.pages;
        }
    });
}

function formSubmitBookAdd(event) {
    let formData = new FormData(event.target);
    let obj = Object.fromEntries(formData);
    let book = new Book(obj.title, obj.author, obj.pages);

    let clone = DOM.getBookTemplate();

    clone.querySelector('.title').textContent = book.title;
    clone.querySelector('.author').textContent = book.author;
    clone.querySelector('.pages').textContent = book.pageCount;

    clone.dataset.uuid = book.uuid;

    // Remove book DOM.
    clone.querySelector('.book-remove-btn').onclick = function (event) {
        clone.remove();
        bookArray = bookArray.filter(book => {
            return book.uuid != clone.dataset.uuid;
        });
    };

    clone.querySelector('.book-edit-btn').parentBookNode = clone;

    // Set form values from book DOM when editing.
    clone.querySelector('.book-edit-btn').onclick = function (event) {
        let parent = event.currentTarget.parentBookNode;

        DOM.formButton(true);

        DOM.form['form-edit-btn'].parentBookNode = parent;

        let nodeTitle = parent.querySelector('.title');
        let nodeAuthor = parent.querySelector('.author');
        let nodepage = parent.querySelector('.pages');
        let nodeUUID = parent.dataset.uuid;

        DOM.form.elements.title.value = nodeTitle.textContent;
        DOM.form.elements.author.value = nodeAuthor.textContent;
        DOM.form.elements.pages.value = nodepage.textContent;
        DOM.form.elements.uuid.value = nodeUUID;

        DOM.dialog.dialog.showModal();
    };

    clone.querySelector('.form-check-input').onclick = function (event) {
        bookArray.forEach((book) => {
            if (book.uuid == clone.dataset.uuid) {
                book.isRead = event.target.checked;
            }
        });
    };

    bookArray.push(book);
    books.appendChild(clone);

    DOM.form.reset();
}

DOM.dialog.dialog.onsubmit = function (event) {
    if (event.submitter.id == 'form-edit-btn') {
        formSubmitBookEdit(event);
    }

    if (event.submitter.id == 'form-submit-btn') {
        formSubmitBookAdd(event);
    }
};
