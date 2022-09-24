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
 * @param {[string , string]} separator
 * @returns {function}
 */

function checkUrl(queries = [{}], separator = []) {
  if (separator[0] == undefined) separator[0] = "?";
  if (separator[1] == undefined) separator[1] = "&";

  let url = location.href.split(separator[0])[1];
  if(url){
    url = [url.split(separator[1])[0]]
  }

  if (url) {
    let datas = location.href.replace("?" + url, "").split(separator[1]);
    datas.reverse();
    datas.pop();
    datas = datas.concat(url);

    if (datas[0] !== undefined) {
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
  }

  return {
    then: (run) => {
      setTimeout(() => {
        run();
      }, 500);
    },
  };
}
