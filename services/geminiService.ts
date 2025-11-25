import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFood = async (foodQuery: string): Promise<NutritionData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the nutritional content of: ${foodQuery}. Provide estimates for a standard serving size if not specified.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: {
              type: Type.STRING,
              description: "The standardized name of the food item, capitalized."
            },
            servingSize: {
              type: Type.STRING,
              description: "The serving size used for calculation (e.g., '1 medium apple (182g)')."
            },
            calories: {
              type: Type.NUMBER,
              description: "Total calories in kcal."
            },
            protein: {
              type: Type.NUMBER,
              description: "Protein content in grams."
            },
            carbohydrates: {
              type: Type.NUMBER,
              description: "Total carbohydrate content in grams."
            },
            fat: {
              type: Type.NUMBER,
              description: "Total fat content in grams."
            },
            fiber: {
              type: Type.NUMBER,
              description: "Dietary fiber content in grams."
            },
            sugar: {
              type: Type.NUMBER,
              description: "Total sugar content in grams."
            },
            briefSummary: {
              type: Type.STRING,
              description: "A 1-2 sentence interesting fact or health benefit about this food."
            }
          },
          required: ["foodName", "servingSize", "calories", "protein", "carbohydrates", "fat", "fiber", "sugar", "briefSummary"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data returned from Gemini.");
    }
    return JSON.parse(text) as NutritionData;
  } catch (error) {
    console.error("Error analyzing food:", error);
    throw error;
  }
};
