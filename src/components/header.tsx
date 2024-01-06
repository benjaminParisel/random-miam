import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import UserHeader from '@/components/user/userHeader';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

export default async function Header() {
  const session = await getServerAuthSession(); //(1)

  return (
    <div className="flex items-center bg-gray-800">
      <div className="flex flex-1 sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/">
            <Image
              src="/random-miam.png"
              alt="Random-miam"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center">
        {!session && (
          <Link
            className="font-medium mt-2 text-blue-600 hover:underline"
            href="/login"
          >
            Login
          </Link>
        )}
        {session && <UserHeader user={session?.user} />}
      </div>
    </div>
  );
}
