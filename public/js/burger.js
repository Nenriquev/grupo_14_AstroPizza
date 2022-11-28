
const btn = document.getElementsByClassName('btn')

btn[0].addEventListener("click", () => {
  btn[0].classList.toggle("active");
  btn[0].classList.toggle("not-active");

  if(!btn[0].classList.contains('not-active')){
    document.getElementById("mySidebar").style.width = "200px";
  }
  else{
    document.getElementById("mySidebar").style.width = "0px";
  }
});







