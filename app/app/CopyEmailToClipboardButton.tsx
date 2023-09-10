'use client';

import { ClipboardIcon } from '@heroicons/react/24/outline';

type Props = {
  email: string;
};

export default function CopyEmailToClipboardButton({ email }: Props) {
  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      type="button"
      onClick={() => copyEmail(email)}
      className="flex-1 flex flex-row justify-center items-center gap-2 text-base font-medium text-white text-center cursor-pointer p-2 bg-gray-600 rounded-md"
    >
      <span>{email}</span> <ClipboardIcon className="h-6 w-6" />
    </button>
  );
}
