const inputs = document.querySelectorAll('input')



for(let input of inputs){
  
  if(input.type != 'checkbox'){

    if(input.value != '' && input.name != 'profileImg'){
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
})
}
}

