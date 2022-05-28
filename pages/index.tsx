import type { NextPage } from "next";
import Layout from "../src/components/Layout";
import WorkSpace from "../src/components/WorkSpace";
import MenuBar from "../src/components/MenuBar";
import TimeSeries from "../src/components/TimeSeries";
import StatusBar from "../src/components/StatusBar";
import ConsoleWindow from "../src/components/ConsoleWindow";

const Home: NextPage = () => {
  return (
    <Layout>
      <MenuBar />
      <div className="mx-auto w-[1700px]">
        <WorkSpace />
        <ConsoleWindow />
      </div>
      <TimeSeries />
      <StatusBar />
    </Layout>
  );
};

export default Home;
