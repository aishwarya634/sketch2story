export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { base64, style } = req.body;

    if (!base64 || !style) {
      return res.status(400).json({
        error: "Missing image or story style",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Look at this sketch carefully. Describe what you see, then write a creative ${style} inspired by it. Make it vivid, imaginative, and around 150-200 words. Format it nicely with a title.`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/png;base64,${base64}`,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return res.status(response.status).json({
        error: data.error?.message || "OpenRouter API error",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Generate error:", error);

    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}