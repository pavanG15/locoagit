import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Local Business App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Local Business App!</h1>
        <p>This is a Next.js project with Supabase integration.</p>
      </main>
    </div>
  );
}
