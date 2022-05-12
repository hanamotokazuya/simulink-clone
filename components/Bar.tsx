import { ComponentBase } from "../lib/diagrams/src/behavior";

const Bar: React.FC = () => {
  const handleExec = () => {
    ComponentBase.run();
    console.log(ComponentBase.results);
  };
  return (
    <div className="fixed top-0 left- 0 w-full h-10 bg-gray-200 flex items-center z-50">
      <div className="bg-green-400 w-8 h-8 rounded-full" onClick={handleExec}></div>
    </div>
  );
};

export default Bar;
