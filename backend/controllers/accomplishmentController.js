const axios = require('axios');

exports.generateAccomplishments = async (req, res) => {
  const { goal } = req.body;

  // Check if goal is null or undefined
  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  // Extract role and duration from the goal string (e.g., "Frontend Developer in 1 year")
  const [role, duration] = goal.split(' in ');

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `List 3 potential accomplishments for achieving the goal of becoming a ${role} in ${duration}.`,
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

    const accomplishments = response.data.choices[0].message.content.split('\n').filter(Boolean);
    res.status(200).json({ accomplishments });
  } catch (error) {
    console.error('Error generating accomplishments:', error);
    res.status(500).json({ error: 'Failed to generate accomplishments' });
  }
};