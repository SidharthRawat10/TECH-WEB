import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY is not configured on Vercel. Please add GEMINI_API_KEY to your Vercel Environment Variables.' 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Please research and recommend: "${query}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      }
    });

    const data = JSON.parse(response.text);
    
    // Auto-generate affiliate links
    const affiliateTag = "sidharth0d4-21";
    if (data.products && Array.isArray(data.products)) {
      data.products = data.products.map(product => {
        let link = "";
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

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error during AI search:', error);
    return res.status(500).json({ error: 'An error occurred while researching the product. Please try again.' });
  }
}
