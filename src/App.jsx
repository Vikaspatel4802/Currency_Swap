// App.jsx
import React, { useState } from "react";
import InputBox from "./Components/Input";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // currencyInfo should be an object like { inr: 82.3, eur: 0.92, ... }
  // representing rate relative to `from`.
  const currencyInfo = useCurrencyInfo(from) || {};
  const options = Object.keys(currencyInfo).length ? Object.keys(currencyInfo) : [from, to];

  const swap = () => {
    // swap using functional updates to avoid stale closures
    setFrom((prevFrom) => {
      setTo(prevFrom); // setTo to previous from
      return to; // setFrom to previous to
    });

    // swap amounts too (amount <-> convertedAmount)
    setAmount((prevAmount) => {
      setConvertedAmount(prevAmount);
      return convertedAmount;
    });
  };

  const convert = () => {
    const rate = currencyInfo[to];
    if (rate === undefined) {
      // could show error / fallback
      setConvertedAmount(0);
      return;
    }
    setConvertedAmount(amount * rate);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                options={options}
                selectedCurrency={from}
                onAmountChange={(val) => setAmount(val)}
                onCurrencyChange={(currency) => {
                  setFrom(currency);
                }}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                options={options}
                selectedCurrency={to}
                onAmountChange={(val) => setConvertedAmount(val)}
                onCurrencyChange={(currency) => {
                  setTo(currency);
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
