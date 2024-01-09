import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service';

async function getCurrency(baseCurrency, targetCurrency, amount){
  const response = await CurrencyService.getCurrency(baseCurrency, targetCurrency, amount);

  if(response["conversion_rate"]){
    printElements(response, baseCurrency, targetCurrency,amount);
  }
}

function printElements(apiResponse, baseCurrency, targetCurrency, amount){
  const conversionRate = apiResponse["conversion_rate"];
  const convertedAmount = amount * conversionRate;
  document.querySelector("#baseOutput").innerText = `${amount} ${apiResponse.base_code}`;
  document.querySelector("#convertedOutput").innerText = ` ${convertedAmount.toFixed(2)} ${targetCurrency}`;
  document.getElementById("update").innerText = `Last updated: ${apiResponse.time_last_update_utc}`;
}


function handleFormSubmission(e){
  e.preventDefault();
  const baseCurrency = document.querySelector("#currency1").value;
  const targetCurrency = document.querySelector("#currency2").value;
  const amount = parseFloat(document.querySelector("#amount").value);
  document.querySelector("#amount").value = null;

  
  if(!isNaN(amount)){
    getCurrency(baseCurrency, targetCurrency, amount);
  }else{
    console.error("Invalid amount. Please enter a valid number");
  }
}

document.getElementById("form").addEventListener("submit", handleFormSubmission);
