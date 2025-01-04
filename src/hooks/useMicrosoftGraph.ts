'use client';

import { useState, useCallback } from 'react';
import { useEmailStore } from '@/store/emailStore';
import { Email } from '@/types';

export function useMicrosoftGraph() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setEmails } = useEmailStore();

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Detailed sample data for development
      const mockEmails: Email[] = [
        {
          id: '1',
          subject: 'Urgent: Q4 Budget Review Meeting',
          from: 'sarah.finance@company.com',
          to: ['user@example.com'],
          body: `Hi Team,

I hope this email finds you well. We need to schedule an urgent meeting to review the Q4 budget projections. Our preliminary analysis shows some concerning trends that require immediate attention.

Key points for discussion:
- Revenue forecast adjustments
- Unexpected cost increases in Q3
- Impact on year-end targets
- Mitigation strategies

Please let me know your availability for tomorrow or Wednesday.

Best regards,
Sarah`,
          attachments: [
            { id: '1', name: 'Q4_Budget_Review.xlsx', type: 'spreadsheet', size: 2048576, url: '#' },
            { id: '2', name: 'Financial_Summary.pdf', type: 'document', size: 1048576, url: '#' }
          ],
          timestamp: new Date(),
          status: 'ai_pending',
          aiMetadata: {
            sentiment: 'negative',
            priority: 'high',
            category: 'finance',
            suggestedResponse: 'Thank you for bringing this to our attention...'
          },
          aiSuggestion: {
            id: '1',
            body: `Dear Sarah,

Thank you for raising these concerns about the Q4 budget. I understand the urgency and can make myself available tomorrow at 2 PM for the review meeting.

I've already reviewed the preliminary numbers and agree that we need to address these trends promptly. I'll prepare some initial mitigation proposals for discussion.

Would tomorrow at 2 PM work for you?

Best regards,
[Your name]`,
            confidence: 0.92,
            reasoning: 'Response prioritizes urgency while maintaining professional tone'
          }
        },
        {
          id: '2',
          subject: 'New Product Launch Success!',
          from: 'marketing.team@company.com',
          to: ['user@example.com'],
          body: `Hello everyone,

I'm thrilled to share that our latest product launch has exceeded all expectations! The initial numbers are incredibly promising:

• 150% above projected sales
• 92% positive customer feedback
• Featured in 3 major tech publications
• #1 trending in our category

This success is a testament to everyone's hard work and dedication. Special thanks to the development team for delivering such an outstanding product, and to our marketing team for the excellent campaign execution.

Let's schedule a celebration soon!

Cheers,
Marketing Team`,
          attachments: [],
          timestamp: new Date(Date.now() - 3600000),
          status: 'human_pending',
          aiMetadata: {
            sentiment: 'positive',
            priority: 'medium',
            category: 'marketing',
          },
          aiSuggestion: {
            id: '2',
            body: 'Congratulations on the successful launch! This is fantastic news...',
            confidence: 0.88,
            reasoning: 'Positive acknowledgment with specific metrics mentioned'
          }
        },
        {
          id: '3',
          subject: 'Weekly Development Update',
          from: 'dev.lead@company.com',
          to: ['user@example.com'],
          body: `Team,

Here's our weekly development update:

Sprint Progress:
✅ User authentication refactor completed
🏗️ API optimization in progress (75% complete)
📱 Mobile responsive design implementation started
🐛 Fixed 12 high-priority bugs

Upcoming Challenges:
- Database migration scheduled for next week
- Load testing for new features
- Third-party integration updates

Please review the attached technical documentation and provide feedback by Friday.

Regards,
Dev Team`,
          attachments: [
            { id: '3', name: 'TechnicalSpec.pdf', type: 'document', size: 3145728, url: '#' }
          ],
          timestamp: new Date(Date.now() - 7200000),
          status: 'approved',
          aiMetadata: {
            sentiment: 'neutral',
            priority: 'medium',
            category: 'development'
          }
        }
      ];
      
      setEmails(mockEmails);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch emails'));
    } finally {
      setLoading(false);
    }
  }, [setEmails]);

  return { loading, error, fetchEmails };
}