window.onload = function(){

    let form = document.querySelector('.form-register');

    form.names.focus()

    let names = document.getElementById('names-v');
    let email = document.getElementById('email-v');
    let telefono = document.getElementById('telefono-v')
    let password = document.getElementById('password-v');
    let passwordRepeat = document.getElementById('passwordRepeat-v');

    let alertNames = document.querySelector('.alert-circle-names');
    let alertEmail = document.querySelector('.alert-circle-email');
    let alertTelefono = document.querySelector('.alert-circle-tfno');
    let alertPassword = document.querySelector('.alert-circle-pass');
    let alertPasswordR = document.querySelector('.alert-circle-passr');

    let checkNames = document.querySelector('.check-names');
    let checkEmail = document.querySelector('.check-email');
    let checkTelefono = document.querySelector('.check-tfno');
    let checkPassword = document.querySelector('.check-pass');
    let checkPasswordR = document.querySelector('.check-passr');



    form.addEventListener('submit', (e) =>{

        let errors = [];

        if(names.value === ""){
            errors.push('Nombre no puede estar vacio.');
            names.classList.add('fg-field-invalid')
            names.classList.remove('fg-field-valid');
            alertNames.classList.remove('hidden'); 
        } else if (names.value.length < 2){
            errors.push('Nombre debe tener mas de 2 caracteres.')
            names.classList.add('fg-field-invalid')
            names.classList.remove('fg-field-valid');
            alertNames.classList.remove('hidden');
        } else{
            names.classList.add('fg-field-valid');
            names.classList.remove('fg-field-invalid');
            alertNames.classList.add('hidden');
            checkNames.classList.remove('hidden');
        }

        if(email.value === ""){
            errors.push('Email no puede estar vacio.')
            email.classList.add('fg-field-invalid')
            email.classList.remove('fg-field-valid')
            alertEmail.classList.remove('hidden');
        } else{
            email.classList.add('fg-field-valid')
            email.classList.remove('fg-field-invalid')
            checkEmail.classList.remove('hidden');
            alertEmail.classList.add('hidden');
        }

        if(telefono.value === ""){
            errors.push('Telefono no puede estar vacio.');
            telefono.classList.add('fg-field-invalid')
            telefono.classList.remove('fg-field-valid')
            alertTelefono.classList.remove('hidden');
        } else{
            telefono.classList.add('fg-field-valid')
            telefono.classList.remove('fg-field-invalid')
            checkTelefono.classList.remove('hidden');
            alertTelefono.classList.add('hidden');
        }

        if(password.value === ""){
            errors.push('Contrasena no puede estar vacio.')
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        } else if (password.value.length < 6){
            errors.push('Contrasena debe tener al menos 6 caracteres.')
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        } else{
            password.classList.add('fg-field-valid')
            password.classList.remove('fg-field-invalid')
            checkPassword.classList.remove('hidden');
            alertPassword.classList.add('hidden');
        }

        if(passwordRepeat.value === ""){
            errors.push('Repetir Contrasena no puede estar vacio.')
            passwordRepeat.classList.add('fg-field-invalid')
            passwordRepeat.classList.remove('fg-field-valid')
            alertPasswordR.classList.remove('hidden');
        } else if (passwordRepeat.value != password.value){
            errors.push('Las contrasenas no coinciden.')
            passwordRepeat.classList.add('fg-field-invalid')
            passwordRepeat.classList.remove('fg-field-valid')
            alertPasswordR.classList.remove('hidden');
        } else{
            passwordRepeat.classList.add('fg-field-valid')
            passwordRepeat.classList.remove('fg-field-invalid')
            checkPasswordR.classList.remove('hidden');
            alertPasswordR.classList.add('hidden');

        }


        if (errors.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector(".errores-v")
            ulErrors.innerHTML = " "

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] +"</li>"
                
            }
        }
    })
    

}