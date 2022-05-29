import HelpLayout from "../../src/components/help/HelpLayout";

const Integrator: React.FC = () => {
  return (
    <HelpLayout name="Integrator">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">Integrator</h1>
        <p>信号を積分</p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">説明</h2>
        <p>
          Integratorブロックは、入力信号を時間で積分した値を出力します。
          <br />
          数値解析は後退オイラー法による離散時間積分で行われます。
          <br />
          初期条件は[initVal]パラメータで指定します。
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
        <p>入力信号を時間で積分した結果の信号を出力します。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">パラメータ</h3>
        </u>
        <p>
          <span className="font-bold">initVal: </span>初期条件
        </p>
      </div>
    </HelpLayout>
  );
};
export default Integrator;
