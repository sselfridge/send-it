console.log("Content Script happening");

window.onload = () => {
  console.log("On Load");
  const title = document.getElementsByClassName("PostTitle")[0].innerHTML;
  console.log(title);
  chrome.storage.sync.set({ title }, function () {});
};
