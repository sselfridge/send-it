window.onload = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let title = "";
    try {
      title = document.querySelector(".Gallery-Title > div.row > span").innerHTML;
    } catch (error) {
      title = "looks like they changed the title structure...";
    }

    sendResponse(title);
    return true;
  });
};
