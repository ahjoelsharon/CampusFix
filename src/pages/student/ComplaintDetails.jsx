import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';

const STATUS_FLOW = ['SUBMITTED', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED'];

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setComplaint(data);
    } catch (error) {
      console.error('Error fetching complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!complaint) return <div>Complaint not found.</div>;

  const getStatusIndex = (status) => STATUS_FLOW.indexOf(status);
  const currentStatusIndex = complaint.status === 'REJECTED' ? -1 : getStatusIndex(complaint.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/student/complaints" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Complaints
      </Link>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Complaint {complaint.complaint_number || 'Pending'}
            </h2>
            <span className={clsx(
              "px-3 py-1 text-sm font-semibold rounded-full",
              complaint.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 
              complaint.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-800' : 
              complaint.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
            )}>
              {complaint.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Tracker */}
        {complaint.status !== 'REJECTED' && (
          <div className="px-6 py-8 border-b border-gray-200 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <nav aria-label="Progress">
                <ol role="list" className="flex items-center">
                  {STATUS_FLOW.map((status, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    
                    return (
                      <li key={status} className={clsx("relative pr-8 sm:pr-20", index === STATUS_FLOW.length - 1 ? "" : "w-full")}>
                        {/* Line connector */}
                        {index !== STATUS_FLOW.length - 1 && (
                          <div className="absolute top-4 left-0 -ml-px mt-0.5 w-full h-0.5 bg-gray-300" aria-hidden="true"
                               style={{ backgroundColor: isCompleted ? '#3b82f6' : '#d1d5db' }} />
                        )}
                        
                        <div className="relative flex flex-col items-center group">
                          <span className={clsx(
                            "h-9 w-9 rounded-full flex items-center justify-center border-2 bg-white",
                            isCompleted ? "border-blue-600" : isCurrent ? "border-blue-600" : "border-gray-300"
                          )}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-blue-600" />
                            ) : isCurrent ? (
                              <div className="w-3 h-3 bg-blue-600 rounded-full" />
                            ) : (
                              <div className="w-3 h-3 bg-gray-300 rounded-full" />
                            )}
                          </span>
                          <span className={clsx(
                            "mt-2 text-xs font-medium uppercase absolute -bottom-6 w-max text-center",
                            isCompleted || isCurrent ? "text-blue-600" : "text-gray-500"
                          )}>
                            {status.replace('_', ' ')}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        )}

        <div className="px-6 py-6 sm:p-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
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
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1 text-sm text-gray-900">{complaint.priority}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900">{format(new Date(complaint.created_at), 'PPP pp')}</dd>
            </div>

            <div className="sm:col-span-2 bg-gray-50 p-4 rounded-md">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Clock className="mr-2 h-4 w-4" /> Admin Remarks
              </dt>
              <dd className="mt-2 text-sm text-gray-900 italic">
                {complaint.admin_remarks || 'No remarks yet.'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
