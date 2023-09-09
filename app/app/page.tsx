import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import { getLeads } from '../../utils/helpers';

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
                    <p className="text-xl font-semibold text-white break-words">
                      {lead.jobOffer.title}
                    </p>
                    <p className="text-lg font-semibold text-gray-400">
                      {lead.jobOffer.Company.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <p className="text-xl font-semibold text-white">
                      {lead.hiringManager.firstName}{' '}
                      {lead.hiringManager.lastName}
                    </p>
                    <p className="text-lg font-semibold text-gray-400">
                      {lead.hiringManager.jobTitle}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4">
                  <a
                    href={`mailto:${lead.hiringManager.email}`}
                    className="flex-1 block text-base font-medium text-white text-center cursor-pointer p-2 bg-gray-600 rounded-md"
                    target="_blank"
                  >
                    {lead.hiringManager.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
