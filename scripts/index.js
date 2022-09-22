var Click = 0;
var menuButton = document.getElementsByClassName("btn-menu")[0];
var lastSource = "";
var texts = [
	"<i class='fa fa-book'></i> مستندات",
	"<i class='fa fa-bullhorn'></i> اخبار",
	"<i class='fa fa-comments'></i> گفتگو",
	"<i class='fa fa-user-circle-o'></i> پشتیبانی",
	"<i class='fa fa-moon-o'></i> حالت شب",
	"<i class='fa fa-code'></i> نمونه‌ها",
	"<i class='fa fa-file'></i> مجوز",
	"<i class='fa fa-users'></i> درباره‌ما",
];
var events = [
	"goto(\"docs.html\");",
	"goto(\"https://t.me/rubikalib\");",
	"goto(\"https://t.me/rubikalibGP\");",
	"goto(\"https://t.me/Bprogrammer\");",
	"goto(\"?darkmode\");",
	"goto(\"examples.html\");",
	"showLicense();",
	"goto(\"about.html\");"
];
async function menu() {
	if (Click%2 == 0) {
		// open menu
		lastSource = document.getElementsByTagName("div")[0].innerHTML;
		document.body.style = "padding: 0;margin: 0;";
		document.body.className = "items";
		document.getElementsByTagName("div")[0].innerHTML = `<nav class="nav toolbar fixed-top"><img src="assets/logo.png" alt="[logo]" class="toolbar-image"/><span class="toolbar-text">rubika</span></nav><div class='itemss'><br/><br/><center class='items-org'></center></div><br/><br/>`;
		for (var i = 1; i <= texts.length; i++) {
			document.getElementsByClassName("items-org")[0].innerHTML += `<button class='btn btn-item btn-outline-dark col-4' onclick='${events[i-1]}'>${texts[i-1]}</button>`;
		}
		menuButton.innerHTML = `<i class="fa fa-close"></i>`;
	} else {
		// close menu
		menuButton.innerHTML = `<i class="fa fa-bars"></i>`;
		document.getElementsByTagName('div')[0].innerHTML = lastSource;
		document.body.className = "";
	}
	Click++;
}

var lastLocation = 0;
function scrolled(count) {
	if (count.scrollY < lastLocation) {
		menuButton.hidden = false;
	} else {
		menuButton.hidden = true;
		menuButton.classList.add('hided');
	}
	lastLocation = count.scrollY;
}

function checkUrl() {

	var data = document.URL.split("?")[1];
	if (data === "darkmode") {
		localStorage.setItem("theme", "dark");
	} else if (data === "lightmode") {
		localStorage.setItem("theme", "light");
	}

	if (window.localStorage.getItem("theme") === "dark") {
		document.head.innerHTML += '<link rel="stylesheet" href="styles/dark/index.css"/>';
		//document.body.innerHTML += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/themes@5.0.2/wordpress-admin/wordpress-admin.css" />';
		texts[4] = "<i class='fa fa-sun-o'></i> حالت روز";
		events[4] = "goto(\"?lightmode\");";
		document.getElementsByClassName("btn-menu")[0].onclick = async function(e) {
			if (Click%2 == 0) {
				// open menu
				lastSource = document.getElementsByTagName("div")[0].innerHTML;
				document.body.style = "padding: 0;margin: 0;";
				document.body.className = "items";
				document.getElementsByTagName("div")[0].innerHTML = `<nav class="nav toolbar fixed-top"><img src="assets/logo.png" alt="[logo]" class="toolbar-image"/><span class="toolbar-text">rubika</span></nav><div class='itemss'><br/><br/><center class='items-org'></center></div><br/><br/>`;
				for (var i = 1; i <= texts.length; i++) {
					document.getElementsByClassName("items-org")[0].innerHTML += `<button class='btn btn-item btn-outline-light col-4' onclick='${events[i-1]}'>${texts[i-1]}</button>`;
				}
				menuButton.innerHTML = `<i class="fa fa-close"></i>`;
			} else {
				// close menu
				menuButton.innerHTML = `<i class="fa fa-bars"></i>`;
				document.getElementsByTagName('div')[0].innerHTML = lastSource;
				document.body.className = "";
			}
			Click++;
		};
	}
}

async function goto(link) {
	// wait for loading hover effects
	await new Promise(resolve => setTimeout(resolve, 260));

	// loading url
	document.getElementById("clickMe").href = link;
	document.getElementById('clickMe').click();
}

function showLicense() {
	localStorage.getItem("theme") == "dark" ? document.body.innerHTML += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/themes@5.0.2/wordpress-admin/wordpress-admin.css" />"/': "";
	Swal.fire(
		"MIT License",
		`MIT License

		Copyright (c) Bahman Ahmadi\n\n

		Permission is hereby granted, free of charge, to any person obtaining a copy\n
		of this software and associated documentation files (the "Software"), to dea\n
		in the Software without restriction, including without limitation the rights\n
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n
		copies of the Software, and to permit persons to whom the Software is\n
		furnished to do so, subject to the following conditions:\n\n

		The above copyright notice and this permission notice shall be included in a\n
		copies or substantial portions of the Software.\n\n

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM\n
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN TH\n
		SOFTWARE.`,
		"info",
		100
	).then(function() {
			document.styleSheets.pop();
		});
}