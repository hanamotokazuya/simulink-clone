import HelpLayout from "../../src/components/help/HelpLayout";
import { useStateContext } from "../../src/context/StateContext";
import { useLayoutEffect } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import Image from "next/image";
import tutorialProcedure1 from "../../public/help/tutorial_procedure1.png";
import tutorialProcedure2 from "../../public/help/tutorial_procedure2.png";
import tutorialProcedure3 from "../../public/help/tutorial_procedure3.png";
import playIcon from "../../public/play_arrow_black_24dp.svg";
import tutorialResult from "../../public/help/tutorial_result.png";

const Tutorial: React.FC = () => {
  const pageName = "チュートリアル";
  const {
    state: { currentHelpPage },
    action,
  } = useStateContext();
  useLayoutEffect(() => {
    currentHelpPage !== pageName && action({ type: "CHANGE_HELP_PAGE", page: pageName });
  }, [currentHelpPage, action]);

  return (
    <MathJaxContext>
      <HelpLayout name={pageName}>
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">チュートリアル</h1>
          <p>
            代表的な物理系であるばねマスダンパ系を題材に、Simulink
            Cloneを用いたシミュレーション方法を学びます。
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">ばねマスダンパ系</h2>
          <p>
            本チュートリアルでは、図に示すような直線運動をするばねマスダンパ系をシミュレーションします。
            <br />
            入力は質量
            <MathJax inline>{"\\(M\\)"}</MathJax>[kg] の物体に加えられる力
            <MathJax inline>{"\\(f(t)\\)"}</MathJax>[N] であり、出力はその結果生じる物体の変位
            <MathJax inline>{"\\(x(t)\\)"}</MathJax>[m] とします。
            <br />
            ばねは変位に比例した力
            <MathJax inline>{"\\(f_K(t)\\)"}</MathJax>[N]を、ダンパは速度に比例した力
            <MathJax inline>{"\\(f_D(t)\\)"}</MathJax>[N]をそれぞれ変位とは逆の方向に発生します。
            <br />
            ばね定数を<MathJax inline>{"\\(K\\)"}</MathJax>[N/m]、ダンパの粘性摩擦係数を
            <MathJax inline>{"\\(D\\)"}</MathJax>[Ns/m]とおくと、
            <MathJax inline>{"\\(f_K(t)=-Kx(t), f_D(t)=-D(dx(t)/dt)\\)"}</MathJax>となります。
            <br />
            物体に加わる力の総和は<MathJax inline>{"\\(f(t)+f_K(t)+f_D(t)\\)"}</MathJax>
            なので、ニュートンの運動の第2法則より、
          </p>
          <MathJax>{"\\(M\\frac{d^2x(t)}{dt^2}=f(t)-Kx(t)-D\\frac{dx(t)}{dt}\\)"}</MathJax>
          <p>が成り立ちます。よって入出力関係は、</p>
          <MathJax>{"\\(M\\frac{d^2x(t)}{dt^2}+D\\frac{dx(t)}{dt}+Kx(t)=f(t)\\)"}</MathJax>
          <p>と微分方程式で記述されます。</p>
          <p>
            以降では、<MathJax inline>{"\\(M=2\\)"}</MathJax>[kg],{" "}
            <MathJax inline>{"\\(K=2.5\\)"}</MathJax>[N/m],{" "}
            <MathJax inline>{"\\(D=1.8\\)"}</MathJax>
            [Ns/m]として、モデルを設計していきます。
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">ブロック線図の作成</h2>
          <p>
            まず初めに、入力信号を生成するブロック(Constant)と、出力を受け取るブロック(Scope)を置いてみましょう。
            <br />
            (ブロックの生成はパレットに用意されたブロックを選択した状態で、ダイアグラム領域内をクリックすることで、クリックした場所に生成できます。)
          </p>
          <Image src={tutorialProcedure1} width={514} height={118} alt="tutorialProcedure1" />
          <p>
            ここで、入力信号は物体に加えられる力<MathJax inline>{"\\(f(t)\\)"}</MathJax>であり、
            出力信号は物体の変位<MathJax inline>{"\\(x(t)\\)"}</MathJax>です。
            <br />
            物体の変位は物体の加速度を２重積分することで求めることができます（変位、速度の初期値は０とする）。
            <br />
            ダイアグラム領域に積分ブロック(Integrator)を2つ置き、積分ブロックとScopeブロックをつないでみましょう。
          </p>
          <Image src={tutorialProcedure2} width={742} height={129} alt="tutorialProcedure2" />
          <p>
            ここで、左側の積分ブロックの入力ポートには、物体の加速度が入力されることを想定しています。
            また加速度はニュートンの運動の第２法則より求めることができます。
            <br />
            では実際に、Arithmeticブロック、Gainブロック、Constantブロックを使用して、加速度を求めるロジックを組んでみましょう。完成形は下図です。
          </p>
          <Image
            src={tutorialProcedure3}
            width={1363 * 0.8}
            height={244 * 0.8}
            alt="tutorialProcedure3"
          />
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">
            シミュレーションの実行と結果の確認
          </h2>
          <p>
            この時点で、ばねマスダンパ系のモデルを設計することができました。
            <br />
            それではメニューバーにある
            <span>
              <Image src={playIcon} width={16} height={16} alt="playIcon" />
            </span>
            アイコンをクリックして、シミュレーションを実行してみましょう。
            <br />
            シミュレーションが正常に行われた場合、ステータスバーに「実行完了」と表示されます。
            <br />
            結果はScopeブロックをダブルクリックすることで確認することができます。
            <br />
            Scopeブロックは横軸を時間、縦軸をScopeへの入力信号とした時系列を表示します。
          </p>
          <Image src={tutorialResult} width={1536 * 0.5} height={793 * 0.5} alt="tutorialResult" />
        </div>
      </HelpLayout>
    </MathJaxContext>
  );
};
export default Tutorial;
