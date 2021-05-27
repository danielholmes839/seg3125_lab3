export enum View {
  CLIENT,
  PRODUCTS,
  CART,
}

type Props = { setView: React.Dispatch<View>; current: View };

const NavButton: React.FC<Props & { to: View; text: string }> = ({
  setView,
  current,
  to,
  text,
}) => {
  const style = current === to ? "underline" : "";

  return (
    <button
      className={`text-blue-500 focus:outline-none mr-4 ${style}`}
      onClick={() => setView(to)}
    >
      {text}
    </button>
  );
};

export const Nav: React.FC<Props> = ({ setView, current }) => {
  return (
    <div className="mb-5">
      <NavButton
        current={current}
        setView={setView}
        to={View.CLIENT}
        text="Client"
      />
      <NavButton
        current={current}
        setView={setView}
        to={View.PRODUCTS}
        text="Products"
      />

      <NavButton
        current={current}
        setView={setView}
        to={View.CART}
        text="Cart"
      />
    </div>
  );
};

export default Nav;
