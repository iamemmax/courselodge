const errBtns = document.querySelectorAll("#errBtn")
const errorMsg = document.querySelector(".error")

    
errBtns.forEach(errBtn =>{
    errBtn.addEventListener("click", (e) =>{
        errBtn.parentElement.parentElement.classList.add("removeErr")
    })
})
