function showLicense() {
  fetch("LICENSE")
    .then((data) => data.text())
    .then((result) => {
      result = result.replace("\n", "<br>");
      $("html").style.overflowY = "hidden";
      Swal.fire("", result).then(() => {
        $("html").style.overflowY = "scroll";
      });
    });
}
