import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

// Function to convert an object to URL-encoded form data
function toFormData(obj: any) {
  const formBody = [];
  for (const property in obj) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(obj[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? '',
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith',
          value: 'administrator',
        },
        password: { label: 'Password', type: 'password', value: 'admin' },
      },

      async authorize(credentials, req) {
        // send test auth object
        // const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        // return user;
        // Include hidden values here
        const data = {
          username: credentials?.username,
          password: credentials?.password,
        };
        const formData = toFormData(data);
        try {
          const res = await fetch('http://localhost:3000/api/test', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          const resData = await res.json();
          if (res.ok && resData && resData.data) {
            return resData.data;
          } else {
            console.error('(Not catch) Authorization failed:', resData);
            return null;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
