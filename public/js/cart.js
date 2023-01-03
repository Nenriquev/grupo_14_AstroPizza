const count = document.querySelectorAll('.count')
const sub = document.querySelector('[name="sub"]')
const sum = document.querySelector('[name="sum"]')
const total = document.querySelector('#total')
const items = document.querySelectorAll('.products')
const checkbox = document.querySelector('#payment_mode')
const cardIcon = document.querySelector('.fa-credit-card')
const moneyIcon = document.querySelector('.fa-money-bill')
const submitbtn = document.querySelector('#abrirModal')
const modal = document.getElementById("ventanaModal");
const span = document.getElementsByClassName("cerrar")[0];
const btnModal = document.querySelector('#modal-btn');
const cardName = document.querySelector('#card-holder');
const expirationMonth = document.querySelector('#card-expiration-month');
const expirationYear = document.querySelector('#card-expiration-year');
const ccvCode = document.querySelector('#card-ccv')
const cardNumber = document.querySelectorAll('.input-cart-number')


moneyIcon.classList.add('icon-selected')
cardIcon.classList.add('icon-nonselected')

    countPay = (e, op) => {

      count.forEach(element => {
          if(element.id == `count${e}` && op == 'sum' && element.value < 10){
            element.value++
          }
          if(element.id == `count${e}` && op == 'sub' && element.value > 1){
            element.value--
          }
      });
    }

    
 checkbox.addEventListener('change', () =>{
  if(checkbox.checked){
   moneyIcon.classList.add('icon-nonselected')
   cardIcon.classList.remove('icon-nonselected')
   cardIcon.classList.add('icon-selected')
  }
  else{
  cardIcon.classList.remove('icon-selected')
  cardIcon.classList.add('icon-nonselected')
  moneyIcon.classList.remove('icon-nonselected')
  }
 })
 

submitbtn.addEventListener("click", (e) => {
    if(checkbox.checked){
      e.preventDefault()
      modal.style.display = "block";
    }
    else{
      submitbtn.submit()
    }
});


btnModal.addEventListener('click', (e) => {

  for(input of cardNumber){
    if(input.value == ''){
      input.style.border = '3px solid rgba(255, 0, 0, 0.763)'
    }
  }

  if(cardName.value == ''){
    cardName.style.border = '3px solid rgba(255, 0, 0, 0.763)'
  }
  if(expirationMonth.value == ''){
    document.querySelector('#expiration-month').style.border = '3px solid rgba(255, 0, 0, 0.763)'
  }
  if(expirationYear.value == ''){
    document.querySelector('#expiration-year').style.border = '3px solid rgba(255, 0, 0, 0.763)'
  }
  if(ccvCode.value == ''){
    ccvCode.style.border = '3px solid rgba(255, 0, 0, 0.763)'
  }
  else{
    document.querySelector('#form-cart').submit()
  } 
  

})


span.addEventListener("click",function() {
  modal.style.display = "none";
});


window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

