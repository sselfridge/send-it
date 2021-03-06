var contexts = ["image", "video"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var id = chrome.contextMenus.create({
    title: "Send Pic URL",
    contexts: [context],
    onclick: sendImgURL,
  });
  chrome.contextMenus.create({
    title: "Send with Caption",
    contexts: [context],
    onclick: imgCaption,
  });
}
chrome.contextMenus.create({
  title: "Send Entire Page",
  contexts: ["page"],
  onclick: sendPageURL,
});
chrome.contextMenus.create({
  title: "Send Page with Caption",
  contexts: ["page"],
  onclick: pageCaption,
});

//Obj is a un=needed parameter
//passing through so that caption can be used by the standard functions
function imgCaption(info, obj) {
  chrome.storage.sync.get(["title"], function ({ title }) {
    console.log("result: ", title);
    const caption = prompt("Caption:", title);
    console.log("Caption:", caption);

    sendImgURL(info, obj, caption);
  });
}

function pageCaption(info, obj) {
  const caption = prompt("Caption:");
  console.log("Caption:", caption);

  sendPageURL(info, obj, caption);
}

function sendImgURL(info, obj, caption) {
  const url = info.srcUrl;
  console.log(`Image:${url}`);
  sendReq(url, caption);
}

function sendPageURL(info, obj, caption) {
  const url = info.pageUrl;
  console.log(`Page:${url}`);
  sendReq(url, caption);
}

function sendReq(url, caption = "<3") {
  console.log(`Url:${url}`);

  console.log("caption");
  console.log(caption);

  if (caption === null) {
    console.log("Null caption ---- ABORT!");
    return;
  }

  const AWS_API_ENPOINT = "";
  const KEY = "";

  const query = `${AWS_API_ENPOINT}?key=${KEY}&url=${url}&caption=${caption}`;

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
      console.log(err);
    });
}

// Below is the built in code from the example project.
// Keeping it in for reference later if needed.

// function genericOnClick(info, tab) {
//   console.log("item " + info.menuItemId + " was clicked");
//   console.log("info: " + JSON.stringify(info));
//   console.log("tab: " + JSON.stringify(tab));
// }

// Create a parent item and two children.
// var parent = chrome.contextMenus.create({ title: "Test parent item" });
// var child1 = chrome.contextMenus.create({
//   title: "Child 1",
//   parentId: parent,
//   onclick: genericOnClick
// });
// var child2 = chrome.contextMenus.create({
//   title: "Child 2",
//   parentId: parent,
//   onclick: genericOnClick
// });
// console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);

// // Create some radio items.
// function radioOnClick(info, tab) {
//   console.log(
//     "radio item " +
//       info.menuItemId +
//       " was clicked (previous checked state was " +
//       info.wasChecked +
//       ")"
//   );
// }
// var radio1 = chrome.contextMenus.create({
//   title: "Radio 1",
//   type: "radio",
//   onclick: radioOnClick
// });
// var radio2 = chrome.contextMenus.create({
//   title: "Radio 2",
//   type: "radio",
//   onclick: radioOnClick
// });
// console.log("radio1:" + radio1 + " radio2:" + radio2);

// // Create some checkbox items.
// function checkboxOnClick(info, tab) {
//   console.log(JSON.stringify(info));
//   console.log(
//     "checkbox item " +
//       info.menuItemId +
//       " was clicked, state is now: " +
//       info.checked +
//       "(previous state was " +
//       info.wasChecked +
//       ")"
//   );
// }
// var checkbox1 = chrome.contextMenus.create({
//   title: "Checkbox1",
//   type: "checkbox",
//   onclick: checkboxOnClick
// });
// var checkbox2 = chrome.contextMenus.create({
//   title: "Checkbox2",
//   type: "checkbox",
//   onclick: checkboxOnClick
// });
// console.log("checkbox1:" + checkbox1 + " checkbox2:" + checkbox2);

// // Intentionally create an invalid item, to show off error checking in the
// // create callback.
// console.log("About to try creating an invalid item - an error about " +
//             "item 999 should show up");
// chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
//   if (chrome.extension.lastError) {
//     console.log("Got expected error: " + chrome.extension.lastError.message);
//   }
// });
