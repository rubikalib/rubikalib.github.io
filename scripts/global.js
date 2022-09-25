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
  const dark = window.localStorage.getItem("theme") === "dark";
  if (dark) {
    document.head.innerHTML +=
      '<link rel="stylesheet" href="styles/dark/index.css"/>';
    document.body.innerHTML +=
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/themes@5.0.2/wordpress-admin/wordpress-admin.css" />';
  }

  $("#header").addEventListener("load", function () {
      const header = $("#header").contentDocument;

      header.querySelectorAll(".nav-link").forEach((element, i) => {
        if (i == 5 && dark) {
          element.innerHTML = element.innerHTML
            .replace("moon", "sun")
            .replace("شب", "روز");

          element.setAttribute(
            "event",
            element.getAttribute("event").replace(/darkmode/g, "lightmode")
          );
        }

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

      header.querySelector("a.navbar-brand").onclick = () => {
        if (location.href == location.origin + location.pathname)
          goto("index.html");
      };
  });

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
