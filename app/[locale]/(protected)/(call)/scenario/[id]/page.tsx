import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { EditScenario } from '@/app/components/call/scenario/edit-scenario';
import Link from 'next/link';
import { Icon } from '@/components/utils/icon';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Телефонія: редагувати сценарій',
  description: 'Dept - Сценарії - редагування існуючого сценарію',
};

const EditScenarioPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="flex gap-3 items-center mb-6 sm:mb-4">
        <Link href="/scenario" className="hover:text-main-color">
          <Icon iconName="ArrowBack" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-2xl leading-none text-main-dark ">
          Телефонія. Сценарії
        </h1>
      </div>
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-3 sm:mb-4">
        Редагувати сценарій
      </h2>
      <EditScenario />
    </TranslationsProvider>
  );
};

export default EditScenarioPage;
