console.info("sendit - Loaded");
browser.runtime.onMessage.addListener((msg) => {
  console.info("sendit - Message Received", msg);
  const placeholder = getPlaceholder();

  const caption = prompt("", placeholder);

  return Promise.resolve({ caption });
});
console.info("sendit - Registered");

function getPlaceholder() {
  console.info("sendit - getPlaceholder");
  const URL = window.location.hostname;

  //only have placeholder for imgur titles
  if (!URL.includes("imgur")) return "<3";
  let placeholder = "";
  const titleSelectors = [
    ".Gallery-Title > div.row > span",
    "h1.post-title",
    ".Gallery-Title > div.row > h1",
  ];
  let i = -1;
  while (placeholder === "") {
    i++;
    try {
      placeholder = document.querySelector(titleSelectors[i]).innerHTML;
    } catch (error) {}
    if (i > titleSelectors.length) break;
  }
  console.info("sendit - returning placeholder: ", placeholder);
  return placeholder;
}
