
const filterButtons = document.getElementsByClassName('bttn-dark')
const body = document.querySelector('body')


for(let buttons of filterButtons){
  buttons.addEventListener('click', (e) => {

    const cards = document.querySelectorAll(`.card`)
    
    cards.forEach((element) =>{
  
       if(element.id != e.target.id){
         
          element.classList.add('hidden')

       }
       else{
         element.classList.remove('hidden')
       }
    })
    
  })}


  body.addEventListener('change', (e) => {
   console.log('cambio',e)
  })

  
  




