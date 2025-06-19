import usaFlag from "./../assets/images/usa.svg";
import usbFlag from "./../assets/images/uzb.svg";
import eurFlag from "./../assets/images/eur.svg";
import type { Currency } from "./model";

export const currencies: Currency[] = [
  {
    id: 0,
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: usaFlag,
  },
  {
    id: 1,
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: eurFlag,
  },
  {
    id: 2,
    code: "UZS",
    name: "Uzbek So'm",
    symbol: "so'm",
    flag: usbFlag,
  },
];
