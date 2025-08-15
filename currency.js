const API_KEY = "cur_live_Y1hdHlhqiEx86H0XLfpfySTP02Uf6SqNrmTx3pz7";
const BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=${"cur_live_Y1hdHlhqiEx86H0XLfpfySTP02Uf6SqNrmTx3pz7"}`;



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
     for (currCode in countryList) {
          let newOption = document.createElement("option");
          newOption.innerText = currCode;
          newOption.value = currCode;
          if (select.name === "from" && currCode === "USD") {
               newOption.selected = "selected";
          } else if (select.name === "to" && currCode === "INR") {
               newOption.selected = "selected";
          }
          select.append(newOption);
     }
    

     select.addEventListener("click", async (evt) => {
          updateFlag(evt.target);
     });
}

const updateExchangeRate = async () => {
     let amount = document.querySelector(".amount input");
     let amtVal = amount.value;
     if (amtVal === "" || amtVal < 1) {
          amtVal = 1;
          amount.value = "1";
     }

     const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
     let response = await fetch(URL);
     let data = await response.json();

     // CurrencyAPI.com returns rates inside data.data object
     let rate = data.data[toCurr.value].value;
     let finalAmount = (amtVal * rate).toFixed(2);

     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


const updateFlag = (element) => {
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
     evt.preventDefault();
     updateExchangeRate();
});

window.addEventListener("load", () => {
     updateExchangeRate();
});