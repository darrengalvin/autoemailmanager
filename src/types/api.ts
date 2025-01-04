export interface GraphEmailResponse {
  value: Array<{
    id: string;
    subject: string;
    from: {
      emailAddress: {
        address: string;
      };
    };
    toRecipients: Array<{
      emailAddress: {
        address: string;
      };
    }>;
    body: {
      content: string;
    };
    receivedDateTime: string;
  }>;
}

export interface ApiError {
  code: string;
  message: string;
}