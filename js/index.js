const booksDiv = document.querySelector("#books");
const categorySelect = document.querySelector("#category");

function updateCategorySelectOptions() {
  categorySelect.innerHTML = "";
  let categories = JSON.parse(localStorage.getItem("categories"));
  for (let category of categories) {
    categoryOption = document.createElement("option");
    categoryOption.setAttribute("value", category);
    categoryOption.textContent = category;
    categorySelect.appendChild(categoryOption);
  }
}

async function getBooksFromJSON() {
  const response = await fetch("/data.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des livres");
  }
  const books = await response.json();
  return books.livres;
}

async function getBooks() {
  const booksJSON = await getBooksFromJSON();
  let books = JSON.parse(localStorage.getItem("books"));

  if (!books) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  for (let book of booksJSON) {
    if (!books.some((element) => element.titre === book.titre)) {
      books.push(book);
    }
  }

  localStorage.setItem("books", JSON.stringify(books));
  return books;
}

async function showBook(book, id) {
  let bookDiv = document.createElement("div");
  bookDiv.setAttribute("class", "book");

  let bookImage = document.createElement("img");
  bookImage.setAttribute("class", "book-img");
  bookImage.setAttribute("src", book.image);

  let bookTitle = document.createElement("p");
  bookTitle.setAttribute("class", "book-title");
  bookTitle.textContent = "Titre: " + book.titre;

  let detailsBtn = document.createElement("a");
  detailsBtn.setAttribute("class", "details-btn");
  detailsBtn.setAttribute("href", `/ui/details.html?id=${id}`);
  detailsBtn.setAttribute("target", "_blank");
  detailsBtn.textContent = "détails";

  for (let child of [bookImage, bookTitle, detailsBtn])
    bookDiv.appendChild(child);
  booksDiv.appendChild(bookDiv);
}

async function showBooks() {
  booksDiv.innerHTML = "";
  const books = await getBooks();

  let id = 0;
  for (let book of books) {
    if (
      categorySelect.value === book.genre ||
      categorySelect.value === "Toutes"
    ) {
      showBook(book, id);
    }
    id++;
  }
}

window.addEventListener("change", showBooks);
document.addEventListener("DOMContentLoaded", async () => {
  let books = await getBooks();
  let categories = ["Toutes"];
  for (let book of books) {
    if (!categories.some((e) => e === book.genre)) {
      categories.push(book.genre);
    }
  }

  localStorage.setItem("categories", JSON.stringify(categories));
  updateCategorySelectOptions();
  showBooks();
});
