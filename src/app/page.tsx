import { getServerAuthSession } from '@/server/auth';

export default async function HomePage() {
  const authSession = await getServerAuthSession(); //(1)
  return (
    <main className="flex items-center justify-center h-screen">
      <p>Welcome on Random Miam</p>
    </main>
  );
}
