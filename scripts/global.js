if (localStorage.getItem("theme") === null) {
  localStorage.setItem(
    "theme",
    matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
}

checkUrl([
  {
    key: "darkmode",
    do: () => {
      localStorage.setItem("theme", "dark");
      location.reload();
    },
  },
  {
    key: "lightmode",
    do: () => {
      localStorage.setItem("theme", "light");
      location.reload();
    },
  },
]).then(() => {
  const dark = window.localStorage.getItem("theme") === "dark";

  const loaded = {
    footer: false,
    header: false,
  };

  if (!$("#header")) loaded.header = true;
  else
    $("#header").addEventListener("load", function () {
      const header = $("#header").contentDocument;

      header.querySelectorAll(".nav-link").forEach((element, i) => {
        if (i == 5) {
          element.setAttribute(
            "event",
            location.href + element.getAttribute("event")
          );

          if (dark) {
            element.innerHTML = element.innerHTML
              .replace("moon", "sun")
              .replace("شب", "روز");

            element.setAttribute(
              "event",
              element.getAttribute("event").replace(/darkmode/g, "lightmode")
            );
          }
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
        goto("index.html");
      };

      header.querySelector(".navbar-toggler-icon").onclick = () => {
        $("#header").setAttribute("open", "");
        $("html").style.overflowY = "hidden";
      };

      header.querySelector(".btn-close").onclick = () => {
        $("#header").removeAttribute("open");
        $("html").style.overflowY = "";
      };

      loaded.header = true;

      setTimeout(() => {
        onDatasLoaded(loaded.header, loaded.footer);
      }, 2000);
    });

  if (!$("#footer")) loaded.footer = true;
  else
    $("#footer").onload = () => {
      const footer = $("#footer").contentDocument;
      footer.querySelectorAll(".nav-link").forEach((element) => {
        element.onclick = () => {
          const attr = element.getAttribute("event");
          goto(attr, "_blank");
        };
      });

      loaded.footer = true;

      setTimeout(() => {
        onDatasLoaded(loaded.header, loaded.footer);
      }, 2000);
    };

  setTimeout(() => {
    onDatasLoaded(loaded.header, loaded.footer);
  }, 2000);
});

function showLicense() {
  fetch("LICENSE")
    .then((data) => data.text())
    .then((result) => {
      result = result.replace("\n", "<br>");
      Swal.fire("", result);
    });
}

async function goto(link = "", target = "") {
  const a = document.createElement("a");
  let url = location.origin;

  if (
    location.pathname.split("/").length > 3 ||
    window.location.pathname.split(".").length !== 2
  ) {
    url = location.origin + "/" + location.pathname.split("/")[1];
  }

  url += url.endsWith("/") ? "" : "/";

  a.href = url + "redirect.htm?redirect=" + link;
  a.target = target;
  a.click();
}

function onDatasLoaded(header, footer) {
  if (!$("#theme")) {
    if (header) {
      console.log("header loaded");
    }

    if (footer) {
      console.log("footer loaded");
    }
  }

  if (header && footer) {
    if ($("main") && $("main").innerText == "") {
      console.log("reload");
      sendMessage("page datas didn't load", "error");
      location.reload();
    } else if (!$("#theme")) {
      console.log("datas loaded");

      const theme = document.createElement("script");
      theme.id = "theme";
      theme.src = "./scripts/theme.js?" + Date.now();
      document.body.appendChild(theme);
    }
  }
}
