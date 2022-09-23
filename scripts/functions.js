// select elements with this script
/**
 *
 * @param {string} qr
 * @param {function} filter
 * @returns element
 */
const $ = (
  qr,
  filter = (result) => {
    return result;
  }
) => {
  const select = document.querySelectorAll(qr),
    result =
      select.length > 0 ? (select.length == 1 ? select[0] : select) : undefined;

  if (typeof filter == "function") return filter(result);
};

/**
 *
 * @param {[{key:string,do:function}]} queries
 * @returns {function}
 */

function checkUrl(queries = [{}]) {
  const url = location.href.split("?")[1];

  if (url) {
    const datas = url.split("&");

    queries.forEach((query) => {
      if (datas.includes(query.key)) {
        query.do("");
      } else {
        const result = datas.filter((val) => {
          if (val.startsWith(query.key + "=")) {
            return val;
          }
        })[0];

        if (result !== undefined) {
          query.do(result.replace(query.key + "=", ""));
        }
      }
    });
  }

  return {
    then: (run) => {
      setTimeout(() => {
        run();
      }, 100);
    },
  };
}
