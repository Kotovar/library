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

//тестовое добавление элементов в массив.
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

  let bookData = [author, pages];
  let p = document.createElement("p");
  p.textContent = title;
  p.classList.add("title_name");
  book.append(p);

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

//удаление книги из списка и массива
bookField.addEventListener("click", function (e) {
  let element = e.target;
  if (element.classList.contains("btn_del")) {
    let container = element.parentElement;
    container.remove();
    let bookTitle = container.querySelector(".title_name").textContent;
    let bookIndex = myLibrary.findIndex((book) => book.title === bookTitle); //находим индекс элемента с таким же title
    myLibrary.splice(bookIndex, 1); //удаляем элемент 1 с индекса, который мы нашли
  }
});

//смена параметра - прочитано/не прочитано
//1 функция - меняет параметры кнопки(содержание и класс)
function toggleRead(element, text, removeClass, addClass) {
  element.textContent = text;
  element.classList.remove(removeClass);
  element.classList.add(addClass);
}

//2 функция - меняет параметры книги в массие - прочитано или нет
function toggleReadBook(bookTitle, read) {
  let bookIndex = myLibrary.findIndex((book) => book.title === bookTitle);
  myLibrary[bookIndex].read = read;
}

//3 функция - слушает нажатия кнопки Прочитано/не прочитано и запускает 1 и 2 функцию
bookField.addEventListener("click", function (e) {
  let element = e.target;
  let container = element.parentElement;
  if (
    element.classList.contains("btn_read") ||
    element.classList.contains("btn_notRead")
  ) {
    let bookTitle = container.querySelector(".title_name").textContent;
    element.classList.contains("btn_read")
      ? (toggleRead(element, "Not read", "btn_read", "btn_notRead"),
        toggleReadBook(bookTitle, false))
      : (toggleRead(element, "Read", "btn_notRead", "btn_read"),
        toggleReadBook(bookTitle, true));
  }
});
