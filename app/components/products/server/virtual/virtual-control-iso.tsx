'use client';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { startTransition } from 'react';
import { ServerType } from '@/types/server';
const imagesList = [
  { key: 1, value: 'Власний ISO' },
  { key: 2, value: 'Debian 11' },
];
interface VirtualControlISOProps {
  data: ServerType;
}
export const VirtualControlISO = ({ data }: VirtualControlISOProps) => {
  return <div>VirtualControlISO</div>;
};
