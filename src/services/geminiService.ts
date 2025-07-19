import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface CompressionResult {
  elevator_pitch: string;
  tagline: string;
  casual_version: string;
}

export async function generatePitchCompressions(pitch: string): Promise<CompressionResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a brutal clarity operator.

You take messy product pitches or ideas and compress them into:
- A sharp 1-sentence elevator pitch
- A 5-word tagline/slogan
- A casual, conversational version they could say at a bar

Tone: clear, smart, confident.  
Cut fluff. Make it land.

Input: "${pitch}"

Output JSON:
{
  "elevator_pitch": "...",
  "tagline": "...",
  "casual_version": "..."
}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const jsonResponse = JSON.parse(jsonMatch[0]);
      
      if (!jsonResponse.elevator_pitch || !jsonResponse.tagline || !jsonResponse.casual_version) {
        throw new Error('Missing required fields in JSON response');
      }
      
      return {
        elevator_pitch: jsonResponse.elevator_pitch.replace(/^["']|["']$/g, ''),
        tagline: jsonResponse.tagline.replace(/^["']|["']$/g, ''),
        casual_version: jsonResponse.casual_version.replace(/^["']|["']$/g, ''),
      };
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error generating pitch compressions:', error);
    throw new Error('Failed to generate pitch compressions');
  }
}