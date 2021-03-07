console.log("Content Script happening");

window.onload = () => {
  console.log("On Load");

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Run time message");
    let title = "";
    try {
      console.log("qwertyuio");
      title = document.querySelector(".Gallery-Title > div.row > span").innerHTML;
      console.log("title: ", title);
    } catch (error) {
      console.error("ERROR ERROR");
    }
    console.log("Hello title: ", title);

    sendResponse(title);
    return true;
  });
};
