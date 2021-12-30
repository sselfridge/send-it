browser.contextMenus.create({
  id: "page",
  title: "Send page",
  contexts: ["page"],
});

browser.contextMenus.create({
  id: "pageCaption",
  title: "Send Page with caption",
  contexts: ["page"],
});

browser.contextMenus.create({
  id: "img",
  title: "Send img URL",
  contexts: ["image", "video"],
});
browser.contextMenus.create({
  id: "imgCaption",
  title: "Send with Caption",
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
  const sending = browser.tabs.sendMessage(tabId, {});
  sending.then(handleResponse, handleError);
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  const menuItemId = info.menuItemId;

  const isCaption = menuItemId.includes("Caption");
  const isPage = menuItemId.includes("page");

  url = isPage ? info.pageUrl : info.srcUrl;

  if (isCaption) {
    sendMessage(tab.id);
  } else {
    sendReq(url);
    url = null;
  }
});

function sendReq(url, caption = "<3") {
  if (caption === null || url === null) {
    console.log("Null input ---- ABORT!");
    return;
  }

  const AWS_API_ENDPOINT ;
  const KEY ;

  const query = `${AWS_API_ENDPOINT}?key=${KEY}&url=${url}&caption=${caption}`;

  fetch(query, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    // .then(function(response) {
    //   console.log(response);
    //   return response.json();
    // })
    // .then(function(myJson) {
    //   console.log(JSON.stringify(myJson));
    // })
    .catch((err) => {
      console.log("request error:", err);
    });
}
