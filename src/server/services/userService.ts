export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if (username !== process.env.USERNAME && password !== process.env.PASSWORD) {
    return null;
  }

  const user = {
    id: '9001',
    name: 'Admin',
    email: 'admin@example.com',
  };

  return user;
}
