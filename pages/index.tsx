import type { NextPage } from "next";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import WorkSpace from "../components/WorkSpace";
import Bar from "../components/Bar";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="bg-gray-600 text-3xl">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <Bar />
      <Menu />
      <WorkSpace />
    </Layout>
  );
};

export default Home;
