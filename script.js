//Переменные
const myLibrary = [];
const openButton = document.getElementById("add");
const dialog = document.getElementById("bookDialog");
const form = dialog.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const bookField = document.getElementById("books_field");

// функция конструктор для создания книг
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Открытие диалога при нажатии на кнопку
openButton.addEventListener("click", function () {
  reset();
  dialog.showModal();
});

// Закрытие диалога при клике вне диалога
dialog.addEventListener("click", function (e) {
  if (e.target === dialog) {
    dialog.close();
  }
});

// функция создания книги с помощью конструктора и добавление в массив
function createBook(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

//тестовое добавление элементов в массив. РАБОТА С МАССИВОМ ЕЩЁ НЕ РЕАЛИЗОВАНА
createBook("The Hobbit", "J.R.R. Tolkien", 295, false);
createBook("The Mars", "Dmitriy Kotovar", 1095, true);

// Обрабатываем отправку формы = создание книги и добавление её на экран
form.addEventListener("submit", function (event) {
  event.preventDefault();
  createBook(title.value, author.value, pages.value, read.checked);
  addBookToField(title.value, author.value, pages.value, read.checked);
  dialog.close();
});

//создание элемента книги на странице
function addBookToField(title, author, pages, read) {
  let book = document.createElement("div");
  book.classList.add("book");

  let bookData = [title, author, pages];
  for (let data of bookData) {
    let p = document.createElement("p");
    p.textContent = data;
    book.append(p);
  }

  let button1 = document.createElement("button");
  let button2 = document.createElement("button");
  button1.classList.add("btn");
  button2.classList.add("btn");
  button2.classList.add("btn_del");
  button2.textContent = "Remove";
  if (read) {
    button1.classList.add("btn_read");
    button1.textContent = "Read";
  } else {
    button1.classList.add("btn_notRead");
    button1.textContent = "Not read";
  }

  bookField.appendChild(book);
  book.appendChild(button1);
  book.appendChild(button2);
}

// сброс значений в диалоге
function reset() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

//удаление книги из списка
bookField.addEventListener("click", function (e) {
  let element = e.target;
  if (element.classList.contains("btn_del")) {
    let container = element.parentElement;
    container.remove();
  }
});

//смена параметра - прочитано/не прочитано
bookField.addEventListener("click", function (e) {
  let element = e.target;
  if (element.classList.contains("btn_read")) {
    element.textContent = "Not read";
    element.classList.remove("btn_read");
    element.classList.add("btn_notRead");
  } else if (element.classList.contains("btn_notRead")) {
    element.textContent = "Read";
    element.classList.remove("btn_notRead");
    element.classList.add("btn_read");
  }
});
