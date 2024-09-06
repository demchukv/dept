import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Profile } from '@/app/components/profile/profile';

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
