export default function closeModal() {

    const loginModal = document.querySelector("#loginModal");
    const loginFormModal = document.querySelector("#loginForm");
    const closeButton = document.querySelector(".closeButton");
    
    window.onclick = function(event) {
        
        if(event.target == loginFormModal || loginFormModal.contains(event.target) && event.target !== closeButton) {
            console.log('olá');
            return;
        }
        loginModal.classList.toggle("hidden");
    }

}