import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import UserInfo from '@/components/user/userInfo';

export default async function myAccount() {
  const authSession = await getServerAuthSession(); //(1)
  console.log('authSession', authSession);
  return (
    <main className="flex items-center justify-center h-screen">
      {authSession?.user && <UserInfo user={authSession?.user} />}
    </main>
  );
}
