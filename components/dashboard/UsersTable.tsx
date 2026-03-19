'use client';

import Image from 'next/image';
import clsx from 'clsx';

export type Status = 'active' | 'pending' | 'inactive';

export interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  plan: string;
  joined: string;
  status: Status;
}

interface Props {
  users: User[];
}

// ✅ Corrected Tailwind classes for badges
const statusColors: Record<Status, string> = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-gray-50 text-gray-700',
  pending: 'bg-yellow-50 text-yellow-700',
};

const UsersTable = ({ users }: Props) => {
  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-gray-100 p-5 overflow-x-auto">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Latest Signups</h3>

      <table className="w-full min-w-150 table-auto">
        <thead className="bg-gray-50">
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Joined</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              {/* User column */}
              <td className="px-4 py-3 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {user.name}
                </span>
              </td>

              {/* Email */}
              <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>

              {/* Plan */}
              <td className="px-4 py-3 text-sm text-gray-600">{user.plan}</td>

              {/* Joined */}
              <td className="px-4 py-3 text-sm text-gray-600">{user.joined}</td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    statusColors[user.status],
                  )}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
