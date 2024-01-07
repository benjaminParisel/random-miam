import Link from 'next/link';
import UserHeader from '@/components/user/userHeader';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import { navigation } from '@/app/NavigationLink';

export default async function Header() {
  const session = await getServerAuthSession(); //(1)

  return (
    <div className="flex items-center bg-gray-800 min-h-16">
      <div className="min-w-4 p-2">
        <Link href="/">
          <Image
            src="/random-miam.png"
            alt="Random-miam"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className="hidden sm:ml-6 sm:block flex-grow">
        <div className="flex space-x-4">
          {navigation.map((item, key) => (
            <Link
              href={item.href}
              key={key}
              className={cn(
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-end min-w-28 px-2">
        <div className="flex flex-row gap-3 items-center">
          {!session && (
            <Link
              className="font-medium text-gray-300 hover:bg-gray-700 hover:text-white mt-2 hover:underline"
              href="/login"
            >
              Se connecter
            </Link>
          )}
          {session && <UserHeader user={session?.user} />}
        </div>
      </div>
    </div>
  );
}
