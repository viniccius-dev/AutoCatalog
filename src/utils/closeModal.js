export default function closeModal() {

    const loginModal = document.querySelector("#loginModal");
    const loginFormModal = document.querySelector("#loginForm");
    const closeButton = document.querySelector(".closeButton");
    const btnLogin = document.querySelector("#loginHeaderButton")

    loginModal.classList.toggle("hidden");
    
    window.onclick = function(event) {
        
        if(event.target == btnLogin || event.target == loginFormModal || loginFormModal.contains(event.target) && event.target !== closeButton) {
            return;
        }
        loginModal.classList.add("hidden");
    }

}