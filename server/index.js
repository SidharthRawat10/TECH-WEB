import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Google Gen AI client
const apiKey = process.env.GEMINI_API_KEY || process.env.GeminiAPIKey;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const systemInstruction = `
You are a highly objective tech recommendation agent. Your goal is to research products based on the user's query and provide a 100% genuine, unbiased recommendation.

STRICT RULES:
1. Ignore fake affiliate blogs, paid reviews, and commercial SEO listicles.
2. Ignore any reviews, articles, or videos containing brand promotion, sponsored segments, or paid partnerships.
3. Prioritize organic discussions (Reddit comments, tech forums, developer communities, and independent consumer reviews).
4. Identify the top 2-3 recommended products within the user's specified budget range.
5. Provide a summary explaining why they are recommended based on community consensus, detailing the pros/cons of each.
6. Provide the Amazon India ASIN (10-character code starting with B) for each product if you can identify it with high certainty. If not, set the ASIN field to null.

You MUST respond in JSON format matching this schema:
{
  "summary": "High-level summary of the research consensus and recommendation rationale...",
  "products": [
    {
      "name": "Exact Product Name",
      "description": "Short consensus-based description...",
      "asin": "B0XXXXXXXX or null",
      "specs": "Key specifications...",
      "whySuggested": "Why this is recommended by the community...",
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"]
    }
  ]
}
`;

app.post('/api/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!ai) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY is not configured on the server. Please set the GEMINI_API_KEY environment variable.' 
    });
  }

  try {
    console.log(`Researching query: "${query}"...`);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Please research and recommend: "${query}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      }
    });

    const rawJsonText = response.text;
    console.log("AI Response received:", rawJsonText);

    // Parse the JSON returned by Gemini
    const data = JSON.parse(rawJsonText);
    
    // Auto-generate affiliate links for the recommended products
    const affiliateTag = "sidharth0d4-21";
    if (data.products && Array.isArray(data.products)) {
      data.products = data.products.map(product => {
        let link = "";
        // Clean ASIN
        const cleanAsin = product.asin && typeof product.asin === 'string' 
          ? product.asin.trim().toUpperCase() 
          : null;
          
        if (cleanAsin && cleanAsin.match(/^[A-Z0-9]{10}$/)) {
          link = `https://www.amazon.in/dp/${cleanAsin}/?tag=${affiliateTag}`;
        } else {
          link = `https://www.amazon.in/s?k=${encodeURIComponent(product.name)}&tag=${affiliateTag}`;
        }
        
        return {
          ...product,
          asin: cleanAsin,
          affiliateLink: link
        };
      });
    }

    res.json(data);
  } catch (error) {
    console.error('Error during AI search:', error);
    res.status(500).json({ error: 'An error occurred while researching the product. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
