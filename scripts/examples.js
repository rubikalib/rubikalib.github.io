function XHR() {
  var db;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.status == 200) {
      db = JSON.parse(this.responseText);
      for (var groupSource of db.groups) {
        document.getElementById("groups").innerHTML += `
				<div class="item">
				<a href="${groupSource.URL}"><div class="right">${groupSource.name}</div></a>
				<div class="left">
				${groupSource.developer}
				</div>
				</div>
				`;
      }
      for (var channelSource of db.channels) {
        document.getElementById("channels").innerHTML += `
				<div class="item" onclick="goto('${channelSource.URL}');">
				<a href="${channelSource.URL}"><div class="right">${channelSource.name}</div></a>
				<div class="left">
				${channelSource.developer}
				</div>
				</div>
				`;
      }
      for (var pvSource of db.privates) {
        document.getElementById("privates").innerHTML += `
				<div class="item" onclick="goto('${pvSource.URL}');">
				<a href="${pvSource.URL}"><div class="right">${pvSource.name}</div></a>
				<div class="left">
				${pvSource.developer}
				</div>
				</div>
				`;
      }
      for (var multiSource of db.multiplatforms) {
        document.getElementById("multiplatforms").innerHTML += `
				<div class="item" onclick="goto('${multiSource.URL}');">
				<a href="${multiSource.URL}"><div class="right">${multiSource.name}</div></a>
				<div class="left">
				${multiSource.developer}
				</div>
				</div>
				`;
      }
    }
  };
  var d = new Date();
  xhr.open("GET", `../sources.json?${d.getTime()}`, false);
  xhr.send();
}
setInterval(XHR(), 1000);

// theme settings
if (window.localStorage.getItem("theme") === "dark") {
  document.getElementsByTagName("head")[0].innerHTML +=
    '<link rel="stylesheet" href="styles/dark/index.css"/><link rel="stylesheet" href="styles/dark/examples.css"/>';
  document.getElementsByTagName("nav")[0].className =
    "nav bg-dark toolbar fixed-top";
}

document.querySelectorAll("div.item").forEach((el) => {
  el.onclick = async function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    ripple.style.background = "#ccc";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 800);
    await new Promise((resolve) => setTimeout(resolve, 600));
  };
});

function goto(link, target = "_self") {
  try {
    document.body.removeChild(document.getElementById("clickme"));
  } catch (e) {
    console.log(e);
  }
  document.body.innerHTML += `<a href="${link}" target="${target}" id="clickme"></a>`;
  document.getElementById("clickme").click();
}
