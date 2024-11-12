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
    const prompt = '사회초년생 직장인 사용자의 오늘의 감정과 하루의 일기를 담은 텍스트를 쉼표로 구분하여 제공합니다. 해당 일기를 분석하여 사용자가 하루를 더 긍정적으로 보낼 수 있는 조언을 간단하게 제시하세요. 사용자의 기분이 긍정적이면 성장을 위한 현실적인 조언을, 사용자의 기분이 부정적이라면 지지와 응원 위주의 조언을 해주세요.';
    const advice = await openAiApi(prompt, text);

    res.status(200).json({ advice });
  } catch (error) {
    res.status(500).json({ error: '조언을 가져오는 데 실패했습니다.' });
  }
}
