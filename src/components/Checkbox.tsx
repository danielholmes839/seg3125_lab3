type Props = {
  text: string;
  checked: boolean;
  setter: React.Dispatch<boolean>;
};

export const Checkbox: React.FC<Props> = ({ text, checked, setter }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="align-middle"
        checked={checked}
        onChange={(e) => setter(e.target.checked)}
      />{" "}
      <span className="align-middle my-0">{text}</span>
    </div>
  );
};

export default Checkbox;
