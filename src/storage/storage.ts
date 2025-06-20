import type { StoredItem } from "./../data/model";

const KEY = "storage";

class Storage {
  static get(): StoredItem[] {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data).reverse() : [];
  }

  static delete(id: number) {
    const items = Storage.get();
    const newItems = items.filter((item) => item.id !== id);
    localStorage.setItem(KEY, JSON.stringify(newItems));
  }

  static save(newItem: StoredItem) {
    const items = Storage.get();
    items.push(newItem);
    localStorage.setItem(KEY, JSON.stringify(items));
  }
}

export default Storage;
