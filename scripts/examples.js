var db;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
	if (this.status == 200) {
		db = JSON.parse(this.responseText);
		for (var groupSource of db.groups) {
			document.getElementById("groups").innerHTML += `
			<div class="item">
			<div class="right">
			<a href="${groupSource.URL}">${groupSource.name}</a>
			</div>
			<div class="left">
			${groupSource.developer}
			</div>
			</div>
			`;
		}
		for (var channelSource of db.channels) {
			document.getElementById("channels").innerHTML += `
			<div class="item" onclick="download('${channelSource.URL}');">
			<div class="right">
			<a href="${channelSource.URL}">${channelSource.name}</a>
			</div>
			<div class="left">
			${channelSource.developer}
			</div>
			</div>
			`;
		}
		for (var pvSource of db.privates) {
			document.getElementById("privates").innerHTML += `
			<div class="item" onclick="download('${pvSource.URL}');">
			<div class="right">
			<a href="${pvSource.URL}">${pvSource.name}</a>
			</div>
			<div class="left">
			${pvSource.developer}
			</div>
			</div>
			`;
		}
		for (var multiSource of db.multiplatforms) {
			document.getElementById("multiplatforms").innerHTML += `
			<div class="item" onclick="download('${multiSource.URL}');">
			<div class="right">
			<a href="${multiSource.URL}">${multiSource.name}</a>
			</div>
			<div class="left">
			${multiSource.developer}
			</div>
			</div>
			`;
		}
	}
};
xhr.open("GET", "../sources.json", false);
xhr.send();

console.log(document.getElementById("groups").childNodes[0]);

// theme settings
if (window.localStorage.getItem("theme") === "dark") {
	document.getElementsByTagName("head")[0].innerHTML += '<link rel="stylesheet" href="styles/dark/index.css"/>';
	document.getElementsByTagName("nav")[0].className = "nav bg-dark toolbar fixed-top";
}

document.querySelectorAll('div.item').forEach(el => {
	el.onclick = async function(e) {
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
		await new Promise(resolve => setTimeout(resolve, 600));

		/*
		**	Swal.fire({
		**		title: 'دانلود',
		**		text: `آیا میخواهید سورس کد ${el.childNodes[1].innerHTML.replace(/\s/g, "")} را دانلود کنید؟`,
		**		confirmButtonText: 'بله',
		**		showClass: {
		**			popup: 'animate__animated animate__fadeInDown'
		**		}
		**	}).then(function () {
		**		const Toast = Swal.mixin({
		**			toast: true,
		**			position: 'bottom-start',
		**			showConfirmButton: false,
		**			timer: 2000,
		**			timerProgressBar: true,
		**			didOpen: (toast) => {
		**				toast.addEventListener('mouseenter', Swal.stopTimer);
		**				toast.addEventListener('mouseleave', Swal.resumeTimer);
		**			}
		**		});
		**		Toast.fire({
		**			icon: 'success',
		**			title: 'دانلود آغاز شد'
		**		});
		**	});
		*/
	};
});

function goto(link, target = "_self") {
	try {
		document.body.removeChild(document.getElementById("clickme"));
	}catch(e) {
		console.log(e)}
	document.body.innerHTML += `<a href="${link}" target="${target}" id="clickme"></a>`;
	document.getElementById("clickme").click();
}