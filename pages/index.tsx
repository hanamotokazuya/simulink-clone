import type { NextPage } from "next";
import Layout from "../components/Layout";
import Gain from "../components/Gain";
import Menu from "../components/Menu";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="bg-gray-600 text-3xl">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <Gain />
      <Menu />
    </Layout>
  );
};

export default Home;
