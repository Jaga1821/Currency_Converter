document.addEventListener('DOMContentLoaded', function() {
    const apiKey = getApiKey();
    const currencyCodes = getCurrencyCodes();
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convert');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
  
    // Populate the currency codes in the dropdowns
    currencyCodes.forEach(code => {
      const option1 = document.createElement('option');
      option1.value = code;
      option1.textContent = code;
      fromCurrency.appendChild(option1);
  
      const option2 = document.createElement('option');
      option2.value = code;
      option2.textContent = code;
      toCurrency.appendChild(option2);
    });
  
    convertButton.addEventListener('click', function() {
      const amount = amountInput.value;
      const from = fromCurrency.value;
      const to = toCurrency.value;
  
      if (amount && from && to) {
        convertCurrency(amount, from, to, apiKey);
      } else {
        resultDiv.textContent = 'Please fill in all fields.';
      }
    });
  
    function convertCurrency(amount, fromCurrency, toCurrency, apiKey) {
      const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
          } else {
            resultDiv.textContent = 'Conversion rate not available.';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          resultDiv.textContent = 'An error occurred.';
        });
    }
  });
  