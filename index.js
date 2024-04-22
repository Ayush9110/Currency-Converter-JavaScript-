const BaseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

const updateflag=(element)=>{
    let currCode=element.values;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/{countrycode}/flat/64.png`;
    
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();      //automatically on clicking convert loading of site is prevented
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    // console.log(amtval)
    if (amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    // console.log(fromCurr.value)
    const URL=`${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate)
    let finalamount=amtval*rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
})
