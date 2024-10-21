const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const dropdown =document.querySelectorAll(".dropdown select")


// for (code in countryList) {
//     console.log(code,countryList[code])
// }
const btn= document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".message p")


for(let select of dropdown ){
    for (Currcode in countryList) {
     let newOption=document.createElement("option")
     newOption.innerText=Currcode
     newOption.value=Currcode
     select.append(newOption)
     if(select.name==="origin" && Currcode ==="USD"){
         newOption.selected="selected"
     }
     else if(select.name==="destination" && Currcode ==="NPR"){
         newOption.selected="selected"
     }
        select.append(newOption)
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag=(element)=>{
    let Currcode=element.value
    let countryCode =countryList[Currcode]
    console.log(countryCode)
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src =newSrc
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault()
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value
    console.log(amtVal)
    if(amtVal=="" || amtVal<1){
        amtVal="1"
        amount.value="1"
    }
    // console.log(fromCurr.value,toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response =await fetch(URL)
    let data = await response.json()
    console.log(data)
    let rate =data[toCurr.value.toLowerCase()]
    // console.log(rate)
    let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
      console.log(msg)
})
