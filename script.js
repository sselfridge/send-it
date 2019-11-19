function sendImgURL(info) {
  const url = info.srcUrl;
  console.log(`Image:${url}`);
  sendReq(url);
}

function sendPageURL(info){
  const url = info.pageUrl
  console.log(`Page:${url}`)
  sendReq(url)
}

function sendReq(url){
  const AWS_API_ENPOINT = "";
  const KEY = "";

  fetch(`${AWS_API_ENPOINT}?key=${KEY}&url=${url}`, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
    // .then(function(response) {
    //   console.log(response);
    //   return response.json();
    // })
    // .then(function(myJson) {
    //   console.log(JSON.stringify(myJson));
    // })
    .catch(err => {
      console.log(err);
    });
}

// Create one test item for each context type.
var contexts = ["image", "video"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Send Pic URL";
  var id = chrome.contextMenus.create({
    title: title,
    contexts: [context],
    onclick: sendImgURL
  });
  var urlTitle = "Send Entire Page"
  var URL = chrome.contextMenus.create({
    title: urlTitle,
    contexts: [context],
    onclick: sendPageURL
  });
  // console.log("'" + context + "' item:" + id);
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