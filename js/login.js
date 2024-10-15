function logar(){
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value

    if(email == "adm@gmail.com" && senha == "adm"){
        Swal.fire({
            icon: "success",
            title: "Seja bem-vindo, Administrador!",
            confirmButtonText: "Ir para sua página",
            customClass: {
                confirmButton: 'custom-confirm-button',
            }
            
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../pages/adm.html";
            }
        });
    } else{
        Swal.fire({
            icon: "error",
            title: "O Email ou senha incorreto",
            text: "Tente novamente!",
            customClass: {
                confirmButton: 'custom-confirm-button',
            }
        });
    }
}