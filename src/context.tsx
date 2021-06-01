import React, { useContext, useState } from "react";
import { Item, items as itemList } from "items";

export type Filter =
  | "LACTOSE_INTOLERANT"
  | "NUT_ALLERGY"
  | "PREFER_ORGANIC"
  | "KID_ITEMS"
  | "DISCOUNT";

export type Order = {
  items: Item[];
  quantity: number[];
  add: (id: number, count: number) => void;
  remove: (id: number) => void;
  total: () => number;

  filters: Filter[];
  filter: (item: Item) => boolean;
  filterAdd: (name: Filter) => void;
  filterRemove: (name: Filter) => void;
};

const OrderContext = React.createContext<Order>({} as any);

export const OrderProvider: React.FC = ({ children }) => {
  const items = useState(itemList.slice())[0];
  const [quantity, setQuantity] = useState(items.map((_) => 0));

  // Filters
  const [filters, setFilters] = useState<Filter[]>([]);

  const add = (id: number, count: number = 0) => {
    // Add an item. id should be the index of the item
    let copy = quantity.slice();
    copy[id] += count;
    setQuantity(copy);
  };

  const remove = (id: number) => {
    // Remove an item. id should be the index of the item
    let copy = quantity.slice();
    copy[id] = 0;
    setQuantity(copy);
  };

  const filterAdd = (name: Filter): void => {
    setFilters([name, ...filters]);
  };

  const filterRemove = (name: Filter): void => {
    setFilters(filters.filter((el) => el !== name));
  };

  const filter = (item: Item): boolean => {
    // True if item should be removed
    if (filters.includes("LACTOSE_INTOLERANT") && item.lactose) {
      return true;
    } else if (filters.includes("NUT_ALLERGY") && item.nuts) {
      return true;
    } else if (filters.includes("PREFER_ORGANIC") && !item.organic) {
      return true;
    } else if (filters.includes("KID_ITEMS") && !item.kids) {
      return true;
    } else if (filters.includes("DISCOUNT") && item.save == undefined) {
      return true;
    }

    return false;
  };

  const total = (): number => {
    return quantity
      .map((count, i) => items[i].price * count)
      .reduce((total, price) => total + price, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        quantity,
        add,
        remove,
        total,
        filters,
        filter,
        filterAdd,
        filterRemove,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
