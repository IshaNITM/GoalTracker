const axios = require('axios');

exports.generateBurnoutPrompts = async (req, res) => {
  const { goal } = req.body;

  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate 3 burnout prevention tips for someone working towards: ${goal}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const prompts = response.data.choices[0].message.content.split('\n').filter(Boolean);
    res.status(200).json({ prompts });
  } catch (error) {
    console.error('Error generating burnout prompts:', error);
    res.status(500).json({ error: 'Failed to generate burnout prompts' });
  }
};