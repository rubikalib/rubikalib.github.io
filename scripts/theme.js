const theme =
  localStorage.getItem("theme") !== null
    ? localStorage.getItem("theme")
    : matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const documents = [document];

if ($("#footer") === undefined) documents.push(null);
else documents.push($("#footer").contentDocument);
if ($("#header") === undefined) documents.push(null);
else documents.push($("#header").contentDocument);

function doForAllDoc(doWhat = () => {}) {
  documents.forEach((doc) => {
    if (doc !== null) doWhat(doc);
  });
}

doForAllDoc((document) => {
  document.head.innerHTML += `<link rel="stylesheet" href="${location.origin}/styles/theme/${theme}.css">`;
});

if (theme == "light") {
  console.log(theme);

  if (documents[2]) {
    documents[2].querySelector(".navbar").classList.add("text-bg-light");
  }
} else if (theme == "dark") {
  console.log(theme);

  if (documents[2]) {
    documents[2].querySelector(".navbar").classList.add("navbar-dark");
    documents[2].querySelector(".offcanvas").classList.add("bg-dark");
    documents[2].querySelector(".btn-close").classList.add("btn-close-white");
  }

  doForAllDoc((document) => {
    document.body.classList.add(`text-bg-dark`);
  });

  document.head.innerHTML += `<link rel="stylesheet" href="./libs/sweetalert-dark.css" />`;

  if ($("main")) $("main").classList.add("bg-dark");

  if ($(".text-secondary"))
    $(".text-secondary").classList.replace("text-secondary", "text-light");
  if ($(".border-secondary"))
    $(".border-secondary").classList.replace(
      "border-secondary",
      "border-light"
    );

  if ($("main .card"))
    $("main .card").forEach((el) => {
      el.classList.add("bg-dark");

      if (el.querySelector(".text-primary"))
        el.querySelector(".text-primary").classList.replace(
          "text-primary",
          "text-warning"
        );
    });
}
