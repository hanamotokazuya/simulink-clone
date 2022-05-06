import Head from "next/head";

type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Simulink Clone</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
