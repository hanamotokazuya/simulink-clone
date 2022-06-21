import {
  useDialogSelector,
  changeParamsAction,
  closeDialogAction,
  setPropertyAction,
} from "../redux/dialog";
import { useAppDispatch } from "../redux/stores";

/**
 * ブロックに付与されているふるまいインスタンスのパラメータを変更するためのダイアログボックス
 */
const DialogBox = () => {
  const { inputParams, dialogContent, openDialog } = useDialogSelector();
  const dispatch = useAppDispatch();
  const handleClickChangeParams = (idx: number, value: string) => {
    dispatch(changeParamsAction(idx, value));
  };
  return (
    <>
      {inputParams.length !== 0 && (
        <div className={`${openDialog ? "" : "hidden"} fixed w-screen h-screen z-50`}>
          <div className="absolute bg-gray-500 w-full h-full opacity-50"></div>
          <div className="absolute flex flex-col bg-white w-96 p-4 pt-0 rounded-md border-2 border-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between mb-2 border-b-2">
              <div>{dialogContent[0]}</div>
              <div className="cursor-pointer" onClick={() => dispatch(closeDialogAction())}>
                x
              </div>
            </div>
            {dialogContent[1].map(([param, value], i) => (
              <div key={i} className="flex justify-start gap-4 mb-2">
                <div>{param}: </div>
                <input
                  className="border-2"
                  value={inputParams[i]}
                  onChange={(e) => handleClickChangeParams(i, e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="border-2 px-6 py-1 rounded-md bg-gray-100 font-bold"
                onClick={() => dispatch(setPropertyAction())}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBox;
