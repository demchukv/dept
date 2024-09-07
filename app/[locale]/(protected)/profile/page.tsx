import { Metadata } from 'next';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Profile } from '@/app/components/profile/profile';

export const metadata: Metadata = {
  title: 'Dept | Аккаунт',
  description:
    'Dept - Персональна інформація про аккаунт, зміна налаштувань, видалення аккаунта',
};

const i18nNamespaces = ['profile'];

const ProfilePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Profile />
    </TranslationsProvider>
  );
};

export default ProfilePage;
