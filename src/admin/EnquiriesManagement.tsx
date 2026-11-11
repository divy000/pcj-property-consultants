
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
}

const enquiryStatuses = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
];

export const EnquiriesManagement: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('property_inquiries')
      .select('id, name, email, phone, message, status, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setEnquiries([]);
    } else {
      setEnquiries(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusChange = async (
    enquiryId: string,
    newStatus: string
  ) => {
    setError('');
    setSuccessMessage('');
    setSavingId(enquiryId);

    const { error: updateError } = await supabase
      .from('property_inquiries')
      .update({ status: newStatus })
      .eq('id', enquiryId);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccessMessage('Enquiry status updated successfully!');

      setEnquiries((previous) =>
        previous.map((enquiry) =>
          enquiry.id === enquiryId
            ? { ...enquiry, status: newStatus }
            : enquiry
        )
      );
    }

    setSavingId(null);
  };

  const getStatusLabel = (status: string | null) => {
    const matchingStatus = enquiryStatuses.find(
      (item) => item.value === status
    );

    return matchingStatus?.label || status || 'New';
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-amber-700 font-medium">
            PCJ PROPERTY CONSULTANTS
          </p>

          <h1 className="text-3xl font-bold text-stone-900 mt-2">
            Customer Enquiries
          </h1>

          <p className="text-stone-500 mt-2">
            View and manage enquiries received from your website visitors.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="bg-stone-900 text-white px-5 py-3 rounded-lg hover:bg-stone-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Enquiries'}
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          Unable to process enquiry: {error}
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-stone-200">
          <h2 className="font-semibold text-stone-900">
            All Customer Enquiries
          </h2>

          <p className="text-sm text-stone-500 mt-1">
            {enquiries.length} enquiries received
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-stone-500">
            Loading enquiries...
          </div>
        ) : error && enquiries.length === 0 ? (
          <div className="p-8 text-center text-red-600">
            Unable to load enquiries.
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            No customer enquiries have been received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-stone-50 text-stone-600">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Message</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-stone-50">

                    <td className="px-5 py-4 font-medium text-stone-900">
                      {enquiry.name}
                    </td>

                    <td className="px-5 py-4 text-stone-600">
                      <p>{enquiry.email}</p>
                      <p className="text-xs mt-1">
                        {enquiry.phone || 'No phone provided'}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-stone-600 max-w-xs">
                      {enquiry.message || 'No message provided'}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={enquiry.status || 'new'}
                        disabled={savingId === enquiry.id}
                        onChange={(e) =>
                          handleStatusChange(enquiry.id, e.target.value)
                        }
                        className="border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-600 disabled:opacity-50"
                      >
                        {!enquiryStatuses.some(
                          (item) => item.value === enquiry.status
                        ) && enquiry.status && (
                          <option value={enquiry.status}>
                            {getStatusLabel(enquiry.status)}
                          </option>
                        )}

                        {enquiryStatuses.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>

                      {savingId === enquiry.id && (
                        <p className="text-xs text-stone-500 mt-1">
                          Saving...
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-stone-600 whitespace-nowrap">
                      {new Date(enquiry.created_at).toLocaleDateString('en-IN')}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
};

export default EnquiriesManagement;
