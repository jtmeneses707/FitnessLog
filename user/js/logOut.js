let logOutBtn = document.getElementById("logOutBtn");

logOutBtn.addEventListener("click", logOut);

async function logOut() {
  console.log("Preparing to log out.");
  await fetch('/logout');
}