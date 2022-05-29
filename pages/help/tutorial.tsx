import HelpLayout from "../../src/components/help/HelpLayout";
import { useStateContext } from "../../src/context/StateContext";
import { useLayoutEffect } from "react";

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
    <HelpLayout name={pageName}>
      <h1>チュートリアル</h1>
    </HelpLayout>
  );
};
export default Tutorial;
