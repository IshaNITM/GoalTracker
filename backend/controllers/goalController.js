const axios = require('axios');

exports.submitGoal = async (req, res) => {
  const { goal } = req.body;

  try {
    // Generate dynamic milestones using OpenRouter
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo", // Use any model supported by OpenRouter
        messages: [
          {
            role: "user",
            content: `Break down the goal "${goal}" into achievable milestones for 2 years. Provide milestones for the first 3 months, 6 months, and 1 year.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Use your OpenRouter API key
          "Content-Type": "application/json",
        },
      }
    );

    const milestones = response.data.choices[0].message.content.split('\n').filter(Boolean); // Convert response to array
    res.status(200).json({ milestones });
  } catch (error) {
    console.error('Error generating milestones:', error);
    res.status(500).json({ error: 'Failed to generate milestones' });
  }
};