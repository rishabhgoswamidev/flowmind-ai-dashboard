export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          message: "Gemini API key not found",
        },
        {
          status: 500,
        },
      );
    }

    const systemPrompt = `
You are FlowMind AI, an AI startup mentor and learning assistant.

Rules:
- Be concise and practical.
- Use headings.
- Use bullet points whenever possible.
- Avoid long paragraphs.
- Give examples when helpful.
- Explain step-by-step.
- If teaching code, explain the thinking process.
- Focus on actionable advice.
- Use markdown formatting.
- Never be overly verbose.
`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt} User Question: ${message}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const geminiData = await geminiResponse.json();

    console.log("Gemini Response:", geminiData);

    const aiText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";
    console.log(aiText);
    return Response.json({
      message: aiText,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return Response.json(
      {
        message: "Something went wrong while generating a response.",
      },
      {
        status: 500,
      },
    );
  }
}
