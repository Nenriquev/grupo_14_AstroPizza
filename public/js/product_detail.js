const count = document.querySelectorAll('.count')
const sub = document.querySelector('[name="sub"]')
const sum = document.querySelector('[name="sum"]')

    countPay = (e, op) => {
      count.forEach(element => {
          if(element.id == `count${e}` && op == 'sum' && element.value < 10){
            element.value++
          }
          if(element.id == `count${e}` && op == 'sub' && element.value > 0){
            element.value--
          }
      });
    }
