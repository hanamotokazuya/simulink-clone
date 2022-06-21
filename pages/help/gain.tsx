import HelpLayout from "../../src/components/help/HelpLayout";
import { useLayoutEffect } from "react";
import Image from "next/image";
import gainPalette from "../../public/help/gain/gain_palette.png";
import gainDiagram from "../../public/help/gain/gain_diagram.png";
import { useHelpSelector, changeHelpPageAction } from "../../src/redux/help";
import { useAppDispatch } from "../../src/redux/stores";

const Gain: React.FC = () => {
  const pageName = "Gain";
  const { currentHelpPage } = useHelpSelector();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    currentHelpPage !== pageName && dispatch(changeHelpPageAction(pageName));
  }, [currentHelpPage, dispatch]);

  return (
    <HelpLayout name={pageName}>
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">Gain</h1>
        <p>入力に定数を乗算</p>
        <div className="flex gap-8">
          <div className="w-32">
            <Image src={gainPalette} width={128} height={80} alt="gainPalette" />
            <p className="text-center">パレット表示</p>
          </div>
          <div className="w-32">
            <Image src={gainDiagram} width={128} height={80} alt="gainDiagram" />
            <p className="text-center">ダイアグラム表示</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">説明</h2>
        <p>
          Gainブロックは、入力に定数値(ゲイン)を乗算します。
          <br />
          ゲインの値は[gain]パラメータで指定します。
        </p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">入力</h3>
        </u>
        <p>実数信号を必要とします。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">出力</h3>
        </u>
        <p>入力にゲインを乗算した結果の信号を出力します。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">パラメータ</h3>
        </u>
        <p>
          <span className="font-bold">gain: </span>乗算のための定数値
        </p>
      </div>
    </HelpLayout>
  );
};
export default Gain;
