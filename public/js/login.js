const inputs = document.querySelectorAll('input')
const eyePass = document.querySelectorAll('.fa-eye')
const password = document.querySelector('#pass');
const rePassword = document.querySelector('#rPass');

for(let eye of eyePass){

  eye.addEventListener('click', (e) =>{

    if(e.target.id == 'ePass'){
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    }

    if(e.target.id == 'rePass'){
      const rType = rePassword.getAttribute('type') === 'password' ? 'text' : 'password';
      rePassword.setAttribute('type', rType);
      }

    eye.classList.toggle('fa-eye-slash')

  })
}



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

