import HelpLayout from "../../src/components/help/HelpLayout";
import { useStateContext } from "../../src/context/StateContext";
import { useLayoutEffect } from "react";
import Image from "next/image";
import scopePalette from "../../public/help/scope_palette.png";
import scopeDiagram from "../../public/help/scope_diagram.png";

const Scope: React.FC = () => {
  const pageName = "Scope";
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
        <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">Scope</h1>
        <p>入力信号のシミュレーション結果を表示</p>
        <div className="flex gap-8">
          <div className="w-32">
            <Image src={scopePalette} width={128} height={80} alt="scopePalette" />
            <p className="text-center">パレット表示</p>
          </div>
          <div className="w-32">
            <Image src={scopeDiagram} width={128} height={80} alt="scopeDiagram" />
            <p className="text-center">ダイアグラム表示</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">説明</h2>
        <p>
          Scopeブロックは入力信号のシミュレーション結果を時系列として表示します。
          <br />
          結果を表示するためにはシミュレーションの実行が完了されている必要があります。
          <br />
          シミュレーションの表示はScopeブロックをダブルクリックすることで表示されます。
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
        <p>Scopeブロックに出力ポートはありません。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">パラメータ</h3>
        </u>
        <p>Scopeブロックにパラメータはありません。</p>
      </div>
    </HelpLayout>
  );
};
export default Scope;
