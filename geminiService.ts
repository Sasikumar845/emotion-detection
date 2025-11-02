
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      emotion: {
        type: Type.STRING,
        description: 'The name of the emotion.',
      },
      score: {
        type: Type.NUMBER,
        description: 'The confidence score for this emotion, from 0.0 to 1.0.',
      },
    },
    required: ['emotion', 'score'],
  },
};

const emotionsToDetect = ["Joy", "Sadness", "Anger", "Fear", "Surprise", "Disgust", "Neutral"];

export const detectEmotion = async (text: string): Promise<EmotionResult[]> => {
  try {
    const prompt = `
      Analyze the following text for emotions and provide a confidence score from 0 to 1 for each of the following emotions: ${emotionsToDetect.join(", ")}. 
      The scores should represent the emotional composition of the text. Ensure your response is a valid JSON array of objects, with each object containing 'emotion' and 'score' keys.
      
      Text to analyze: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText) as EmotionResult[];
    
    // Sort results by score in descending order
    return parsedResult.sort((a, b) => b.score - a.score);

  } catch (error) {
    console.error("Error detecting emotion:", error);
    throw new Error("Failed to analyze emotion. The model may be unavailable or the request could not be processed.");
  }
};
