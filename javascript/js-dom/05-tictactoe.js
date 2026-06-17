const form = document.querySelector(".playersForm");
const main = document.querySelector('main')

document.getElementById("createNewGameBtn").addEventListener("click", (ev) => {
  ev.preventDefault()
  form.style.display = 'none'
  main.style.display = 'block'
});
