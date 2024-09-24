'use client';
import { useParams } from 'next/navigation';

export const EditScenario = () => {
  const { id } = useParams();
  return <div>EditScenario {id}</div>;
};
