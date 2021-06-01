import { Item } from "items";
import React, { useState } from "react";
import Checkbox from "components/Checkbox";
import Nav, { View } from "components/Nav";
import { useOrder } from "context";

type ItemCardProps = {
  id: number;
  item: Item;
};

const ItemCard: React.FC<ItemCardProps> = ({ id, item }) => {
  const { add } = useOrder();

  return (
    <div className="shadow mb-3 p-3 inline-block mr-5 mb-5">
      <h2 className="mb-2">
        {item.name} ${item.price}{" "}
        {item.save !== undefined && (
          <span className="float-right tracking-wider bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold align-middle">
            SAVE ${item.save}
          </span>
        )}
      </h2>
      <button
        onClick={() => add(id, 1)}
        className="py-1 w-full text-xs rounded-sm bg-green-500 hover:bg-green-600 text-white font-semibold focus:outline-none"
      >
        Add to Order
      </button>
    </div>
  );
};

const Products: React.FC = () => {
  const { items, filter } = useOrder();
  return (
    <div>
      <div className="mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline align-middle mr-2"
          height={30}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h1 className="text-4xl font-semibold inline align-middle">Products</h1>
      </div>
      <div className="mb-5">
        <Checkbox text="Lactose Intolerant" filter={"LACTOSE_INTOLERANT"} />
        <Checkbox text="Nut Allergy" filter={"NUT_ALLERGY"} />
        <Checkbox text="Organic Only" filter={"PREFER_ORGANIC"} />
        <Checkbox text="Kids Items" filter={"KID_ITEMS"} />
        <Checkbox text="Discount" filter={"DISCOUNT"} />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
        {items.map((item, i) => {
          if (filter(item)) return;
          return <ItemCard id={i} item={item} />;
        })}
      </div>
    </div>
  );
};

const CartIcon: React.FC = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="inline align-middle mr-2"
        height={30}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </>
  );
};
const Cart: React.FC = () => {
  const { items, quantity, remove, total } = useOrder();
  const [deliver, setDeliver] = useState(true);
  const empty = quantity.reduce((a, b) => a + b, 0) === 0;

  return (
    <div className="shadow px-5 py-3 mb-5">
      {/* Title */}
      <div>
        <CartIcon />
        <h1 className="text-4xl font-semibold inline align-middle">Order</h1>
      </div>

      <div className="mt-3">
        {empty && (
          <p className="text-red-500">
            Please order at least one item before completing checkout
          </p>
        )}

        {!empty && (
          <div>
            {/* Items in the order */}
            <div>
              {items.map((item, i) => {
                const count = quantity[i];
                if (count === 0) return;
                return (
                  <div className="mb-1 w-96">
                    <h2>
                      {item.name} x {count} - ${item.price * count}{" "}
                      <button
                        onClick={() => remove(i)}
                        className="float-right text-red-500"
                      >
                        Remove
                      </button>
                    </h2>
                  </div>
                );
              })}
            </div>

            {/* Price */}
            <div className="mt-3">
              <p className="font-semibold">
                Total: ${total()}{" "}
                {deliver && (
                  <span className="text-red-500 text-xs align-top">
                    +$5 Delivery Fee
                  </span>
                )}
              </p>
            </div>

            {/* Order method */}
            <div className="mt-5" onChange={() => setDeliver(!deliver)}>
              <input
                className="mr-1"
                checked={deliver}
                type="radio"
                value="deliver"
                name="order-type"
              />
              <span className="mr-4">Delivery</span>
              <input
                checked={!deliver}
                className="mr-1"
                type="radio"
                value="pickup"
                name="order-type"
              />
              <span className="mr-4">Pickup</span>
            </div>

            {/* Checkout button */}
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-1 mr-2 mt-2 text-white text-sm font-semibold focus:outline-none rounded-sm">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.PRODUCTS);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-6xl mb-5">Loblaws</h1>

      {view === View.PRODUCTS && <Products />}

      {view === View.CART && <Cart />}

      <Nav setView={setView} current={view} />

      <p className="absolute bottom-0 mb-5 text-gray-500">
        Created by Daniel Holmes
      </p>
    </div>
  );
};

export default App;
