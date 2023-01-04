window.onload = function(){

    let form = document.querySelector('.form-register');

    form.names.focus()

    let names = document.getElementById('names-v');
    let email = document.getElementById('email-v');
    let password = document.getElementById('pass');
    let passwordRepeat = document.getElementById('rPass');
    let alertNames = document.querySelector('.alert-circle-names');
    let alertEmail = document.querySelector('.alert-circle-email');
    let alertPassword = document.querySelector('.alert-circle-pass');
    let alertPasswordR = document.querySelector('.alert-circle-passr');
    let checkNames = document.querySelector('.check-names');
    let checkEmail = document.querySelector('.check-email');
    let checkPassword = document.querySelector('.check-pass');
    let checkPasswordR = document.querySelector('.check-passr');
    let tycValidation = document.querySelector('#cbx')



    form.addEventListener('submit', (e) =>{

        let errors = [];

        if(names.value === ""){
            errors.push({id:'#name-error', msg: 'El nombre no puede estar vacio'})
            names.classList.add('fg-field-invalid')
            names.classList.remove('fg-field-valid');
            alertNames.classList.remove('hidden'); 
        } else if (names.value.length < 2){
            errors.push({id:'#name-error', msg: 'El nombre debe tener al menos 2 caracteres'})
            names.classList.add('fg-field-invalid')
            names.classList.remove('fg-field-valid');
            alertNames.classList.remove('hidden');
        } else{
            names.classList.add('fg-field-valid');
            names.classList.remove('fg-field-invalid');
            alertNames.classList.add('hidden');
            checkNames.classList.remove('hidden');
            document.querySelector('#name-error').innerHTML = ''
        }

        if(email.value === ""){
            errors.push({id:'#email-error', msg: 'El email ingresado es invalido'})
            email.classList.add('fg-field-invalid')
            email.classList.remove('fg-field-valid')
            alertEmail.classList.remove('hidden');
        } else{
            email.classList.add('fg-field-valid')
            email.classList.remove('fg-field-invalid')
            checkEmail.classList.remove('hidden');
            alertEmail.classList.add('hidden');
            document.querySelector('#email-error').innerHTML = ''
        }

        if(password.value === ""){
           errors.push({id:'#password-error', msg: 'Debe elegir una contrasena'})
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        } else if (password.value.length < 6){
            errors.push({id:'#password-error', msg: 'La contrasena debe tener al menos 6 caracteres'})
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        } else{
            password.classList.add('fg-field-valid')
            password.classList.remove('fg-field-invalid')
            checkPassword.classList.remove('hidden');
            alertPassword.classList.add('hidden');
            document.querySelector('#password-error').innerHTML = ''
        }

        if(passwordRepeat.value === ""){
            errors.push({id:'#rPassword-error', msg: 'Debe repetir la contrasena'})
            passwordRepeat.classList.add('fg-field-invalid')
            passwordRepeat.classList.remove('fg-field-valid')
            alertPasswordR.classList.remove('hidden');
        } else if (passwordRepeat.value != password.value){
            errors.push({id:'#rPassword-error', msg: 'Las contrasenas no coinciden'})
            passwordRepeat.classList.add('fg-field-invalid')
            passwordRepeat.classList.remove('fg-field-valid')
            alertPasswordR.classList.remove('hidden');
        } else{
            passwordRepeat.classList.add('fg-field-valid')
            passwordRepeat.classList.remove('fg-field-invalid')
            checkPasswordR.classList.remove('hidden');
            alertPasswordR.classList.add('hidden');
            document.querySelector('#rPassword-error').innerHTML = ''
        }

        if(!tycValidation.checked){
            errors.push({id:'#tyc-error', msg: 'Debe aceptar los terminos y condiciones'})
        }
        else{
            document.querySelector('#tyc-error').innerHTML = ''
        }



        if (errors.length > 0) {
            e.preventDefault();
            errors.forEach((error) =>{
                let errorTag = document.querySelector(`${error.id}`)
                errorTag.innerHTML = `<span>${error.msg}<span>`
            })

        }
    })
    

}