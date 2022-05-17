import type { NextPage } from "next";
import Layout from "../src/components/Layout";
import WorkSpace from "../src/components/WorkSpace";
import MenuBar from "../src/components/MenuBar";
import TimeSeries from "../src/components/TimeSeries";
import StatusBar from "../src/components/StatusBar";

const Home: NextPage = () => {
  return (
    <Layout>
      <MenuBar />
      <WorkSpace />
      <TimeSeries />
      <StatusBar />
    </Layout>
  );
};

export default Home;
