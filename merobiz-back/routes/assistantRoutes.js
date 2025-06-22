import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.get('/test', (req, res) => {
  res.json({ message: '🟢 Assistant test route working' });
});

router.post('/chat', async (req, res) => {
  console.log("✅ POST /api/assistant/chat route hit");
  const { messages } = req.body;
  console.log("📥 Incoming messages:", messages);

  try {
    // Extract system message
    const systemMessage = messages.find(m => m.role === 'system')?.content || '';
    
    // Convert to Gemini format
    const history = messages
      .filter(m => m.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    // Generate response
    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: history,
      systemInstruction: {
        parts: [{ text: systemMessage }]
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('❌ Gemini API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

export default router;
