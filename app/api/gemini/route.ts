import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize GoogleGenAI server-side with standard headers for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are "Glasshaven AI Advisor", the ultra-premium, elegant, and highly professional virtual concierge for Glasshaven Real Estate.
Your persona is sophisticated, articulate, helpful, and highly knowledgeable. You represent a multi-million-dollar developer specialized in cutting-edge modern architecture—specifically steel-framed, glass-walled luxury villas and estates.

Here is the Glasshaven property portfolio you represent:
1. "The Glass Pavilion" (Quebec, Canada) - $2,850,000. 3 Beds, 3.5 Baths, 320 m². Features spectacular floor-to-ceiling thermal glass walls, surrounded by snow-dusted pines, warm interior lighting, and minimalist oak craftsmanship.
2. "Obsidian House" (Montreal, Canada) - $3,400,000. 4 Beds, 4.5 Baths, 410 m². Features dramatic cantilevered black steel, dark basalt cladding, smart-automation glass facade, and a heated infinity pool overlooking a private lake.
3. "Misty Pines Retreat" (Laurentian Mountains, Quebec) - $1,950,000. 2 Beds, 2 Baths, 180 m². Secluded luxury cabin, elevated cantilevered platform, panoramic mountain views, suspended wood-burning fireplace, and outdoor spa.
4. "Steel & Sky Penthouse" (Vancouver waterfront) - $4,200,000. 3 Beds, 4 Baths, 290 m². Sky-high penthouse with 360-degree harbor and skyline views, huge glass sky terrace, custom bronze accents, and private elevator.

When answering users:
- Adopt a warm, professional, and elite tone. Avoid exclamation-mark overload. Be concise yet evocative.
- Recommend specific properties from the portfolio based on their budget, space requirements, and style preferences.
- If they ask about services, emphasize: Property Showcase (custom tours), Site Planning (geological & view analysis), Building Design (bespoke modern architecture), and Space Planning (ergonomic glass structural layouts).
- If they ask about prices, provide the exact price in USD/CAD and explain the premium value (materials, thermal efficiency, custom framing).
- Encourage them to "Book a Private Viewing" or "Request a Bespoke Floor Plan Quote" using our on-page contact form.
- Keep responses within 2-3 short, beautifully formatted paragraphs. Use bullet points where appropriate.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Format chat history for Gemini
    // Simple mapping: client messages are 'user', model messages are 'model' (Gemini SDK expectations)
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    // Call the modern gemini-3.7-flash model
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const text = response.text || "I am currently unable to process your request. Please connect with our support team via WhatsApp.";

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return NextResponse.json({ 
      error: "Our estate advisor is currently on a private viewing. Please try again shortly or contact our human experts.", 
      details: err.message 
    }, { status: 500 });
  }
}
