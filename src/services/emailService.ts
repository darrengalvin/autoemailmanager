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
    const response = await this.client
      .api('/me/messages')
      .select('subject,from,body,receivedDateTime')
      .top(50)
      .get();

    return response.value.map(this.mapGraphEmailToEmail);
  }

  private mapGraphEmailToEmail(graphEmail: any): Email {
    return {
      id: graphEmail.id,
      subject: graphEmail.subject,
      from: graphEmail.from.emailAddress.address,
      to: [graphEmail.toRecipients.map((r: any) => r.emailAddress.address)],
      body: graphEmail.body.content,
      attachments: [],
      timestamp: new Date(graphEmail.receivedDateTime),
      status: 'human_pending'
    };
  }
}