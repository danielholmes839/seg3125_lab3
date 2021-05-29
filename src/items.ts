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
  save?: number;
  organic?: boolean;
  lactose?: boolean;
  nuts?: boolean;
  kids?: boolean;
};

const items: Item[] = [
  {
    name: "Apple",
    price: 1,
    save: 1,
    discount: 25,
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
    save: 2,
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
    save: 1,
  },
  {
    name: "French Fries",
    price: 2,
    save: 1,
  },
  {
    name: "Diapers",
    save: 5,
    price: 30,
    kids: true,
  },
  {
    name: "Dinosaur Chicken Nuggets",
    price: 3,
    kids: true,
  },
  {
    name: "Star Wars Chicken Nuggets",
    price: 3,
    kids: true,
  },
].sort((a, b) => a.price - b.price);

export { items };
