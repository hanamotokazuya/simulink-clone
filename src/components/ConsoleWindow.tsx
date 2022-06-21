import { useStateContext } from "../context/StateContext";

/**
 * エラーメッセージを表示するためのコンソールウィンドウ
 */
const ConsoleWindow: React.FC = () => {
  const {
    state: { errorMessages },
  } = useStateContext();
  return (
    <div className="w-[1700px] h-36 p-1 border-2 border-black border-t-0 text-red-500 font-bold overflow-auto">
      {errorMessages instanceof Array &&
        errorMessages.length > 0 &&
        errorMessages.map((message, i) => <div key={i}>{`> ${message}`}</div>)}
    </div>
  );
};
export default ConsoleWindow;
