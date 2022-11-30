const count = document.querySelector('#count')
const sub = document.querySelector('#sub')
const sum = document.querySelector('#sum')
const total = document.querySelector('#total')



function totalPay(precio, id){
  let primerPrecio = total.value

  if(id == 'sum' && count.value < 10){
    count.value++
   }

   if(id == 'sub' && count.value > 1){
    count.value--
   }

   primerPrecio = precio * count.value
   total.innerHTML = `$${primerPrecio}`
}

