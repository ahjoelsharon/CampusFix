import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { ArrowLeft, Save } from 'lucide-react';
import clsx from 'clsx';

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    admin_remarks: ''
  });

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select(`*, profiles(full_name, email)`)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      setComplaint(data);
      setFormData({
        status: data.status,
        priority: data.priority,
        admin_remarks: data.admin_remarks || ''
      });
    } catch (error) {
      console.error('Error fetching complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('complaints')
        .update({
          status: formData.status,
          priority: formData.priority,
          admin_remarks: formData.admin_remarks
        })
        .eq('id', id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Complaint updated successfully!' });
      
      // Update local state to reflect changes without reload
      setComplaint({
        ...complaint,
        status: formData.status,
        priority: formData.priority,
        admin_remarks: formData.admin_remarks,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating complaint:', error);
      setMessage({ type: 'error', text: 'Failed to update complaint.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!complaint) return <div>Complaint not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/admin/complaints" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Complaints
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Details */}
        <div className="lg:w-2/3 bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Complaint {complaint.complaint_number || 'Pending'}
            </h2>
          </div>
          
          <div className="px-6 py-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{complaint.title}</dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{complaint.description}</dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">{complaint.category}</dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{complaint.location}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm text-gray-900">{format(new Date(complaint.created_at), 'PPP pp')}</dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900">{format(new Date(complaint.updated_at), 'PPP pp')}</dd>
              </div>
            </dl>
          </div>

          <div className="px-6 py-5 border-t border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{complaint.profiles?.full_name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{complaint.profiles?.email}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column - Management */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Complaint</h3>
            
            {message && (
              <div className={clsx("p-3 rounded-md mb-4 text-sm", message.type === 'success' ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800")}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="SUBMITTED">Submitted</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Admin Remarks</label>
                <textarea
                  name="admin_remarks"
                  rows={4}
                  value={formData.admin_remarks}
                  onChange={handleChange}
                  placeholder="Add notes for the student to see..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Updating...' : 'Update Complaint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
