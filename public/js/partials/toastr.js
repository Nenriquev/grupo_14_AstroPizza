

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");

  if (main) {
    const toast = document.createElement("div");

    const autoRemoveToast = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveToast);
      }
    };

    const icons = {
      success: "fa-solid fa-circle-check",
      info: "fa-solid fa-circle-info",
      warning: "fa-solid fa-triangle-exclamation",
      error: "fa-solid fa-xmark"
    };
    const icon = icons[type];

    const delay = (durationInSecond = (duration / 1000).toFixed(2));

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease 0.3s, fadeOut ease .5s ${delay}s forwards`;


    toast.innerHTML = `
        <div class="toast__icon">
          <i class="${icon}"></i>
        </div>
  
        <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
        </div>
  
        <div class="toast__close">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="progress-track"></div>
        <div class="progress-running progress--${type}"></div>
      `;

    const progressRunning = toast.querySelector(".progress-running");
    progressRunning.style.animation = `progress linear ${durationInSecond}s forwards`;

    main.appendChild(toast);
  }
}

const toastMessage = document.querySelector('#toast')


if(toastMessage.dataset.value == 'cart')
  toast({
    title: "Exito!",
    message: "Producto eliminado de la nave.",
    type: "success",
    duration: 3000
  })

  if(toastMessage.dataset.value == 'profile'){
  toast({
    title: "Exito!",
    message: "Perfil actualizado!",
    type: "success",
    duration: 3000
  })
}

if(toastMessage.dataset.value == 'productCreate'){
  toast({
    title: "Exito!",
    message: "Producto agregado correctamente!",
    type: "success",
    duration: 3000
  })
  }

  if(toastMessage.dataset.value == 'newUser'){
    toast({
      title: "Exito!",
      message: "Te has registrado exitosamente!",
      type: "success",
      duration: 3000
    })
  }

  if(toastMessage.dataset.value == 'orderSuccess'){
    toast({
      title: "Has creado una orden!",
      message: "La orden ha sido creada con exito!",
      type: "success",
      duration: 3000
    })
  }

    if(toastMessage.dataset.value == 'productEdit'){
      toast({
        title: "Exito!",
        message: "Producto actualizado!",
        type: "success",
        duration: 3000
      })
  }

  if(toastMessage.dataset.value == 'productDelete'){
    toast({
      title: "Exito!",
      message: "El producto ha sido eliminado con exito!",
      type: "success",
      duration: 3000
    })
}



