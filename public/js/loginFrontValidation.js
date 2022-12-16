window.onload = function(){

    let form = document.querySelector('.form');

    form.email.focus()

    let email = document.getElementById('email-v');
    let password = document.getElementById('password-v');

    let alertEmail = document.querySelector('.alert-circle-email');
    let alertPassword = document.querySelector('.alert-circle-pass');

    let checkEmail = document.querySelector('.check-email');    
    let checkPassword = document.querySelector('.check-pass');

    form.addEventListener('submit', (e) =>{

        let errors = [];

       

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

      

        if(password.value === ""){
            errors.push('Contrasena no puede estar vacio.')
            password.classList.add('fg-field-invalid')
            password.classList.remove('fg-field-valid')
            alertPassword.classList.remove('hidden');
        
        } else{
            password.classList.add('fg-field-valid')
            password.classList.remove('fg-field-invalid')
            checkPassword.classList.remove('hidden');
            alertPassword.classList.add('hidden');
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
