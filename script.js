// Saves checkboxes so progress stays even after closing
const checkboxes = document.querySelectorAll("input");

checkboxes.forEach((box, i) => {
  // load saved state
  if (localStorage.getItem("box" + i) === "true") {
    box.checked = true;
  }

  // save when changed
  box.addEventListener("change", () => {
    localStorage.setItem("box" + i, box.checked);
  });
});
