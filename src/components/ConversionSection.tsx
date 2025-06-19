import { useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { currencies } from "../data/currencies";
import type { Currency } from "../data/model";
import { formatAmount, validateAmount } from "../helper/amount";

export const ConversionSection = () => {
  const [inputActive, setInputActive] = useState(false);

  const [data, setData] = useState({
    from: currencies[0],
    to: currencies[1],
    amount: "1",
  });

  const handleOnChangeFrom = (newCurrency: Currency) => {
    setData((d) => ({ ...d, from: newCurrency }));
  };

  const handleOnChangeTo = (newCurrency: Currency) => {
    setData((d) => ({ ...d, to: newCurrency }));
  };

  const handleSwap = () => {
    const { from, to } = data;
    setData((d) => ({ ...d, from: to, to: from }));
  };

  return (
    <section className="my-4 mx-4 px-8 py-5 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 w-full ">
        <div
          className={`relative flex min-h-24 flex-1 flex-col p-4 border border-gray-200 rounded-lg hover:bg-gray-50 ${
            inputActive ? "ring-2 ring-blue-400" : ""
          }`}
        >
          <label htmlFor="amount" className="text-gray-500 text-sm">
            Amount
          </label>
          <input
            id="amount"
            value={inputActive ? data.amount : formatAmount(data.amount)}
            onChange={(e) => setData((d) => ({ ...d, amount: e.target.value }))}
            type="text"
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            className={`outline-none font-bold text-3xl`}
            autoComplete="off"
          />
          {validateAmount(data.amount) && (
            <p className="absolute bottom-[-30px] text-red-500 text-md font-medium">
              Please enter a valid amount
            </p>
          )}
        </div>

        <div className="relative flex flex-col md:flex-row gap-4 flex-2">
          <CurrencySelector
            title="From"
            current={data.from}
            onChange={handleOnChangeFrom}
            currencies={currencies}
          />
          <CurrencySelector
            title="To"
            current={data.to}
            onChange={handleOnChangeTo}
            currencies={currencies}
          />

          <button
            type="button"
            onClick={handleSwap}
            className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <LiaExchangeAltSolid className="h-5 w-5 md:rotate-0 rotate-90" />
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            console.log(data);
          }}
          disabled={validateAmount(data.amount)}
          className={`bg-blue-600  hover:bg-blue-700 text-white text-md font-semibold py-2.5 px-7 rounded-md shadow-md transition-all duration-200 ease-in-out  focus:ring-opacity-75 ${
            validateAmount(data.amount)
              ? "cursor-not-allowed"
              : "cursor-pointer "
          }`}
        >
          Convert
        </button>
      </div>
    </section>
  );
};
