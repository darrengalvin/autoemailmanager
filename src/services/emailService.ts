import { Client } from '@microsoft/microsoft-graph-client';
import { Email } from '../types';

export class EmailService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async fetchEmails(): Promise<Email[]> {
    try {
      console.log('Fetching emails from Microsoft Graph...');
      const response = await this.client
        .api('/me/messages')
        .select('id,subject,bodyPreview,body,from,toRecipients,receivedDateTime,hasAttachments,conversationId')
        .orderby('receivedDateTime desc')
        .top(50)
        .get();

      console.log('Received response from Microsoft Graph');
      return response.value.map(this.mapGraphEmailToEmail);
    } catch (error) {
      console.error('Error in EmailService.fetchEmails:', error);
      throw error;
    }
  }

  private mapGraphEmailToEmail(graphEmail: any): Email {
    try {
      return {
        id: graphEmail.id,
        subject: graphEmail.subject || '(No Subject)',
        from: graphEmail.from?.emailAddress?.address || 'unknown@email.com',
        to: graphEmail.toRecipients?.map((r: any) => r.emailAddress?.address) || [],
        body: graphEmail.body?.content || graphEmail.bodyPreview || '',
        attachments: [], // We'll fetch attachments separately if needed
        timestamp: new Date(graphEmail.receivedDateTime),
        status: 'human_pending',
        metadata: {
          threadId: graphEmail.conversationId,
          labels: [],
          priority: 'normal',
          hasAttachments: graphEmail.hasAttachments || false
        },
        aiMetadata: {
          // We'll process these with AI later
          sentiment: undefined,
          priority: undefined,
          category: undefined
        }
      };
    } catch (error) {
      console.error('Error mapping Graph email:', error, graphEmail);
      // Return a fallback email object
      return {
        id: graphEmail.id || 'unknown',
        subject: 'Error Processing Email',
        from: 'error@emailmanager.app',
        to: [],
        body: 'There was an error processing this email.',
        timestamp: new Date(),
        status: 'human_pending',
        metadata: {
          labels: [],
          priority: 'normal'
        }
      };
    }
  }

  // Add method to fetch attachments if needed
  async fetchAttachments(emailId: string) {
    const response = await this.client
      .api(`/me/messages/${emailId}/attachments`)
      .get();

    return response.value.map((attachment: any) => ({
      id: attachment.id,
      name: attachment.name,
      size: attachment.size,
      type: attachment.contentType,
      url: `data:${attachment.contentType};base64,${attachment.contentBytes}`
    }));
  }
}