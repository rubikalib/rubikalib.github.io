const texts = [
  "<i class='fa fa-home ms-1'></i> خانه",
  "<i class='fa fa-book ms-1'></i> مستندات",
  "<i class='fa fa-bullhorn ms-1'></i> اخبار",
  "<i class='fa fa-comments ms-1'></i> گفتگو",
  "<i class='fa fa-user-circle-o ms-1'></i> پشتیبانی",
  "<i class='fa fa-moon-o ms-1'></i> حالت شب",
  "<i class='fa fa-code ms-1'></i> نمونه‌ها",
  "<i class='fa fa-file ms-1'></i> مجوز",
  "<i class='fa fa-users ms-1'></i> درباره‌ما",
];

const events = [
  "index.html",
  "docs.html",
  "https://t.me/rubikalib",
  "https://t.me/rubikalibGP",
  "https://t.me/Bprogrammer",
  `${location.href}?theme=darkmode`,
  "examples.html",
  "showLicense",
  "about.html",
];

checkUrl([
  {
    key: "darkmode",
    do: () => {
      localStorage.setItem("theme", "dark");
    },
  },
  {
    key: "lightmode",
    do: () => {
      localStorage.setItem("theme", "light");
    },
  },
]).then(() => {
  if (window.localStorage.getItem("theme") === "dark") {
    document.head.innerHTML +=
      '<link rel="stylesheet" href="styles/dark/index.css"/>';
    document.body.innerHTML +=
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/themes@5.0.2/wordpress-admin/wordpress-admin.css" />';
    texts[5] = "<i class='fa fa-sun-o'></i> حالت روز";
    events[5] = events[5].replace(/darkmode/g, "lightmode");
  }

  $("#header").onload = () => {
    const header = $("#header").contentDocument,
      menu = header.querySelector("#menu");

    for (var i = 0; i <= texts.length - 1; i++) {
      const li = document.createElement("li");
      li.classList.add("nav-item");
      li.innerHTML = `
      <a href="javascript:void(0)" event="${events[i]}" class="nav-link fw-bold">${texts[i]}</a>
    `;

      menu.appendChild(li);
    }

    header.querySelectorAll(".nav-link").forEach((element) => {
      element.onclick = () => {
        const attr = element.getAttribute("event");
        if (attr === "showLicense") {
          showLicense();
        } else {
          goto(attr);
        }
      };
    });

    header.querySelector("a.special").onclick = () => {
      window.scrollTo(0, innerHeight);
    };
  };

  $("#footer").onload = () => {
    const footer = $("#footer").contentDocument;
    footer.querySelectorAll(".nav-link").forEach((element) => {
      element.onclick = () => {
        const attr = element.getAttribute("event");
        goto(attr);
      };
    });
  };
});

function showLicense() {
  fetch("LICENSE")
    .then((data) => data.text())
    .then((result) => {
      result = result.replace("\n", "<br>");
      Swal.fire("", result);
    });
}

async function goto(link = "") {
  const a = document.createElement("a");
  a.href = "../redirect.htm?redirect=" + link;
  a.click();
}

(async function noCache() {
  $("*[src]").forEach((el) => {
    el.src = el.src + "?" + Date.now();
  });

  $("*[href]").forEach((el) => {
    el.href = el.href + "?" + Date.now();
  });
})();
