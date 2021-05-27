import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";
import "public/css/global.css";

const RootApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>amamov</title>
      </Head>
      <Component />
    </>
  );
};

export default RootApp;
