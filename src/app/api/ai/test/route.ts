import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { model, config, testInput } = await request.json();
    
    // Validate request
    if (!model || !config) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    if (!config.apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Make API call based on model
    let response;
    try {
      switch (model) {
        case 'anthropic':
          response = await testAnthropicAPI(config.apiKey, testInput);
          break;
        case 'openai':
          response = await testOpenAIAPI(config.apiKey, testInput);
          break;
        default:
          return NextResponse.json(
            { error: `Unsupported model: ${model}` },
            { status: 400 }
          );
      }
    } catch (error) {
      // Pass through API-specific errors
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'API test failed' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('AI test failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Test failed' },
      { status: 500 }
    );
  }
}

async function testAnthropicAPI(apiKey: string, prompt: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `Anthropic API error: ${response.statusText}`);
  }

  if (!data.content?.[0]?.text) {
    throw new Error('Invalid response from Anthropic API');
  }

  return data.content[0].text;
}

async function testOpenAIAPI(apiKey: string, prompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI API error: ${response.statusText}`);
  }

  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid response from OpenAI API');
  }

  return data.choices[0].message.content;
}