import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HelpButton } from '../src/components/helpButton';

const Home: NextPage = () => {
  useEffect(() => {
  let script = document.createElement('script');
  script.async = false;
  script.onload = function(){
    (window as any).Plain.init({
      appId: 'liveChatApp_01J9XJ0Z9WZC9CXQXMR7FT1BC7',
      hideLauncher: true,
    });
  };
  script.src = 'https://chat.cdn-plain.com/index.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  }, []);

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
