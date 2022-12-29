const count = document.querySelectorAll('.count')
const sub = document.querySelector('[name="sub"]')
const sum = document.querySelector('[name="sum"]')
const total = document.querySelector('#total')
const items = document.querySelectorAll('.products')



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

    
  



   primerPrecio = 5 * count.value
   total.innerHTML = `$${primerPrecio}`





  
  

