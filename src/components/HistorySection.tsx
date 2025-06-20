import type { StoredItem } from "../data/model";
import { MdDeleteSweep } from "react-icons/md";

export const HistorySection = ({
  items,
  delelteItem,
}: {
  items: StoredItem[];
  delelteItem: (id: number) => void;
}) => {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Conversion History
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center">No history yet</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-700 font-medium">
                  {item.amount} {item.amountName}
                </span>
                <p className="text-blue-600 font-semibold mt-2">
                  {item.resultAmount} {item.resultAmountName}
                </p>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(item.date).toLocaleString()}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => delelteItem(item.id)}
                  className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  <MdDeleteSweep className="w-6 h-6 text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
