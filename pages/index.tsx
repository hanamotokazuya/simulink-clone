import type { NextPage } from "next";
import Layout from "../components/Layout";
import WorkSpace from "../components/WorkSpace";
import Bar from "../components/Bar";

const Home: NextPage = () => {
  return (
    <Layout>
      <Bar />
      <WorkSpace />
    </Layout>
  );
};

export default Home;
