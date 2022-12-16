window.onload = () => {
    let form = document.querySelector('.form');

    let name = document.getElementById('name-v');
    let email = document.getElementById('email-v');
    let telefono = document.getElementById('telephone-v');

    name.focus()

    form.addEventListener("submit", function(e) {

        let errorss = [];
        

        if (name.value == "") {
            errorss.push('Nombres no puede estar vacio.');
        }

        if (email.value == "") {
            errorss.push('Email no puede estar vacio.');
        }

        if (telefono.value == "") {
            errorss.push('Telefono no puede estar vacio.');
        } 


        if (errorss.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector(".errores-v")
            ulErrors.innerHTML = " "

            for (let i = 0; i < errorss.length; i++) {
                ulErrors.innerHTML += "<li>" + errorss[i] +"</li>"
                
            }

            console.log(errorss)
        }
    })

    
}