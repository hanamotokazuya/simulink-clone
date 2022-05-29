import SideBar from "./SideBar";
import Header from "./Header";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
  name: string;
};

const Container: React.FC<Props> = ({ children, name }) => {
  return (
    <>
      <Head>
        <title>Simulink Clone Help: {name}</title>
      </Head>
      <main>
        <Header />
        <div className="w-screen">
          <SideBar />
          <div className="absolute left-44 top-10 px-10 pt-8">{children}</div>
        </div>
      </main>
    </>
  );
};
export default Container;
