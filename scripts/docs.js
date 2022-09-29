fetch(`db.json?${Date.now() + Math.random()}`)
  .then((data) => data.json())
  .then((result) => {
    const db = result,
      keys = Object.keys(result);

    let version = undefined;

    checkUrl([
      {
        key: "v",
        do: (v) => {
          version = v;
        },
      },
    ]).then(() => {
      let descriptions = undefined,
        links = undefined,
        titles = undefined;

      $("#header").onload = () => {
        const header = $("#header").contentDocument,
          brand = header.querySelector(".navbar-brand"),
          h2 = header.querySelector(".firstViewChild > h2"),
          special = header.querySelector(".firstViewChild > .special");

        try {
          descriptions = db[version].descriptions;
          links = db[version].links;
          titles = db[version].titles;
        } catch (e) {
          keys.reverse();
          for (const i in keys) {
            const v = keys[i];

            $("main").innerHTML += `
              <div class="col-12 mb-5" data-aos="fade-up" data-aos-anchor-placement="top-center">
                <div class="card rounded-4">   
                  <a href="?v=${v}?${Date.now()}">
                    <div class="card-body">
                      <h5 class="card-title text-center">
                        مستندات نسخهٔ : ${v}

                        ${
                          i == 0
                            ? `<span style="font-size:1rem" class="badge text-bg-primary fw-normal rounded-pill"> new </span>`
                            : ""
                        }
                      </h5>

                      <p class="card-text">
                        ${db[v].details.commit}
                      </p>
                      <span class="text-primary float-start mb-2">
                        <i class="fa fa-clock-o"></i> ${db[v].details.date}
                      </span>
                    </div>
                  </a>
                </div> 
              </div>
            `;
          }

          h2.innerHTML = "مستندات کتابخونهٔ روبیکا";
          special.innerHTML = "انتخاب نسخه 🕵️‍♂️";

          return e;
        }

        checkUrl([
          {
            key: "doc",
            do: (data) => {
              // function for checking urls and returns correct result

              let index;
              links.forEach((val, i) => {
                if (val === data) {
                  index = i;
                  return void 0;
                }
              });

              const title = titles[index],
                desc = descriptions[index];

              if (desc !== undefined) {
                const main = $("main");

                brand.innerHTML += " " + version;
                h2.innerHTML = `آموزش ${title} در کتابخونهٔ روبیکا ورژن ${version}`;
                special.innerHTML = `بریم ببینیم 😵`;
                $("title").innerHTML = title;
                brand.onclick = () => {
                  location.assign(
                    location.origin + location.pathname + `?v=${version}`
                  );
                };

                main.classList.remove("container-md");
                main.style.backgroundColor = "white";

                main.innerHTML = `
                <section class="container-md document">
                  <h3 class="text-center text-secondary p-2">${title}</h3>
                  <div class="utils nav nav-pills nav-fill w-25">
                    <button title="کپی ادرس پست" class="fa fa-link nav-link"></button>
                    <button title="اشتراک گذاری" class="fa fa-share nav-link"></button>
                  </div>
                  <hr class="border-secondary">
                  <article>
                    ${desc}
                  </article>
                    ${
                      index != 0
                        ? `<a onclick="loadDoc('${version}',${`'${
                            links[index - 1]
                          }'`});" href="javascript:void(0)" title="${
                            titles[index - 1]
                          }" class="arrow fa fa-arrow-left fs-3 rounded-pill"></a>`
                        : ""
                    }

                    ${
                      index != links.length - 1
                        ? `<a onclick="loadDoc('${version}',${`'${
                            links[index + 1]
                          }'`});" href="javascript:void(0)" title="${
                            titles[index + 1]
                          }" class="arrow fa fa-arrow-right fs-3 rounded-pill"></a>`
                        : ""
                    }
                  </section>
              `;

                main.querySelectorAll("pre").forEach(function (el) {
                  el.setAttribute("data-aos", "fade-up");

                  const copy = document.createElement("button");
                  copy.classList.add("copy", "fa", "fa-copy");
                  copy.title = "کپی کردن کد";

                  el.appendChild(copy);

                  copy.addEventListener("click", () => {
                    navigator.clipboard.writeText(
                      el.querySelector("code").textContent
                    );

                    sendMessage("کد با موفقیت کپی شد");
                  });

                  main.querySelectorAll("pre code").forEach((code) => {
                    hljs.highlightElement(code);
                  });
                });

                $(".fa-link").onclick = () => {
                  navigator.clipboard.writeText(location.href);
                  sendMessage("ادرس کپی شد");
                };

                $(".fa-share").onclick = () => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "This is header/title",
                        text:
                          getTextWithoutHtml(desc).slice(0, 50).trim() + "...",
                        url: location.href,
                      })
                      .catch(() =>
                        sendMessage("خطا هنگام بارگذاری اطلاعات", "error")
                      );
                  } else {
                    sendMessage(
                      "قابلیت اشتراک گذاری در مرورگر شما فعال نمی باشد لطفا از مرورگر دیگری استفاده کنید",
                      "error"
                    );
                  }
                };
              } else {
                document.body.removeChild($("main"));
                document.body.removeChild($("#header"));

                const error = document.createElement("img");
                error.id = "error";
                error.src = "./assets/404.svg";

                document.body.insertBefore(error, $("#footer"));

                  Swal.fire({
                    title: "صفحه ی مورد نظر یافت نشد",
                    text: `ایا مایلید به صفحه ی اموزشات ورژن ${version} بروید`,
                    icon: "error",
                    showDenyButton: true,
                    showCloseButton: true,
                    confirmButtonText: "ورود",
                    denyButtonText: "خیر",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      location.assign(
                        location.origin +
                          location.pathname +
                          `?v=${version}&${Date.now() + Math.random()}`
                      );
                    } else if (result.isDenied) {
                      sendMessage("عملیات با موفقیت لغو شد", "warning");
                    }
                  });
              }
            },
          },
        ]).then(() => {
          if ($("main > section:not(.document)")) {
            brand.innerHTML += " " + version;
            header.querySelector(
              ".firstViewChild > h2"
            ).innerHTML += ` ورژن ${version}`;
            header.querySelector(
              ".firstViewChild > .special"
            ).innerHTML = `در ورژن ${version} کتابخونهٔ روبیکا چه میگذرد`;
            $("title").innerHTML += `${version}`;
            brand.onclick = () => {
              location.assign(location.origin + location.pathname);
            };

            // function for add elements
            $("section:not(#load-box)").hidden = false;

            for (let i = 0; i < titles.length; i++) {
              const preview =
                getTextWithoutHtml(descriptions[i]).slice(0, 110).trim() +
                "...";

              $(".gradient-list").innerHTML += `
              <li data-aos="zoom-out" class="card gradient-list-item rounded" id="${
                links[i]
              }">
                  <div class="card-body">
                    <h5 class="card-title text-center">
                      <a href="?v=${version}&doc=${links[i]}&${
                Date.now() + Math.random()
              }">
                        ${titles[i]}
                      </a>
                    </h5>
                    <p class="card-text text-right">
                      ${preview}
                    </p>
                  </div>
              </li>`;
            }
          }
        });
      };
    });
  });

function loadDoc(version, doc) {
  window.location.assign(
    `?v=${version}&doc=${doc}&${Date.now() + Math.random()}`
  );
}
