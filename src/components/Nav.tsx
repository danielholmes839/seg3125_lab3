export enum View {
  PRODUCTS,
  CART,
}

type Props = { setView: React.Dispatch<View>; current: View };

const NavButton: React.FC<{
  setView: React.Dispatch<View>;
  to: View;
  text: string;
}> = ({ setView, to, text }) => {
  return (
    <button
      className={`py-1 px-3 mr-3 text-xs rounded-sm border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold focus:outline-none`}
      onClick={() => setView(to)}
    >
      {text}
    </button>
  );
};

export const Nav: React.FC<Props> = ({ setView, current }) => {
  return (
    <div>
      {current === View.CART && (
        <NavButton setView={setView} to={View.PRODUCTS} text="< Products" />
      )}
      {current === View.PRODUCTS && (
        <NavButton setView={setView} to={View.CART} text="Checkout >" />
      )}
    </div>
  );
};

export default Nav;
