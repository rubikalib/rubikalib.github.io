const loaded = {
  footer: false,
  header: false,
  datas: false,
};

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

  if (!$("#header")) {
    loaded.header = true;
    setTimeout(() => {
      onDatasLoaded(loaded);
    }, 2000);
  } else {
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
        onDatasLoaded(loaded);
      }, 2000);
    });
  }

  if (!$("#footer")) {
    loaded.footer = true;
    setTimeout(() => {
      onDatasLoaded(loaded);
    }, 2000);
  } else {
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
        onDatasLoaded(loaded);
      }, 2000);
    };
  }

  setTimeout(() => {
    onDatasLoaded(loaded);
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

function onDatasLoaded(loaded) {
  if (!location.href.replace(location.origin, "").includes("htm")) {
    goto("index.html");
  }

  if (!$("#theme")) {
    if (loaded.header) {
      console.log("header loaded");
    }

    if (loaded.footer) {
      console.log("footer loaded");
    }

    if (loaded.datas) {
      console.log("datas loaded");

      // if(!(loaded.footer && loaded.header)){
      //   reload()
      // }
    }
  }

  if (loaded.header && loaded.footer && loaded.datas) {
    if (!$("main") || $("main").innerText != "") {
      if (!$("#theme")) {
        const theme = document.createElement("script");
        theme.id = "theme";
        theme.src = "./scripts/theme.js?" + Date.now();
        document.body.appendChild(theme);
      }
    } else {
      reload();
    }
  }else if(!loaded.datas){
    reload()
  }
}

function reload() {
  let suffix;
  if (location.href.includes("?")) suffix = "&";
  else suffix = "?";

  suffix += "i=";
  console.log("reload");
  sendMessage("page datas didn't load", "error");

  if (location.href.includes("i=")) {
    location.reload();
  } else {
    location.replace(location.href + suffix + Date.now());
  }
}
