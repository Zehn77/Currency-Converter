import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import type { Currency } from "../data/model";

type CurrencySelectorProps = {
  title: string;
  current: Currency;
  currencies: Currency[];
  onChange: (newCurrency: Currency) => void;
};

export const CurrencySelector = ({
  title,
  current,
  currencies,
  onChange,
}: CurrencySelectorProps) => {
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filterCurrenciesBySearchTerm = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();

    const filtered = currencies.filter((currency) => {
      return (
        currency.code.toLowerCase().includes(term) ||
        currency.name.toLowerCase().includes(term) ||
        currency.symbol.toLowerCase().includes(term)
      );
    });

    setFilteredCurrencies(filtered);
  };

  return (
    <div
      className={`relative min-h-24 flex flex-col p-4 flex-1 border border-gray-200 rounded-lg hover:bg-gray-50 ${
        open ? "ring-2 ring-blue-400" : ""
      }`}
    >
      {!open && (
        <label
          htmlFor={title}
          className={`text-gray-500 p-4 block cursor-pointer text-sm absolute top-0 left-0 right-0 bottom-0`}
        >
          <div className="">
            <p className="text-gray-500 text-sm">{title}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center ">
                <img
                  src={current.flag}
                  alt={current.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <h3 className="font-semibold text-xl">
                  {current.code}{" "}
                  <span className="text-gray-400">- {current.name}</span>
                </h3>
              </div>
              <SlArrowDown className="mr-6 w-4 h-4 text-black" />
            </div>
          </div>
        </label>
      )}

      <div
        className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-end px-8 ${
          open ? "z-0" : "-z-10 overflow-hidden"
        }`}
      >
        <input
          type="text"
          id={title}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            setSearchTerm("");
          }}
          className="absolute left-0 right-0 bottom-0 top-0 outline-none px-7 placeholder:font-medium placeholder:text-gray-300"
          placeholder="Type to search..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => {
            const searchTerm = e.target.value;
            setSearchTerm(searchTerm);
            filterCurrenciesBySearchTerm(searchTerm);
          }}
        />

        <button className="cursor-pointer z-10">
          <IoCloseOutline className="text-black w-6 h-6 mr-1" />
        </button>

        <ul className="absolute top-[100px] left-0 right-0 border border-gray-200 rounded-lg py-2 bg-white z-20">
          {filteredCurrencies.map((currency) => (
            <li
              onMouseDown={() => onChange(currency)}
              key={currency.id}
              className="hover:bg-gray-50 flex px-3 py-2 gap-2 cursor-pointer items-center justify-start"
            >
              <img src={currency.flag} alt="" className="h-8 w-8" />
              <p className="font-semibold">{currency.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
