// navigation
const ul = document.querySelector("ul")
const menu = document.querySelector(".menu")
menu.addEventListener("click", (e) =>{
    ul.classList.toggle("show__nav")
})

const links = document.querySelectorAll("ul a")
for (const link of links) {
   if(location.href === link.href){
       link.className = "active";
   }
    
}

const showText = document.querySelector(".show__skill");
const texts = ['Web Designer', 'Web Developer', 'Ui/Ux Designer', 'Full-stack Developer'];
let count = 0;
let index = 0;


const slide = () =>{
    if(count === texts.length){
        count = 0;
    }
    let currentText = texts[count]
    let eachLetter = currentText.slice(0, index++)
   
    showText.textContent = eachLetter

    if(eachLetter.length === currentText.length){
        
        count++;
        index = 0
    }
}

setInterval(slide, 500)


// fixed navbar on scroll
const header = document.querySelector("header")
console.log(header);
const fixedNav = () =>{
    if(pageYOffset >50){
        header.classList.add("fixedNav")
    }else{
        header.classList.remove("fixedNav")

    }
}
window.addEventListener("scroll", fixedNav)


// project

const work = document.querySelector(".show__work"),
        ull = work.querySelector("ul"),
        buttons = document.querySelectorAll(".work-ul button"),
        project = document.querySelectorAll(".mypro")
            for(let button of buttons) {
                button.addEventListener("click", (e)=>{
                    ull.querySelector(".active").classList.remove("active")
                        button.classList.add("active")

                    let btn =  button.getAttribute("data-select");
                    for(let eachProject of project){
                       let proBtn = eachProject.getAttribute("data-select")

                        if(btn === proBtn  || btn === "all"){
                            eachProject.classList.remove("hide")
                            
                            eachProject.classList.add("show")
                        }else{
                            eachProject.classList.add("hide")
                            eachProject.classList.remove("show")
                        }
                    }
                })
        }
        

        // countDown
        const  countDown  = () =>{
        const futureDate = new Date("oct 1 2021 00:00:00").getTime()
        const now = new Date().getTime()
        const gap = futureDate - now
       
        let seconds = 1000; 
        let minutes = seconds * 60;
        let hours = minutes * 60;
        let day = hours * 24
  
        
        let textDay = Math.floor(gap/ day)
       

            let textHour = Math.floor((gap % day)/hours) 
            let textMin = Math.floor((gap % hours)/minutes) 
            let textSec = Math.floor((gap % minutes)/seconds) 
          
            document.querySelector(".show_day").innerHTML = textDay
            document.querySelector(".show_hour").innerHTML = textHour
            document.querySelector(".show_min").innerHTML = textMin
            document.querySelector(".show_sec").innerHTML = textSec
        };
        
        setInterval(countDown, 1000);

        
        // gotoTop
        const gotoTop = document.querySelector(".gotoTop")
        
            gotoTop.addEventListener("click", (e) =>{
                window.scrollTo({
                    top:0,
                    behavior:"smooth"
        
                })
            })

            // window.addEventListener("dragend")
            gotoTop.addEventListener("drag", (e) =>{
                console.log("drag")
            })
            gotoTop.addEventListener("dragleave", (e) =>{
                console.log("leave")
            })
            gotoTop.addEventListener("dragend", (e) =>{
                console.log("end")
            })
            gotoTop.addEventListener("dragover", (e) =>{
                console.log("dragover")
            })
                window.addEventListener("scroll", ()=>{
                    
                    if(scrollY > 150){
                        gotoTop.classList.add("showTop")
                        
                        // console.log(window.strollTop);
                    }else{
                        gotoTop.classList.remove("showTop")


                    }
                })
        
        
        let copy = document.getElementById("copyBtn")
        box = document.querySelector(".topBody"),
        pText = document.querySelector(".pp").innerHTML;
            
            
            const show = () =>{
             let textArea = document.createElement("textarea")
                
                box.append(textArea)
                textArea.textContent = pText;
                textArea.select()
                document.execCommand("copy")
                
                setInterval(() => {
                    copy.innerHTML = "copied"
                    textArea.remove()
                }, 1000);

                
                
            }
                copy.addEventListener("click", show)



                // counter

                let counters = document.querySelectorAll(".counters");
                let speed = 1500;

                for(let counter of counters){
                   const updateCounter = () =>{
                    let target = +counter.getAttribute("data-count")
                    let count = +counter.innerHTML
                    let gap = target/speed
                    
                    if(count < target){
                        counter.innerHTML  = Math.ceil(count + gap) 
                        
                        setTimeout(updateCounter, 5);
                    }else{
                        counter.innerHTML  =  `${target} +`

                    }
                   }

                   updateCounter()
                }
               
                // console.log(counter);