import type { NextPage } from "next";
import Layout from "../src/components/Layout";
import WorkSpace from "../src/components/WorkSpace";
import Bar from "../src/components/Bar";
import TimeSeries from "../src/components/TimeSeries";

const Home: NextPage = () => {
  return (
    <Layout>
      <Bar />
      <WorkSpace />
      <TimeSeries />
    </Layout>
  );
};

export default Home;
