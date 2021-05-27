import { items, Item } from "items";
import React, { useState } from "react";
import Checkbox from "components/Checkbox";
import Nav, { View } from "components/Nav";

type AddItemProps = {
  item: Item;
  index: number;
  addItem: (index: number) => void;
};

const AddItem: React.FC<AddItemProps> = ({ item, index, addItem }) => {
  return (
    <div className="shadow mb-3 p-3 w-48 inline-block mr-5 mb-5">
      <h2 className="mb-2">
        {item.name} ${item.price}
      </h2>
      <button
        onClick={() => addItem(index)}
        className="w-full bg-green-500 py-1 px-3 text-xs text-white rounded-sm hover:bg-green-600 font-semibold focus:outline-none"
      >
        Add to Cart
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.CLIENT);
  const [lactoseIntolerant, setLactoseIntolerant] = useState<boolean>(false);
  const [nutAllergy, setNutAllergy] = useState<boolean>(false);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [order, setOrder] = useState<number[]>(items.map((_) => 0));

  const addItem = (item: number): void => {
    let copy = [...order];
    copy[item] += 1;
    setOrder(copy);
  };

  const removeItem = (item: number): void => {
    let copy = [...order];
    copy[item] = 0;
    setOrder(copy);
  };

  const total = () => {
    return order
      .map((count, i) => items[i].price * count)
      .reduce((total, price) => total + price, 0);
  };

  const filterItem = (item: Item): boolean => {
    if (lactoseIntolerant && item.lactose) {
      return false;
    } else if (nutAllergy && item.nuts) {
      return false;
    } else if (organicOnly && !item.organic) {
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-6xl mb-3">Loblaws</h1>
      <Nav setView={setView} current={view} />
      {view === View.CLIENT && (
        <div>
          <h1 className="text-4xl font-semibold mb-3">Client Information</h1>
          <Checkbox
            text="Lactose Intolerant"
            checked={lactoseIntolerant}
            setter={setLactoseIntolerant}
          />
          <Checkbox
            text="Nut Allergy"
            checked={nutAllergy}
            setter={setNutAllergy}
          />
          <Checkbox
            text="Organic Only"
            checked={organicOnly}
            setter={setOrganicOnly}
          />
        </div>
      )}

      {view === View.PRODUCTS && (
        <div>
          <h1 className="text-4xl font-semibold mb-3">Products</h1>
          {items.map((item, i) => {
            if (!filterItem(item)) {
              return;
            }

            return <AddItem item={item} index={i} addItem={addItem} />;
          })}
        </div>
      )}

      {view === View.CART && (
        <div className="shadow mb-3 p-3">
          <h1 className="text-4xl font-semibold mb-3">Cart</h1>

          {order.map((count, i) => {
            if (count === 0) {
              return;
            }

            let item = items[i];
            return (
              <div className="w-72 mb-1">
                <h2>
                  {item.name} x{count} - ${item.price * count}{" "}
                  <button
                    onClick={() => removeItem(i)}
                    className="float-right text-red-500"
                  >
                    Remove
                  </button>
                </h2>
              </div>
            );
          })}
          <p className="font-semibold mt-3">Total: ${total()}</p>
        </div>
      )}
      <p className="absolute bottom-0 mb-5 text-gray-500">
        Created by Daniel Holmes
      </p>
    </div>
  );
};

export default App;
