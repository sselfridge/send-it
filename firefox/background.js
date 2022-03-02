// browser.contextMenus.create({
//   id: "page",
//   title: "Send page",
//   contexts: ["page"],
// });

browser.contextMenus.create({
  id: "pageCaption",
  title: "Send Page with caption",
  contexts: ["page"],
});

// browser.contextMenus.create({
//   id: "img",
//   title: "Send 1.2 img URL",
//   contexts: ["image", "video"],
// });
browser.contextMenus.create({
  id: "imgCaption",
  title: `Send with Caption `,
  contexts: ["image", "video"],
});

let url = null;

function handleResponse({ caption }) {
  console.info("caption: ", caption);

  sendReq(url, caption);
  url = null;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function sendMessage(tabId) {
  console.info("tabId: ", tabId);
  browser.tabs
    .sendMessage(tabId, { message: "hello" })
    .then(handleResponse, handleError);
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  console.info("info: ", info);
  console.info("tab: ", tab);
  const menuItemId = info.menuItemId;

  const isCaption = menuItemId.includes("Caption");
  const isPage = menuItemId.includes("page");

  url = isPage ? info.pageUrl : info.srcUrl;

  if (isCaption) {
    console.info("send message", tab.id);
    sendMessage(tab.id);
  } else {
    console.info("Send req:", url);
    sendReq(url);
    url = null;
  }
});

function sendReq(url, caption = "<3") {
  console.info("sendReq: ", caption, url);
  if (caption === null || url === null) {
    console.log("Null input ---- ABORT!");
    return;
  }

  const AWS_API_ENDPOINT = "";
  const KEY = "";

  const query = `${AWS_API_ENDPOINT}?key=${KEY}&url=${url}&caption=${caption}`;
  console.info("query: ", query);
  // return;
  fetch(query, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(() => console.info("Query Sent"))
    // .then((data) => console.log(data))
    .catch((err) => {
      console.log("request error:", err);
    });

  return;
}
