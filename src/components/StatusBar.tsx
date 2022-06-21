import { useEffect, useRef } from "react";
import { useStatusSelector } from "../redux/status";

/**
 * 実行状態を表示するステータスバー
 */
const StatusBar: React.FC = () => {
  const { status } = useStatusSelector();
  const statusMessage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (statusMessage.current) {
      switch (status) {
        case "READY":
          break;
        case "INITIALIZING":
          statusMessage.current.textContent = "初期化中...";
        case "CHECKING":
          statusMessage.current.textContent = "チェック...";
        case "RUNNING":
          statusMessage.current.textContent = "実行中...";
          break;
        case "FINISHED":
          statusMessage.current.textContent = "実行完了";
          break;
        case "ERROR":
          statusMessage.current.textContent = "実行を中止しました";
          break;
        default:
          break;
      }
    }
  }, [status]);
  return (
    <div
      ref={statusMessage}
      className="fixed bottom-0 w-screen bg-gray-200 h-8 flex items-center pl-2"
    ></div>
  );
};

export default StatusBar;
