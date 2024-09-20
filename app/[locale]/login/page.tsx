'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/public/logo-blue.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const { status } = useSession();
  const router = useRouter();
  const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      if (res?.error) {
        console.log('res error :::: ', res);
        setErrorMessage(res.error);
        setPending(false);
      } else {
        setPending(false);
        // Handle successful login here (e.g., redirect or store user data)
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login');
      setPending(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex items-center justify-center py-12 bg-secondary-600">
        <div className="mx-auto grid max-w-6xl gap-12">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Вхід в особистий кабінет</h1>
            <p className="text-balance text-muted-foreground">
              Введіть ваші логін і пароль для входу
            </p>
          </div>
          <form onSubmit={formSubmitted} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Логін</Label>
              <Input
                id="username"
                type="text"
                placeholder="Логін"
                required
                className="bg-secondary-100 border-secondary-900"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="bg-secondary-100 border-secondary-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <LoginButton pending={pending} />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className=" bg-primary-600 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <p>
            <Image src={Logo} width={76} height={44} alt="dept logo" />
          </p>
          <Link
            href="https://dept.ua"
            className="mt-4 text-muted-foreground underline"
          >
            Перейти на сайт
          </Link>
        </div>
      </div>
    </div>
  );
};

function LoginButton({ pending }: { pending: boolean }) {
  return (
    <Button className="mt-4 w-full " aria-disabled={pending}>
      Ввійти
    </Button>
  );
}

export default Login;
