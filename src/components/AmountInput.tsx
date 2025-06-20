import { useState } from "react";
import { formatAmount, validateAmount } from "../helper/amount";

export const AmountInput = ({
  amount,
  onChange,
}: {
  amount: string;
  onChange: (newAmount: string) => void;
}) => {
  const [inputActive, setInputActive] = useState(false);

  return (
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
        value={inputActive ? amount : formatAmount(amount)}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        className={`outline-none font-bold text-3xl`}
        autoComplete="off"
      />
      {validateAmount(amount) && (
        <p className="absolute bottom-[-30px] text-red-500 text-md font-medium">
          Please enter a valid amount
        </p>
      )}
    </div>
  );
};
