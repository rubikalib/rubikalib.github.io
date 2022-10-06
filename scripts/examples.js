$("#header").onload = () => {
  fetch(`sources.json?${Date.now()}`)
    .then((data) => data.json())
    .then((result) => {
      const header = $("#header").contentDocument,
        h2 = header.querySelector(".firstViewChild > h2"),
        special = header.querySelector(".firstViewChild > .special");

      h2.innerHTML = "ربات های شما 🐱‍👤";
      special.innerHTML = "بریم ببینیم چی ساختین 🤯";

      const topics = Object.keys(result);

      let firstTopic = 0;

      for (const topic of topics) {
        const main = $("main > nav");
        main.innerHTML += `
        <button
          class="nav-link"
          data-bs-target="#${topic}-content"
          data-bs-toggle="tab"
          id="${topic}-btn"
        >
          ${result[topic].name}
        </button>
      `;

        if (result[topic].items.length > 0) {
          result[topic].items.reverse();
          result[topic].items.forEach((item) => {
            const developerLink = new URL(
              item.URL.replace(/(http|https):\/\/github.com(\/*)/i, "")
                .split("/")
                .splice(0, 2)
                .join("/"),
              "https://github.com"
            ).href;

            $(`main ul`).innerHTML += `
            <li class="tab-pane nav-item fade" id="${topic}-content">
              <a href="javascript:void(0)" class="nav-link product-name" download="${item.URL}">${item.name}</a>
              <a class="developer" href="${developerLink}" target="_blank">${item.developer}<a>
            </li>
          `;
          });
        } else {
          if (topic == topics[firstTopic] && firstTopic + 1 != topics.length) {
            firstTopic++;
          }

          $(`main ul`).innerHTML += `
        <li class="tab-pane nav-item fade d-flex justify-content-center" id="${topic}-content">
          <i class="fa fa-cloud"></i>
          <span class="empty">این بخش خالی است</span>
        </li>
      `;
        }
      }

      $(".product-name", (result) => {
        return result.length ? result : [result];
      }).forEach((el) => {
        const download = el.getAttribute("download"),
          name = download.split("/").pop();

        el.addEventListener("click", () => {
          Swal.fire({
            title: "ایا واقعا میخواهید این فایل را دانلود کنید ؟ ",
            icon: "question",
            text: `نام فایل: ${name}`,
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            denyButtonText: "خیر",
          }).then((result) => {
            if (result.isConfirmed) {
              goto(download, "_blank");
              sendMessage("دانلود با موفقیت انجام شد", "success");
            } else if (result.isDenied) {
              sendMessage("عملیات با موفقیت لغو شد", "warning");
            }
          });
        });
      });

      firstTopic = topics[firstTopic];
      $(`#${firstTopic}-btn`).classList.add("active");
      $(`#${firstTopic}-content`).classList.add("active", "show");

      checkUrl(
        [
          {
            key: null,
            do: (topic) => {
              scrollTo(0, innerHeight);
              $(`#${topic}-btn`).click();
            },
          },
        ],
        ["#"]
      );

      loaded.datas = $("main").innerText == "";
      onDatasLoaded();
    });
};
