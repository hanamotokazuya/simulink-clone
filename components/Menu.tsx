import { useStateContext } from "../context/StateContext";

const Menu: React.FC = () => {
  const { action } = useStateContext();
  const handleSelectComponent = (e: string) => {
    action({ type: "SELECT_COMPONENT", component: e });
  };
  return (
    <div className="fixed right-0 h-full w-1/5 bg-gray-300 flex flex-col items-start z-10">
      <button name="Gain" onClick={(e) => handleSelectComponent(e.currentTarget.name)}>
        Gain
      </button>
      <button name="Constant" onClick={(e) => handleSelectComponent(e.currentTarget.name)}>
        Constant
      </button>
      <button name="Integrator" onClick={(e) => handleSelectComponent(e.currentTarget.name)}>
        Integrator
      </button>
      <button name="Scope" onClick={(e) => handleSelectComponent(e.currentTarget.name)}>
        Scope
      </button>
    </div>
  );
};

export default Menu;
