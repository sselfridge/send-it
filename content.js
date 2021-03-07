window.onload = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let title = "";
    // console.log("Get Title");
    const titleSelectors = [".Gallery-Title > div.row > span", "h1.post-title"];
    let i = -1;
    while (title === "") {
      i++;
      try {
        title = document.querySelector(titleSelectors[i]).innerHTML;
      } catch (error) {}
    }
    // console.log("Got Title:,", title);
    // console.log("Last selector:", titleSelectors[i]);
    sendResponse(title);
    return true;
  });
};
