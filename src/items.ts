export enum Property {
  ORGANIC,
  VEGETARIAN,
  GLUTEN_FREE,
  CONTAINS_LACTOSE,
  CONTAINS_NUTS,
}

export type Item = {
  name: string;
  price: number;
  organic?: boolean;
  lactose?: boolean;
  nuts?: boolean;
};

const items: Item[] = [
  {
    name: "Apple",
    price: 1,
    organic: true,
  },
  {
    name: "Orange",
    price: 1,
    organic: true,
  },
  {
    name: "Milk",
    price: 5,
    organic: true,
    lactose: true,
  },
  {
    name: "Almond Milk",
    price: 5,
    organic: true,
    nuts: true,
  },
  {
    name: "Ice Cream",
    price: 10,
    lactose: true,
  },
  {
    name: "Peanut Butter",
    price: 3,
    nuts: true,
  },
  {
    name: "Peanuts",
    price: 1,
    nuts: true,
    organic: true,
  },
  {
    name: "Lays Chips",
    price: 2,
  },
  {
    name: "Chicken Nuggets",
    price: 4,
  },
  {
    name: "French Fries",
    price: 2,
  },
].sort((a, b) => a.price - b.price);

export { items };
