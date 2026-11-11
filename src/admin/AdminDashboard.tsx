
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DashboardStats {
  properties: number;
  projects: number;
  enquiries: number;
  locations: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    properties: 0,
    projects: 0,
    enquiries: 0,
    locations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError('');

        const [
          propertiesResult,
          projectsResult,
          enquiriesResult,
          locationsResult,
        ] = await Promise.all([
          supabase
            .from('properties')
            .select('*', { count: 'exact', head: true }),

          supabase
            .from('projects')
            .select('*', { count: 'exact', head: true }),

          supabase
            .from('property_inquiries')
            .select('*', { count: 'exact', head: true }),

          supabase
            .from('locations')
            .select('*', { count: 'exact', head: true }),
        ]);

        const results = [
          propertiesResult,
          projectsResult,
          enquiriesResult,
          locationsResult,
        ];

        const failedResult = results.find((result) => result.error);

        if (failedResult?.error) {
          throw failedResult.error;
        }

        setStats({
          properties: propertiesResult.count ?? 0,
          projects: projectsResult.count ?? 0,
          enquiries: enquiriesResult.count ?? 0,
          locations: locationsResult.count ?? 0,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load dashboard statistics.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.properties,
      description: 'Property listings',
    },
    {
      title: 'Total Projects',
      value: stats.projects,
      description: 'Development projects',
    },
    {
      title: 'Customer Enquiries',
      value: stats.enquiries,
      description: 'Received enquiries',
    },
    {
      title: 'Locations',
      value: stats.locations,
      description: 'Listed locations',
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <p className="text-sm text-amber-700 font-medium">
          PCJ PROPERTY CONSULTANTS
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mt-2">
          Admin Dashboard
        </h1>

        <p className="text-stone-500 mt-2">
          Welcome to your property management control centre.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm border border-stone-200 p-6"
          >
            <p className="text-sm text-stone-500">
              {card.title}
            </p>

            <p className="text-3xl font-bold text-stone-900 mt-3">
              {loading ? '...' : card.value}
            </p>

            <p className="text-xs text-stone-400 mt-2">
              {card.description}
            </p>
          </div>
        ))}

      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <h2 className="text-xl font-semibold text-stone-900">
          Welcome to PCJ Admin
        </h2>

        <p className="text-stone-600 mt-3 leading-7">
          Manage your property listings, development projects,
          locations and customer enquiries from one place.
          Changes made here will be reflected on your public
          website according to their publication status.
        </p>
      </div>

    </div>
  );
};

export default AdminDashboard;
