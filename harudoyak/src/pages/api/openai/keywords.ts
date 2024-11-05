import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { text } = req.body;

  try {
    const openAiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You will be provided with a block of text, and your task is to extract a list of keywords from it.'
          },
          {
            role: 'user',
            content: text
          }
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
    console.log(openAiResponse.data);

    const keywords = openAiResponse.data.choices[0].message.content
      .trim()
      .split(',')
      .map((tag: string) => tag.trim());

    res.status(200).json({ keywords });
  } catch (error) {
    console.error("Error fetching keywords from OpenAI API:", error);
    res.status(500).json({ error: '태그를 가져오는 데 실패했습니다.' });
  }
}
