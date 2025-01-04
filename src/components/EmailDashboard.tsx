import React from 'react';
import { Mail, Star, AlertCircle } from 'lucide-react';
import { useEmailStore } from '../store/emailStore';

export default function EmailDashboard() {
  const { emails } = useEmailStore();
  
  // Dummy data for visualization
  const dummyEmails = [
    {
      id: '1',
      subject: 'Project Update Meeting',
      from: 'john.doe@company.com',
      preview: 'Hi team, Following up on our discussion...',
      timestamp: new Date(),
      status: 'pending'
    },
    {
      id: '2',
      subject: 'Client Proposal Review',
      from: 'sarah.smith@client.com',
      preview: 'Please find attached the latest proposal...',
      timestamp: new Date(),
      status: 'draft'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
        <div className="flex gap-4">
          <button className="btn-primary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Compose
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {dummyEmails.map((email) => (
          <div
            key={email.id}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
          >
            {email.status === 'pending' ? (
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            ) : (
              <Star className="w-5 h-5 text-gray-400" />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium text-gray-800">{email.subject}</h3>
                <span className="text-sm text-gray-500">
                  {email.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{email.from}</span>
                <span className="text-sm text-gray-500">{email.preview}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}