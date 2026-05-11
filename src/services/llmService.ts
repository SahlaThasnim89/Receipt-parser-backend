import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import 'dotenv/config';
console.log(process.env.GEMINI_API_KEY,'op')

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
  model: 'googleai/gemini-2.0-flash-lite',
});

const ReceiptSchema = z.object({
  merchant: z.string(),
  date: z.string(), // ISO format
  total: z.number(),
  items: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
    })
  ),
});


export const parseReceiptWithLLM = async (fileBuffer: Buffer, mimeType: string)=>{
    console.log("Calling LLM with buffer length:", fileBuffer.length);
    try {
        const base64Data = fileBuffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64Data}`;

        const { output } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-lite',
            prompt: [
            { text: 'Extract data from this receipt image.' },
            { media: { url: dataUri, contentType: mimeType } },
            ],
            output: { schema: ReceiptSchema },
        });

        console.log(output,"opol")
        return output;
    }catch (err) {
        console.error("AI Generate crashed:", err);
        throw err; 
    }
}