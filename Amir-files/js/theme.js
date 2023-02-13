const themeIcon = document.querySelector(".theme");
const leftNavbar = document.querySelector(".left__navbar");
const iconsTheme = document.querySelectorAll(".theme__icon");

const changeTheme = function () {
  leftNavbar.classList.toggle("dark");

  for (const iconTheme of iconsTheme) {
    iconTheme.classList.toggle("hidden");
  }
};

themeIcon.addEventListener("click", changeTheme);
