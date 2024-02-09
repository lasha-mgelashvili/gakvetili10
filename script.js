//  10

//!               ცვლადები

let mainDivWraper = document.getElementById("posts-wraper");
let overlay = document.getElementById("overlay");
let postContentInfo = document.getElementById("contentPost");
let overlayClose = document.getElementById("close");

//!       მთავარი ფუნქცია რომლის ვაკითხავთ სერვერს

function ajax(url, callback) {
  let requist = new XMLHttpRequest();
  requist.open("GET", url);
  requist.addEventListener("load", function () {
    let infoDataJs = JSON.parse(this.responseText);
    callback(infoDataJs);
  });
  requist.send();
}

//!      მთავარი ფუნქციის გამოზახება

ajax("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach((obj) => {
    createDiv(obj);
  });
});

//!       ვქმნით პოსტს =>  დივის სტრუქტურას

function createDiv(item) {
  let divElement = document.createElement("div");
  divElement.classList.add("postElement");
  divElement.setAttribute("data-id", item.id);

  let h3Title = document.createElement("h3");
  h3Title.textContent = item.id;

  let h2Title = document.createElement("h2");
  h2Title.textContent = item.title;

  divElement.appendChild(h3Title);
  divElement.appendChild(h2Title);

  //!             დივის დაჭერაზე ვამატებ ახალ ფანჯარას

  divElement.addEventListener("click", function () {
    let divId = this.getAttribute("data-id");

    console.log(divId);
    overlay.classList.add("activeOverlay");
    let newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;
    // openOverlay();
    // console.log(newUrl);
    ajax(newUrl, function (mtlianiObj) {
      description(mtlianiObj);
    });
  });

  mainDivWraper.append(divElement);
}

//!          დაჭერილლი პოსტის დეტალური ინფორმაციიის წამოღება

function description(item) {
  let p = document.createElement("p");
  p.textContent = item.body;

  postContentInfo.appendChild(p);
}

// function openOverlay(id) {
//   let newUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
//   ajax(newUrl, function (mainObj) {
//     console.log(mainObj);
//   });
//   console.log(id);
// }
// function description(item) {
//   let pDescription = document.createElement("p");
//   pDescription.textContent = item.body;
// }

//!         overlay - დახურვის ლოგიკა

overlayClose.addEventListener("click", function () {
  overlay.classList.remove("activeOverlay");
});
