
const inputs = document.querySelectorAll('input')
const textarea = document.querySelector('textarea')



for(let input of inputs){

  if(input.value != ''){
    const element = document.querySelector(`label#${input.name}`)
    element.classList.add('fg-label-valid')
    element.classList.remove('fg-label')
  }

input.addEventListener('focus', (e) => {
  const element = document.querySelector(`label#${e.target.name}`)
  element.classList.remove('fg-label')
  element.classList.add('fg-label-valid')
})

input.addEventListener('blur', (e) => {
  const element = document.querySelector(`label#${e.target.name}`)
  
  if(input.value == ''){
    element.classList.add('fg-label')
    element.classList.remove('fg-label-valid')
  }
    element.classList.add('fg-label-valid')
    input.style.boxShadow = ''
})

input.addEventListener('keyup', (e) => {

  if(e.target.value.length <= 3){
    input.style.boxShadow = '0px 0px 4px 5px #ce0e0e'
  }
  else{
    input.style.boxShadow = ''
  }
  
})
}

if(textarea.value != ''){
  const element = document.querySelector(`label#comments`)
  element.classList.add('fg-label-valid')
  element.classList.remove('fg-label')
}

textarea.addEventListener('focus', (e) => {
  const element = document.querySelector(`label#${e.target.name}`)
  element.classList.remove('fg-label')
  element.classList.add('fg-label-valid')
})

textarea.addEventListener('blur', (e) => {
  const element = document.querySelector(`label#${e.target.name}`)
  
  if(textarea.value == ''){
    element.classList.add('fg-label')
    element.classList.remove('fg-label-valid')

  }
    element.classList.add('fg-label-valid')
})

