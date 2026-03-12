import { GoogleGenAI } from "@google/genai";
import { TarotCard } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getDailyTarotInterpretation(card: TarotCard, isReversed: boolean) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一位专业的塔罗占卜师。用户今天抽到了“${card.name}” (${card.nameEn})，牌位是${isReversed ? '逆位' : '正位'}。
      
      请提供以下内容的简短解读（中文）：
      1. 今日运势概览（一句话）
      2. 建议与启示
      3. 幸运提示（颜色或数字）
      
      请保持神秘、优雅且充满智慧的语气。`,
    });

    return response.text;
  } catch (error) {
    console.error("Error getting interpretation:", error);
    return "星象暂时模糊，请稍后再试。但请记住，命运掌握在你自己手中。";
  }
}
