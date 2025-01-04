import { createClient } from '@/utils/supabase/client';

interface AIFeedback {
  emailId: string;
  suggestionId: string;
  rating: number;
  helpful: boolean;
  comment?: string;
}

export async function submitAIFeedback(feedback: AIFeedback) {
  const supabase = createClient();
  
  if (!supabase) {
    throw new Error('Could not initialize Supabase client');
  }

  // Store feedback in Supabase
  const { error: feedbackError } = await supabase
    .from('ai_feedback')
    .insert([{
      ...feedback,
      created_at: new Date().toISOString()
    }]);

  if (feedbackError) throw feedbackError;

  // If there's a comment, create an embedding for training
  if (feedback.comment) {
    const { error: embeddingError } = await supabase
      .from('embeddings')
      .insert([{
        content: feedback.comment,
        metadata: {
          type: 'feedback',
          emailId: feedback.emailId,
          suggestionId: feedback.suggestionId,
          rating: feedback.rating,
          helpful: feedback.helpful
        }
      }]);

    if (embeddingError) throw embeddingError;
  }
}

export async function getFeedbackStats(emailId: string) {
  const supabase = createClient();
  
  if (!supabase) {
    throw new Error('Could not initialize Supabase client');
  }

  const { data, error } = await supabase
    .from('ai_feedback')
    .select('rating, helpful')
    .eq('email_id', emailId) as { data: { rating: number; helpful: boolean }[]; error: any };

  if (error) throw error;

  return {
    averageRating: data.reduce((acc, curr) => acc + curr.rating, 0) / data.length,
    helpfulCount: data.filter(f => f.helpful).length,
    totalCount: data.length
  };
}