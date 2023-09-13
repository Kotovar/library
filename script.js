//Переменные
const myLibrary = [];
const openButton = document.getElementById("add");
const dialog = document.getElementById("bookDialog");
const form = dialog.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

// функция конструктор для добавления книг
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// функция создания книги с помощью конструктора и добавление в массив
function createBook(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

createBook("The Hobbit", "J.R.R. Tolkien", 295, false);
createBook("The bit", "author", 100, true);

// Открываем диалог при нажатии на кнопку
openButton.addEventListener("click", function () {
  reset();
  dialog.showModal();
});

// Закрываем диалог при клике вне диалога
dialog.addEventListener("click", function (e) {
  if (e.target === dialog) {
    dialog.close();
  }
});

// Обрабатываем отправку формы
form.addEventListener("submit", function (event) {
  event.preventDefault();
  createBook(title.value, author.value, pages.value, read.checked);
  dialog.close();
});

//Функция для просмотра книг в массие
function searchBook(array) {
  array.forEach((element) => {
    console.log(element.title);
  });
}

// сброс значений в диалоге
function reset() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}
