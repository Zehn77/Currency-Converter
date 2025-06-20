import type { Currency } from "../data/model";
import { formatCurrencyAmount } from "../helper/amount";

type ConversionResultProps = {
  data: {
    amount: string;
    to: Currency;
    from: Currency;
  };
  responseData: { [code: string]: number };
};

export const ConversionResult = ({
  data,
  responseData,
}: ConversionResultProps) => {
  return (
    <div>
      <p className="text-xl text-gray-600 font-semibold mb-2">
        {formatCurrencyAmount(Number(data.amount))} {data.from.name} =
      </p>

      <p className="text-2xl text-gray-800 font-bold mb-4">
        {formatCurrencyAmount(Number(data.amount) * responseData[data.to.code])}{" "}
        {data.to.name}
      </p>

      <p className="text-gray-500 mb-4">
        1 {data.from.code} = {responseData[data.to.code].toFixed(6)}{" "}
        {data.to.code}
      </p>

      <p className="text-gray-500">
        1 {data.to.code} = {(1 / responseData[data.to.code]).toFixed(6)}{" "}
        {data.from.code}
      </p>
    </div>
  );
};
