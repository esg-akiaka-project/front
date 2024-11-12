// src/pages/api/openai/keywords.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { openAiApi } from '../../../apis/openAIApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { text } = req.body;

  try {
    const prompt = '직장인 사용자가 하루의 일기를 담은 텍스트를 제공합니다. 텍스트를 분석하여 중요한 의미를 가진 핵심 명사를 3개에서 최대 8개까지 추출하세요. 핵심 단어만 간단하게 나열하고, 추가 설명은 하지 마세요.';
    const keywordsResponse = await openAiApi(prompt, text);
    const keywords = keywordsResponse.split(',').map((keyword: string) => keyword.trim());

    res.status(200).json({ keywords });
  } catch (error) {
    res.status(500).json({ error: '태그를 가져오는 데 실패했습니다.' });
  }
}



