document.head.innerHTML += `<link id="loader-style" rel="stylesheet" href="styles/loader.css">`;

document.querySelector("html").style.overflowY = "hidden";

const loadBox = document.createElement("section");
loadBox.id = "load-box";
document.body.appendChild(loadBox);

const loader = document.createElement("div");
loader.classList.add("loader");
loadBox.appendChild(loader);

function onPageLoad() {
  setTimeout(() => {
    loader.classList.add("fade");

    setTimeout(() => {
      loadBox.remove();
      $("#loader-style").remove();
      document.querySelector("html").style.overflowY = "scroll";
    }, 500);
  }, 2000);
}
