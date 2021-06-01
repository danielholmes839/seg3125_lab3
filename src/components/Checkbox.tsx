import React, { useEffect, useState } from "react";
import { Filter, useOrder } from "context";

type Props = {
  text: string;
  filter: Filter;
};

export const Checkbox: React.FC<Props> = ({ text, filter }) => {
  const { filters } = useOrder();
  const [checked, setChecked] = useState(filters.includes(filter));
  const { filterAdd, filterRemove } = useOrder();

  useEffect(() => {
    if (!checked) {
      filterRemove(filter);
    } else {
      filterAdd(filter);
    }
  }, [checked]);
  
  return (
    <div className="inline mr-5">
      <input
        type="checkbox"
        className="align-middle mr-2"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      <span className="align-middle my-0">{text}</span>
    </div>
  );
};

export default Checkbox;
