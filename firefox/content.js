window.onload = () => {
  browser.runtime.onMessage.addListener(() => {
    const placeholder = getPlaceholder();

    const caption = prompt("", placeholder);

    return Promise.resolve({ caption });
  });
};

function getPlaceholder() {
  const URL = window.location.hostname;
  console.info("URL: ", URL);

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
  return placeholder;
}
