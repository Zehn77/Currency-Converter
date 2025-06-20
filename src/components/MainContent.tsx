import { ConversionSection } from "./ConversionSection";
import { HistorySection } from "./HistorySection";
import Storage from "../storage/storage";
import { useEffect, useState } from "react";
import type { StoredItem } from "../data/model";

export const MainContent = () => {
  const [items, setItems] = useState<StoredItem[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  const delelteItem = (id: number) => {
    Storage.delete(id);
    getItems();
  };

  const addItem = (item: StoredItem) => {
    Storage.save(item);
    getItems();
  };

  const getItems = () => {
    const items = Storage.get();
    setItems(items);
  };

  return (
    <main className="flex-grow container mx-auto">
      <ConversionSection addItem={addItem} />
      <HistorySection items={items} delelteItem={delelteItem} />
    </main>
  );
};
