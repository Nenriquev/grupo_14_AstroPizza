    let form = document.querySelector('.form');
    let name = document.getElementById('name-v');
    let email = document.getElementById('email-v');
    let telefono = document.getElementById('telephone-v');
    const inputs = document.querySelectorAll('input')

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
          
      })
    }


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

           
        }
    })

    
