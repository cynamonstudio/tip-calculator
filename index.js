
// MAIN FUNCTION ↓
function formActions(){ 

    let bill
    let tip
    let people

    calcTip() // ← calculate tip function

    people = document.querySelector('#input-people').value
    bill = document.querySelector('#input-bill').value


    // Input fields styling and behavior while active ↓
    document.querySelectorAll("input").forEach(el=>{ 
       el.addEventListener("focus", ev=>{
           ev.target.classList.add('input-focus')
          // ev.target.placeholder=''
       })

       el.addEventListener("focusout", ev=>{
          ev.target.classList.remove('input-focus')

       })
    })


    // Bill input field ↓
    document.querySelector('#input-bill').addEventListener('input', (ev) => {
       bill=parseInt(ev.target.value)
       calcTip() // ← calculate tip function 
    })


    // Number of people field ↓
    document.querySelector('#input-people').addEventListener('input', (ev) => {
        people=parseInt(ev.target.value)
        calcTip() // ← calculate tip function 
    })

    // Percentage fields ↓
    document.querySelectorAll('.perc').forEach((el,index,array) => {

        if(index==array.length-1){   // ← the custom input percentage
            el.addEventListener('input', (ev) => {  // ← while typing in
                tip=parseInt(ev.target.value)

                if(ev.target.value){
                    ev.target.classList.add("selected")
                }else{
                    ev.target.classList.remove("selected")
                }
                
                let arrayTemp=Array.from(array)
                arrayTemp.splice(index,1)
                arrayTemp.forEach(el=>{el.classList.remove("selected")})
                calcTip() 
            }) 
        }else{                   // the percentage buttons ↓
            el.addEventListener('click', (ev) => {
                tip=parseInt(ev.target.id) 
                ev.target.classList.add("selected")
                array[array.length-1].value=''
                let arrayTemp=Array.from(array)
                arrayTemp.splice(index,1)
                arrayTemp.forEach(el=>{el.classList.remove("selected")})
                calcTip() 
            }) 
       } 

    })

    // Calculate tip function ↓
    function calcTip(){

        let tipCount, tipPersonCount

        if( tip && bill ){ 
            tipCount = bill * (tip/100)
            tipPersonCount = tipCount / people

            document.querySelector('#total-amount').innerHTML = "$"+tipCount.toFixed(2)
            document.querySelector('#tip-amount').innerHTML   = "$"+tipPersonCount.toFixed(2)
        }else{
            tipCount = 0
            document.querySelector('.reset-button').classList.remove("reset-active")
            document.querySelector('#total-amount').innerHTML= "$" + (0).toFixed(2)
            document.querySelector('#tip-amount').innerHTML=   "$" + (0).toFixed(2)
        }
        
        if( tip || bill ){
            document.querySelector('.reset-button').classList.add("reset-active")
        }else{
            document.querySelector('.reset-button').classList.remove("reset-active") 
        }

    }
}



// MAIN FUNCTION EXECUTE ↓
formActions()




// RESET BUTTON FUNCTIONALITY ↓
document.querySelector('.reset-button').addEventListener('click',ev=>{
    
    document.querySelector('#input-people').value='1'
    document.querySelector('#input-bill').value=''
    document.querySelector('#input-percent').value=''

    document.querySelectorAll('.perc').forEach((el,index,array) => {
    el.classList.remove("selected")
    tip=''
    })

    document.querySelector('.reset-button').classList.remove("reset-active")
    

    formActions() //REPEAT MAIN FUNCTION
})

