const detailsDiv = document.querySelector("#details");
let bookId = parseInt(document.URL.split("?id=")[1]);

async function getBook() {
  const books = JSON.parse(localStorage.getItem("books"));
  let id = 0;
  for (let book of books) {
    if (id === bookId) {
      return book;
    }
    id++;
  }
}

async function showBook(book) {
  let bookDiv = document.createElement("div");
  bookDiv.setAttribute("class", "book");

  let bookImage = document.createElement("img");
  bookImage.setAttribute("class", "book-img");
  bookImage.setAttribute("src", book.image);

  let infos = document.createElement("infos");
  infos.setAttribute("class", "book-infos");

  let bookTitle = document.createElement("p");
  bookTitle.setAttribute("class", "book-title");
  bookTitle.textContent = "Titre: " + book.titre;

  for (let key in book) {
    if (key != "image") {
      let info = document.createElement("div");
      info.setAttribute("class", "info");

      let infoLabel = document.createElement("p");
      infoLabel.setAttribute("class", "info-label");
      infoLabel.textContent = "" + key + ": ";

      let infoValue = document.createElement("p");
      infoValue.setAttribute("class", "info-value");
      infoValue.textContent = ("" + book[key])
        .replace("false", "Non disponible")
        .replace("true", "Disponible");

      info.appendChild(infoLabel);
      info.appendChild(infoValue);

      infos.appendChild(info);
    }
  }

  bookDiv.appendChild(bookImage);
  bookDiv.appendChild(infos);
  detailsDiv.appendChild(bookDiv);
}

async function showDetails() {
  const book = await getBook();
  showBook(book);
}

showDetails();
