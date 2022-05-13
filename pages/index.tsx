import type { NextPage } from "next";
import Layout from "../src/components/Layout";
import WorkSpace from "../src/components/WorkSpace";
import Bar from "../src/components/Bar";

const Home: NextPage = () => {
  return (
    <Layout>
      <Bar />
      <WorkSpace />
    </Layout>
  );
};

export default Home;
