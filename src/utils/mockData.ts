export const budgetReviewThread = {
  id: '1',
  subject: 'Urgent: Q4 Budget Review Meeting',
  messages: [
    {
      id: 'msg1',
      from: 'sarah.finance@company.com',
      to: ['team@company.com'],
      subject: 'Urgent: Q4 Budget Review Meeting',
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
      timestamp: new Date('2024-01-04T09:00:00'),
      status: 'sent',
      attachments: [
        { id: '1', name: 'Q4_Budget_Review.xlsx', size: 2048576 },
        { id: '2', name: 'Financial_Summary.pdf', size: 1048576 }
      ]
    },
    {
      id: 'msg2',
      from: 'john.manager@company.com',
      to: ['sarah.finance@company.com', 'team@company.com'],
      subject: 'Re: Urgent: Q4 Budget Review Meeting',
      body: `Thanks for flagging this, Sarah.

I can make myself available tomorrow at 2 PM EST. The cost increases are indeed concerning, and I've already started gathering some data on the main contributors.

I'll prepare a brief overview of the operational impacts for the meeting.

Best,
John`,
      timestamp: new Date('2024-01-04T09:45:00'),
      status: 'sent'
    }
  ]
};

export const mockEmails = [
  {
    id: '1',
    subject: 'Urgent: Q4 Budget Review Meeting',
    from: 'sarah.finance@company.com',
    to: ['user@example.com'],
    body: budgetReviewThread.messages[0].body,
    attachments: budgetReviewThread.messages[0].attachments,
    timestamp: new Date(),
    status: 'ai_pending',
    aiMetadata: {
      sentiment: 'negative',
      priority: 'high',
      category: 'finance'
    },
    aiSuggestion: {
      id: 'sugg1',
      body: `Dear Sarah,

Thank you for raising these concerns about the Q4 budget. I understand the urgency and can make myself available tomorrow at 2 PM for the review meeting.

I've already reviewed the preliminary numbers and agree that we need to address these trends promptly. I'll prepare some initial mitigation proposals for discussion.

Would tomorrow at 2 PM work for you?

Best regards,
[Your name]`,
      confidence: 0.92,
      reasoning: 'Response prioritizes urgency while maintaining professional tone'
    }
  }
];