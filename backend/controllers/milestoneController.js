const axios = require('axios');

exports.generateMilestones = async (req, res) => {
  const { goal } = req.body;

  // Check if goal is null or undefined
  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  // Log the raw goal input
  console.log("Raw goal input:", goal);

  // Extract role and duration from the goal string (e.g., "Frontend Developer in 1 year")
  let [role, duration] = goal.split(' in ').map(s => s.trim());
  if (!duration) {
    // Default to 1 year if duration is not specified
    duration = '1 year';
  }

  // Log the parsed role and duration
  console.log("Parsed role:", role);
  console.log("Parsed duration:", duration);

  try {
    const apiContent = `Break down the goal of becoming a ${role} into achievable milestones for ${duration}. Provide milestones for the first 3 months, 6 months, and 1 year.`;
    console.log("API Request Content:", apiContent);

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: apiContent,
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

    console.log("API Response:", response.data.choices[0].message.content);

    const milestones = response.data.choices[0].message.content.split('\n').filter(Boolean);
    res.status(200).json({ milestones });
  } catch (error) {
    console.error('Error generating milestones:', error);
    res.status(500).json({ error: 'Failed to generate milestones' });
  }
};