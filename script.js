// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = function () {
//     return `${title} by ${author}, ${pages}, ${read} yet`;
//   };
// }

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");
// console.log(theHobbit.info());

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read} yet`;
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");
console.log(theHobbit.info());
