import type { NextPage } from 'next';
import Head from 'next/head';
import { HelpButton } from '../src/components/helpButton';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>👀 Bottom right 👉👇</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HelpButton />
    </>
  );
};

export default Home;
