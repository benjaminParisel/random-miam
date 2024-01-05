'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const { data: session, status } = useSession();
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <div>{status === 'authenticated' && session.user?.name}</div>
      {status === 'authenticated' && (
        <button
          className="font-medium mt-2 text-blue-600 hover:underline"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
      {!status && (
        <Link
          className="font-medium mt-2 text-blue-600 hover:underline"
          href="/login"
        >
          Login
        </Link>
      )}
    </div>
  );
}
