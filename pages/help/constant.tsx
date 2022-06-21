import HelpLayout from "../../src/components/help/HelpLayout";
import { useLayoutEffect } from "react";
import Image from "next/image";
import constantPalette from "../../public/help/constant/constant_palette.png";
import constantDiagram from "../../public/help/constant/constant_diagram.png";
import { useHelpSelector, changeHelpPageAction } from "../../src/redux/help";
import { useAppDispatch } from "../../src/redux/stores";

const Constant: React.FC = () => {
  const pageName = "Constant";
  const { currentHelpPage } = useHelpSelector();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    currentHelpPage !== pageName && dispatch(changeHelpPageAction(pageName));
  }, [currentHelpPage, dispatch]);

  return (
    <HelpLayout name={pageName}>
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">Constant</h1>
        <p>定数値の生成</p>
        <div className="flex gap-8">
          <div className="w-32">
            <Image src={constantPalette} width={128} height={80} alt="constantPalette" />
            <p className="text-center">パレット表示</p>
          </div>
          <div className="w-32">
            <Image src={constantDiagram} width={128} height={80} alt="constantDiagram" />
            <p className="text-center">ダイアグラム表示</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">説明</h2>
        <p>
          Constantブロックは、実数の定数値信号を生成します。このブロックを用いて定数信号入力を提供します。
          <br />
          定数値は[constant]パラメータで指定します。
        </p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">入力</h3>
        </u>
        <p>Constantブロックに入力ポートはありません。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">出力</h3>
        </u>
        <p>設定した定数値信号を出力します。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">パラメータ</h3>
        </u>
        <p>
          <span className="font-bold">constant: </span>出力する定数値
        </p>
      </div>
    </HelpLayout>
  );
};
export default Constant;
