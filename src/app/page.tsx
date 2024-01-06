import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import UserInfo from '../components/user/userInfo';

export default async function HomePage() {
  const authSession = await getServerAuthSession(); //(1)
  console.log('authSession', authSession);
  return (
    <main className="flex items-center justify-center h-screen">
      <p>Welcome on Random Miam</p>
    </main>
  );
}
