"use strict";

let nameInput = document.getElementById("bookmakerName");
let urlInput = document.getElementById("websiteurl");
let addBtn = document.getElementById("addBtn");
let tableBody = document.getElementById("tableBody");
let inputsAlert = document.getElementById("inputsAlert");
let nameAlert = document.getElementById("nameAlert");
let urlAlert = document.getElementById("urlAlert");
let inputsAlert2 = document.getElementById("inputsAlert2");
let bookMarks;

let currentIndex = 0;

if (localStorage.getItem("bookMarks") == null) {
  bookMarks = [];
} else {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  displayBook();
}

addBtn.addEventListener("click", function () {
  if (validation() && checkUrl() && checkName()) {
    if (isnameExist()) {
      inputsAlert2.classList.remove("d-none");
      addBtn.disabled = "false";
    } else {
      inputsAlert2.classList.add("d-none");
      if (addBtn.innerHTML == "Update") {
        saveUpdate();
      } else {
        addBook();
      }

      localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
      displayBook();
      clearForm();
    }
  } else {
    inputsAlert.classList.remove("d-none");
    addBtn.disabled = "false";
  }
});

function addBook() {
  let bookMark = {
    name: nameInput.value,
    url: urlInput.value,
  };

  bookMarks.push(bookMark);
  console.log(bookMarks);
}

function displayBook() {
  let marks = ``;
  for (let i = 0; i < bookMarks.length; i++) {
    marks += `
        <tr>
        <td>${bookMarks[i].name}</td>
        <td> <button class="btn btn-primary"><a class="link-color" href="${bookMarks[i].url}" target="_blank">visit</a></button></td>
        <td><button class="btn btn-info"  onclick="UpdateBook(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button></td>
        </tr>
        `;
  }

  tableBody.innerHTML = marks;
}

function deleteBook(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  displayBook();
}

function clearForm() {
  nameInput.value = "";
  urlInput.value = "";
}

function UpdateBook(index) {
  currentIndex = index;
  nameInput.value = bookMarks[index].name;
  urlInput.value = bookMarks[index].url;
  addBtn.innerHTML = "Update";
}

function saveUpdate() {
  let bookMark = {
    name: nameInput.value,
    url: urlInput.value,
  };

  bookMarks[currentIndex] = bookMark;

  addBtn.innerHTML = "submit";
}

let siteRegx = /^[A-Za-z]{1,}$/;

function checkName() {
  if (siteRegx.test(nameInput.value)) {
    return true;
  } else {
    return false;
  }
}

nameInput.onkeyup = function () {
  if (checkName() == true) {
    nameAlert.innerHTML = "";
    addBtn.removeAttribute("disabled");
  } else {
    nameAlert.innerHTML = "Enter valid name";
    addBtn.disabled = "true";
  }
};

let websiteRegx = /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$/;


function checkUrl() {
  if (websiteRegx.test(urlInput.value)) {
    return true;
  } else {
    return false;
  }
}

urlInput.onkeyup = function () {
  if (checkUrl() == true) {
    urlAlert.innerHTML = "";
    addBtn.removeAttribute("disabled");
  } else {
    urlAlert.innerHTML = "Enter valid name";
    addBtn.disabled = "true";
  }
};

function validation() {
  if (urlInput.value !== "" && nameInput.value !== "") {
    return true;
  } else {
    return false;
  }
}

function isnameExist() {
  for (let i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name.toLowerCase() == nameInput.value.toLowerCase()) {
      return true;
    }
  }
}

function search(wordLetter) {
  let word = wordLetter;

  let box = "";
  for (let i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name.toLowerCase().includes(word.toLowerCase())) {
      textTosearch = word.replace(/[.**?^${}()|[\]\\]/g, "\\$&");
      let patern = new RegExp(`${textTosearch}`, "gi");
      box += `  <tr>
    <td>${bookMarks[i].name.replace(
      patern,
      (match) => `<span style="background-color:yellow">` + match + `</span>`
    )}</td>
      <td> <button class="btn btn-primary"><a class="link-color" href="${
        bookMarks[i].url
      }" target="_blank">visit</a></button></td>
      <td><button class="btn btn-info"  onclick="UpdateBook(${i})">Update</button></td>
      <td><button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button></td>
      </tr>`;
    }
  }
  tableBody.innerHTML = box;
}
