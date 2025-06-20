import { useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { currencies } from "../data/currencies";
import type { Currency, StoredItem } from "../data/model";
import { validateAmount } from "../helper/amount";
import { AmountInput } from "./AmountInput";
import { useFetch } from "../hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { ConversionResult } from "./ConversionResult";

export const ConversionSection = ({
  addItem,
}: {
  addItem: (item: StoredItem) => void;
}) => {
  const [data, setData] = useState({
    from: currencies[0],
    to: currencies[1],
    amount: "1",
  });

  const { fetchData, error, loading, responseData } = useFetch();

  const handleOnChangeFrom = (newCurrency: Currency) => {
    setData((d) => ({ ...d, from: newCurrency }));
    handleOnSubmit(newCurrency.code);
  };

  const handleOnChangeTo = (newCurrency: Currency) => {
    setData((d) => ({ ...d, to: newCurrency }));
  };

  const handleOnChangeAmount = (newAmount: string) => {
    setData((d) => ({ ...d, amount: newAmount }));
  };

  const handleSwap = () => {
    const { from, to } = data;
    setData((d) => ({ ...d, from: to, to: from }));
    handleOnSubmit(to.code);
  };

  const handleOnSubmit = (code: string) => {
    fetchData(code).then((responseData) => {
      const newItem: StoredItem = {
        id: Date.now(),
        amount: data.amount,
        amountName: data.from.name,
        resultAmount: (
          Number(data.amount) * responseData[data.to.code]
        ).toFixed(2),
        resultAmountName: data.to.name,
        date: new Date().toISOString(),
      };

      addItem(newItem);
    });
  };

  return (
    <section className="my-4 mx-4 px-8 py-5 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 w-full ">
        <AmountInput amount={data.amount} onChange={handleOnChangeAmount} />

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

      <div className="flex justify-between items-start mt-4">
        <div className="">
          {error && (
            <p className="text-red-500 text-lg font-semibold ml-4">{error}</p>
          )}

          {responseData && !validateAmount(data.amount) && (
            <ConversionResult data={data} responseData={responseData} />
          )}
        </div>

        <div className="min-h-12 flex items-center justify-center">
          {loading && <ClipLoader className="" size={30} color="#1a1aff" />}
        </div>

        <button
          onClick={() => handleOnSubmit(data.from.code)}
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
