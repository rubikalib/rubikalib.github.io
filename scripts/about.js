function checkUrl() {
  console.log(localStorage.getItem("theme"));
  if (window.localStorage.getItem("theme") === "dark") {
    //document.getElementsByTagName("link")[2].remove();
    //document.getElementsByTagName("link")[3].remove();
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/dark/index.css"/>';
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/dark/about.css"/>';
  }
}
