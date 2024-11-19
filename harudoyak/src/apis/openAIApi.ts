import axios from 'axios';

// openAI API 공통
export const openAiApi = async (prompt: string, userContent: string) => {
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
        max_tokens: 130,
        top_p: 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
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

// 태그 생성 함수
export const createTags = async (text: string) => {
  try {
    const prompt = '직장인 사용자가 하루의 일기를 담은 텍스트를 제공합니다. 텍스트를 분석하여 중요한 의미를 가진 핵심 명사를 3개에서 최대 8개까지 추출하세요. 핵심 단어만 간단하게 나열하고, 추가 설명은 하지 마세요.';
    const keywordsResponse = await openAiApi(prompt, text);
    const keywords = keywordsResponse.split(',').map((keyword: string) => keyword.trim());
    console.log("키워드 가져오기 성공!", keywords);
    return keywords;
  } catch (error) {
    console.error({ error: 'openAI 태그를 가져오는 데 실패했습니다.' });
  }
}

// 편지 생성 함수
export const createLetter = async (text: string) => {
  try {
    const prompt = '사회초년생 직장인 사용자의 오늘의 감정과 하루의 업무 일지를 담은 텍스트를 쉼표로 구분하여 제공합니다. 해당 일지를 분석하여 사용자가 앞으로 더 성장할 수 있도록 조언을 간단하고 친근한 어투로, 150자 이내로 제시하세요. 사용자의 기분이 긍정적이면 성장을 위한 현실적인 조언을, 사용자의 기분이 부정적이라면 지지와 응원 위주의 조언을 해주세요. 입력된 감정에 대한 직접적인 언급은 삼가해 주세요. 150자 이내로 응답해 주세요.';
    const letterResponse = await openAiApi(prompt, text);
    console.log("편지 생성 성공:", letterResponse);
    return letterResponse;
  } catch (error) {
    console.error("openAI 편지를 가져오는 데 실패했습니다.", error);
  }
}
