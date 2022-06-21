import HelpLayout from "../../src/components/help/HelpLayout";
import playIcon from "../../public/play_arrow_black_24dp.svg";
import Image from "next/image";
import screenStructure from "../../public/help/howTo/screen_structure.png";
import elementsOfDiagram from "../../public/help/howTo/elements_of_diagram.png";
import { useLayoutEffect } from "react";
import { useHelpSelector, changeHelpPageAction } from "../../src/redux/help";
import { useAppDispatch } from "../../src/redux/stores";

const HowTo: React.FC = () => {
  const pageName = "使い方";
  const { currentHelpPage } = useHelpSelector();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    currentHelpPage !== pageName && dispatch(changeHelpPageAction(pageName));
  }, [currentHelpPage, dispatch]);

  return (
    <HelpLayout name={pageName}>
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 border-b-2 pb-2">使い方</h1>
        <p>Simulink Cloneの操作方法</p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">画面構成</h2>
        <p>画面の構成は以下の５つから構成されています。</p>
        <ul className="list-disc pl-8">
          <li>メニューバー</li>
          <li>ダイアグラム</li>
          <li>パレット</li>
          <li>コンソールウィンドウ</li>
          <li>ステータスバー</li>
        </ul>
        <Image src={screenStructure} width={700} height={400} alt="screenStructure" />
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">メニューバー</h3>
        </u>
        <p>
          シミュレーションの実行、終了時間/サンプリング時間の設定、ヘルプページへの参照ができます。
        </p>
        <ul className="list-disc pl-8">
          <li>
            シミュレーションは
            <span>
              <Image src={playIcon} width={16} height={16} alt="playIcon" />
            </span>
            アイコンをクリックすることで実行されます。
          </li>
          <li>終了時間は0-100[s]の間で設定してください。</li>
          <li>サンプリング時間は0.01[s]以上で設定してください。</li>
        </ul>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">ダイアグラム</h3>
        </u>
        <p>
          ダイアグラムを構築する領域です。
          <br />
          Simulink Cloneでは、ブロック線図によるダイアグラムを構築できます。
          <br />
          ブロック線図は信号の流れを図式的に表現するダイアグラムです。
          <br />
          Simulink Cloneにおけるブロック線図は以下の4つの基本要素で構成されます。
        </p>
        <ul className="list-disc pl-8">
          <li>ノード: 入出力のふるまいを決定づける要素</li>
          <li>入力ポート: ノードに対して信号の入力を受け付ける要素</li>
          <li>出力ポート: ノードからの出力信号を取り出す要素</li>
          <li>リンク: 入力ポートと出力ポートをつなぎ、信号の流れを決定づける要素</li>
        </ul>
        <p>
          また、ノードとそのノードに関連づいた入力ポートおよび出力ポートをまとめてブロックと呼びます。
        </p>
        <Image src={elementsOfDiagram} width={600} height={300} alt="elementsOfDaigram" />
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">パレット</h3>
        </u>
        <p>
          用意されているブロックを格納した領域です。
          <br />
          ダイアグラムの構築はパレットに用意されたブロックを用いて行います。
        </p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">コンソールウィンドウ</h3>
        </u>
        <p>エラーメッセージを表示する領域です。</p>
      </div>

      <div className="mb-10">
        <u>
          <h3 className="text-2xl mb-4">ステータスバー</h3>
        </u>
        <p>シミュレーションの実行状態を表示します。</p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">ブロックの生成</h2>
        <p>
          ブロックの生成はパレットに用意されたブロックを選択した状態で、ダイアグラム領域内をクリックすることで、クリックした場所に生成できます。
          <br />
          選択されたパレット内のブロックは青く光り、ブロックを生成した後は選択が解除されます。
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">リンクの生成</h2>
        <p>
          リンクは入力ポートまたは出力ポートをクリックして選択した状態で、他の入力ポートまたは出力ポートをクリックすることで生成できます。
          <br />
          選択されたポートは青く光り、リンクを生成した後または別の要素を選択した後は選択が解除されます。
          <br />
          リンクの生成には以下の制約があります。
        </p>
        <ul className="list-disc pl-8">
          <li>入力ポート同士をつなぐことはできません。</li>
          <li>出力ポート同士をつなぐことはできません。</li>
          <li>入力ポートは一つのリンクのみを受け付けます。</li>
          <li>同一ノードにおける入力ポートと出力ポートはつなぐことができません。</li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">ブロックの削除</h2>
        <p>
          ブロックの削除は削除したいブロックを選択後、ctrl+クリックで削除できます。
          <br />
          削除するブロックに紐づくリンクはブロック削除と同時に削除されます。
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">リンクの削除</h2>
        <p>
          リンクの削除は削除したいリンクに紐づいたポートを選択後、ctrl+クリックで削除できます。
          <br />
          選択されたポートに複数のリンクがつながれている場合、そのすべてのリンクを削除します。
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">ブロックパラメータの変更</h2>
        <p>
          パラメータをもつブロックは、ブロックをダブルクリックすることで、パラメータを変更することができます。
          <br />
          ダブルクリック後パラメータを変更するためのダイアログボックスが表示されます。
          <br />
          パラメータ入力後、「OK」ボタンをクリックすることで、パラメータが確定します。
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">
          ダイアグラム領域の拡大および縮小
        </h2>
        <p>ダイアグラム領域内で、ctrl+ホイールスクロールにより領域を拡大・縮小できます。</p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2">シミュレーションの実行</h2>
        <p>
          シミュレーションは
          <span>
            <Image src={playIcon} width={16} height={16} alt="playIcon" />
          </span>
          アイコンをクリックすることで実行されます。
          <br />
          シミュレーションの実行結果はScopeブロックで表示できます。
          <br />
          未接続の入力ポートが存在する、ブロックのパラメータに不正な値が設定されている等で、実行を中止する場合があります。
          <br />
          実行が中止された場合、実行中止に起因するエラーメッセージをコンソールウィンドウに出力します。
        </p>
      </div>
    </HelpLayout>
  );
};
export default HowTo;
