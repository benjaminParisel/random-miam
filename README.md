This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Docker image

You can run `docker build -t random-miam .` then `docker run -p 3000:3000 random-miam`

# Setup Authentification on local dev

If you face any of the following errors, Follow these steps and the error will be fixed as My one was fixed.

1. code: 'JWT_SESSION_ERROR' name: 'JWEDecryptionFailed

2. MissingSecret [MissingSecretError]: Please define a `secret` in production.

3.ERROR[next - auth][error][NO_SECRET];
Step 1 Generate a secret:

To do this, open a terminal under Linux (In Window Open Hyper or CMD) and type : openssl rand -base64 32
The output of this order will be your secret, a string like : Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=

2- Place this secret in an environment variable:

I recommend you to put this secret in an environment variable. You can use the .env file (or .env.local) or directly your next.config.js file. Here I take the example of the next.config.js file that I prefer to work with. In this file, add the line with the value NEXTAUTH_SECRET and your secret.
My Example in .env file: NEXTAUTH_SECRET='78zFZvyspgAIBXPKdA0AhFqcNWXX16/CEmBFOHU3iOg='

3- Adding the secret in the next-auth configuration:

Once your secret is set as an environment variable, next-auth must be able to access it. Under NextJS, environment variables are accessible on the server side through the process.env object and it is the NEXTAUTH_SECRET property that we are interested in here,
On your application, go to the file /pages/api/auth/[...nextauth].js, and add at the same level as providers and your possible callbacks, the value:

secret: process.env.NEXTAUTH_SECRET,
4- Relaunch a build:

Finally, remember to run a new npm run build and you’re all set 🥳 !

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
