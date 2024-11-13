import axios from 'axios';

// openAI API 공통
export async function openAiApi(prompt: string, userContent: string) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in OpenAI API request:", error);
    throw new Error('Failed to fetch response from OpenAI API');
  }
}