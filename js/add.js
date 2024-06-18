const addBtn = document.querySelector("#add-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const addForm = document.querySelector("#add");
const confirmBtn = document.querySelector("#confirm-btn");
const bookImg = document.querySelector("#book-img");
const bookImgFile = document.querySelector("#book-img-file");

// temporary file path because js do not have access to filesystem
let tmpPath = "";

async function addNewBook() {
  const newBook = {
    titre: document.querySelector("#title-inp").value,
    auteurs: document.querySelector("#authors-inp").value,
    isbn: document.querySelector("#isbn-inp").value,
    image: tmpPath,
    editeur: document.querySelector("#editor-inp").value,
    datePublication: document.querySelector("#pub-date-inp").value,
    genre: document.querySelector("#category-inp").value,
    resume: document.querySelector("#resume-text-area").value,
    langue: document.querySelector("#lang-inp").value,
    nombrePages: document.querySelector("#nbr-pages-inp").value,
    disponibilite: true,
    etat: "Bon état",
    emplacement: document.querySelector("#place-inp").value,
  };

  for (key in newBook) {
    if (!newBook[key]) {
      alert("Veuillez le champ " + key);
      return;
    }
  }
  let books = JSON.parse(localStorage.getItem("books"));
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
}

addBtn.onclick = function () {
  addForm.style.display = "flex";
};

confirmBtn.onclick = function () {
  addNewBook();
  addForm.style.display = "none";
};

cancelBtn.onclick = function () {
  addForm.style.display = "none";
};

bookImg.addEventListener("click", () => {
  bookImgFile.click();
});

bookImg.addEventListener("change", () => {
  if (bookImg.style.backgroundImage) {
    bookImg.textContent = "";
  }
});

bookImgFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    tmpPath = URL.createObjectURL(file);
    bookImg.style.backgroundImage = `url(${tmpPath})`;
  }
});
