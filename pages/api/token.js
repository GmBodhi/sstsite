let storedToken = '';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request
    const { token } = req.body;
    storedToken = token;
    res.status(200).json({ message: 'Token saved successfully' });
  } else if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ token: storedToken });
    storedToken=""
  } else {
    res.status(405).end(); // Method Not Allowed
  }

}
