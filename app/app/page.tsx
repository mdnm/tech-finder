import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import { getLeads } from '../../utils/helpers';
import CopyEmailToClipboardButton from './CopyEmailToClipboardButton';

export default async function Account() {
  const [session, leads] = await Promise.all([getSession(), getLeads()]);
  if (!session) {
    return redirect('/signin');
  }

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Hiring Managers
          </h1>
          <div className="flex flex-col mt-8 space-y-4 sm:mx-auto sm:w-full sm:max-w-3xl">
            {leads?.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-lg"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <a
                      target="_blank"
                      href={lead.jobOffer.url}
                      className="text-xl font-semibold text-white break-words underline"
                    >
                      {lead.jobOffer.title}
                    </a>
                    <p className="text-base font-semibold text-gray-400">
                      {lead.jobOffer.Company.name}
                      {lead.jobOffer.timeSincePublished
                        ? ` - ${lead.jobOffer.timeSincePublished}`
                        : ''}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <a
                      target="_blank"
                      href={lead.hiringManager.linkedInUrl}
                      className="text-xl font-semibold text-white underline"
                    >
                      {lead.hiringManager.firstName}{' '}
                      {lead.hiringManager.lastName}
                    </a>
                    <p className="text-base font-semibold text-gray-400">
                      {lead.hiringManager.jobTitle}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4">
                  <CopyEmailToClipboardButton
                    email={lead.hiringManager.email}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
