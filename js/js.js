var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var bookmarks = [];

loadBookmarks();

function loadBookmarks() {
  if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    bookmarks.forEach(displayBookmark);
  }
}

function displayBookmark(bookmark, index) {
  var newBookmark = `
    <tr>
      <td>${index + 1}</td>
      <td>${bookmark.siteName}</td>              
      <td>
        <button class="btn btn-visit" data-index="${index}">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button class="btn btn-delete pe-2" data-index="${index}">
          <i class="fa-solid fa-trash-can"></i>Delete
        </button>
      </td>
    </tr>
  `;

  tableContent.insertAdjacentHTML("beforeend", newBookmark);
}

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmark, bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  }
});

tableContent.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    deleteBookmark(e.target.dataset.index);
  } else if (e.target.classList.contains("btn-visit")) {
    visitWebsite(e.target.dataset.index);
  }
});

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  renderBookmarks();
}

function visitWebsite(index) {
  var websiteURL = bookmarks[index].siteURL;
  window.open(
    websiteURL.startsWith("http") ? websiteURL : `https://${websiteURL}`,
    "_blank"
  );
}

function validate(element, regex) {
  var isValid = regex.test(element.value);
  element.classList.toggle("is-valid", isValid);
  element.classList.toggle("is-invalid", !isValid);
}

siteName.addEventListener("input", function () {
  validate(siteName, /^\w{3,}(\s+\w+)*$/);
});

siteURL.addEventListener("input", function () {
  validate(
    siteURL,
    /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
  );
});

function renderBookmarks() {
  tableContent.innerHTML = "";
  bookmarks.forEach(displayBookmark);
}
