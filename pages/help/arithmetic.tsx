import HelpLayout from "../../src/components/help/HelpLayout";
import { useStateContext } from "../../src/context/StateContext";
import { useLayoutEffect } from "react";
import Image from "next/image";
import arithmeticPalette from "../../public/help/arithmetic/arithmetic_palette.png";
import arithmeticDiagram from "../../public/help/arithmetic/arithmetic_diagram.png";

const Arithmetic: React.FC = () => {
  const pageName = "Arithmetic";
  const {
    state: { currentHelpPage },
    action,
  } = useStateContext();
  useLayoutEffect(() => {
    currentHelpPage !== pageName && action({ type: "CHANGE_HELP_PAGE", page: pageName });
  }, [currentHelpPage, action]);

  return (
    <HelpLayout name={pageName}>
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">Arithmetic</h1>
        <p>四則演算</p>
        <div className="flex gap-8">
          <div className="w-32">
            <Image src={arithmeticPalette} width={128} height={80} alt="arithmeticPalette" />
            <p className="text-center">パレット表示</p>
          </div>
          <div className="w-32">
            <Image src={arithmeticDiagram} width={128} height={80} alt="arithmeticDiagram" />
            <p className="text-center">ダイアグラム表示</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">説明</h2>
        <p>
          Arithmeticブロックは、2つの入力信号を四則演算した値を出力します。
          <br />
          四則演算子は[operator]パラメータで指定します。
          <br />
          [operator]パラメータは、[+], [-], [*],
          [/]を指定でき、それぞれ、加算、減算、乗算、除算を意味します。
          <br />
          各演算子における演算内容は以下のとおりです。
        </p>
        <ul className="list-disc pl-8">
          <li>
            <span className="font-bold">加算：</span>入力１+入力２
          </li>
          <li>
            <span className="font-bold">減算：</span>入力１ー入力２
          </li>
          <li>
            <span className="font-bold">乗算：</span>入力１×入力２
          </li>
          <li>
            <span className="font-bold">除算：</span>入力１÷入力２
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">入力</h3>
        </u>
        <p>2つの実数信号を必要とします。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">出力</h3>
        </u>
        <p>2つの入力信号を四則演算した結果の信号を出力します。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">パラメータ</h3>
        </u>
        <p>
          <span className="font-bold">operator: </span>四則演算子(+, -, *, /)
        </p>
      </div>
    </HelpLayout>
  );
};
export default Arithmetic;
