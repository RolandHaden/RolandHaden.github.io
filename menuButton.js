const myObject = document.getElementById("myObject");
const ringClose = document.querySelector(".ringClose");


myObject.addEventListener("click", () => {
    myObject.classList.toggle("active");
    if (myObject.classList.contains("active")) {
        ringClose.style.visibility = "visible";
      } else {
        ringClose.style.visibility = "hidden";
      }
  });

myObject.addEventListener("blur", () => {
  myObject.classList.remove("active");
  ringClose.style.visibility = "hidden";
});

ringClose.addEventListener("click", () => {
  myObject.classList.remove("active");
  ringClose.style.visibility = "hidden";
});

