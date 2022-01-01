window.onload = () => {
  console.info("Loaded");
  browser.runtime.onMessage.addListener((msg) => {
    console.info("Message Received", msg);
    const placeholder = getPlaceholder();

    const caption = prompt("", placeholder);

    return Promise.resolve({ caption });
  });
  console.info("Registered");
};

function getPlaceholder() {
  console.info("getPlaceholder:");
  const URL = window.location.hostname;

  //only have placeholder for imgur titles
  if (!URL.includes("imgur")) return "<3";
  let placeholder = "";
  const titleSelectors = [".Gallery-Title > div.row > span", "h1.post-title"];
  let i = -1;
  while (placeholder === "") {
    i++;
    try {
      placeholder = document.querySelector(titleSelectors[i]).innerHTML;
    } catch (error) {}
    if (i > 2) break;
  }
  console.info("returning placeholder: ", placeholder);
  return placeholder;
}
