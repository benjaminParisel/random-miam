'use client';
import { signIn } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      onClick={async () => {
        await signIn('credentials', {
          username: 'alex@email.com',
          password: 'qqqqq',
        });
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Login
    </button>
  );
};
