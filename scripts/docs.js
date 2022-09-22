var db;
var keys;
function loader() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.status == 200) {
      db = JSON.parse(this.responseText);
      keys = this.responseText.match(/"\d\.\d\.\d/g);
    }
  };
  var d = new Date();
  xhr.open("GET", `../db.json?${d.getTime()}`, false);
  xhr.send();
}
setInterval(loader(), 2000);

try {
  var version = document.URL.split("&")[0].split("?v=")[1].split("#")[0];
  var descriptions = db[version].descriptions;
  var links = db[version].links;
  var titles = db[version].titles;
  document.getElementsByClassName("toolbar-text")[0].innerHTML += " " + version;
} catch (e) {
  if (window.localStorage.getItem("theme") === "dark") {
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/dark/index.css"/>';
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/dark/docs.css"/>';
    document.getElementsByTagName("nav")[0].className =
      "nav bg-dark toolbar fixed-top";
  } else if (window.localStorage.getItem("theme") === "light") {
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/index.css"/>';
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/docs.css"/>';
  }

  for (var key of keys) {
    var v = key.replace(/\"/g, "");
    document.getElementsByClassName(
      "content"
    )[0].innerHTML += `<div class="data" dir="rtl"><a href="?v=${v}"><b class="titr">مستندات نسخهٔ : ${v}</b></a><br><div style="text-align: right!important;">${db[v].details.commit}</div><div class="release-time"><i class="fa fa-clock"></i> ${db[v].details.date}</div>`;
  }
}

// function for add elements
(function () {
  for (var i = 0; i < titles.length; i++) {
    let splitedDesc = descriptions[i].split(" ");
    let preview = "";
    for (var j = 0; j <= 20; j++) {
      preview += splitedDesc[j] + " ";
    }
    preview += "...";
    document.getElementsByClassName(
      "gradient-list"
    )[0].innerHTML += `<li id="${links[i]}"><span class="text" dir="rtl"><a href="?v=${version}&doc=${links[i]}" onclick="checkUrl();"><b class="list-item-title">${titles[i]}</b></a><br /><span class="list-item-description">${preview}</span></span></li>`;
  }
})();

// function for checking urls and returns correct result
var sourceCode = document.getElementsByClassName("content")[0].innerHTML;
function checkUrl() {
  var index = links.indexOf(document.URL.split("&doc=")[1]);
  var titr = titles[index];
  var data = descriptions[index];

  if (data !== undefined) {
    document.getElementsByClassName(
      "content"
    )[0].innerHTML = `<div class="data"><b class="titr">${titr}</b><br><br><div dir='rtl' style='text-align: right;'>${data}</div>${
      index != 0
        ? `<button class="back" onclick="loadDocByIndex('${version}',${
            index - 1
          });">${titles[index - 1]}</button>`
        : ""
    }${
      index != links.length - 1
        ? `<button class="next" onclick="loadDocByIndex('${version}',${
            index + 1
          });">${titles[index + 1]}</button>`
        : ""
    }</div>`;
    document.getElementsByClassName("content")[0].style =
      "padding-top: 24px; padding-left: 8px; padding-right: 8px;";

    document.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });
  } else {
    document.getElementsByClassName("content")[0].innerHTML = sourceCode;
    document.getElementsByClassName("content")[0].style = "padding-top: 0px;";
  }

  if (window.localStorage.getItem("theme") === "dark") {
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/dark/index.css"/>';
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/dark/docs.css"/>';
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css"/>';
    document.getElementsByTagName("nav")[0].className =
      "nav bg-dark toolbar fixed-top";
  } else if (window.localStorage.getItem("theme") === "light") {
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/index.css"/>';
    document.getElementsByTagName("head")[0].innerHTML +=
      '<link rel="stylesheet" href="styles/docs.css"/>';
  }
}

function loadDocByIndex(version, index) {
  document.body.innerHTML += `<a href="?v=${version}&doc=${links[index]}" id="clickme"></a>`;
  document.getElementById("clickme").click();
}
