var siteNameInput = document.getElementById("siteName");
var webNameInput = document.getElementById("webName");
var tableContent = document.getElementById("tableContent");
var bookmarkList;
if (localStorage.getItem("bookmarkList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayProduct(bookmarkList);
} else {
  bookmarkList = [];
}
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function addUrl() {
  var bookmarks = {
    name: siteNameInput.value,
    webSite: webNameInput.value,
  };
  if (!isValidURL(webNameInput.value)) {
    window.alert("Invalid URL. Please enter a valid website URL.");
    return;
  }

  bookmarkList.push(bookmarks);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  clearForm();
  displayProduct(bookmarkList);
}
function isValidURL(url) {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return regex.test(url);
}
function clearForm() {
  siteNameInput.value = "";
  webNameInput.value = "";
}

function displayProduct(list) {
  var cartoona = ``;
  for (var i = 0; i < list.length; i++) {
    var userURL = list[i].webSite;
    var httpsRegex = /^https?:\/\//g;
    if (httpsRegex.test(userURL)) {
      validURL = userURL;
      fixedURL = validURL
        .split("")
        .splice(validURL.match(httpsRegex)[0].length)
        .join("");
    } else {
      var fixedURL = userURL;
      validURL = `https://${userURL}`;
    }
    cartoona += ` 
      <tr>
          <td>${i + 1}</td>
          <td>${list[i].name}</td>              
          <td>
            <button class="btn btn-success" data-index="${i}">
              <i class="fa-solid fa-eye pe-2"></i><a class="text-decoration-none text-white" href="${validURL}" target="_blank">visit</a>
            </button>
          </td>
          <td>
            <button class="btn btn-danger pe-2" onclick="deleteProduct(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td>
      </tr>`;
  }
  tableContent.innerHTML = cartoona;
}

function deleteProduct(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayProduct(bookmarkList);
}
