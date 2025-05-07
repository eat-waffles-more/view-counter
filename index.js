const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const VIEWS_FILE = path.join(__dirname, 'views.json');

app.use(cors()); // Allow embedding from other domains

function readViews() {
  if (!fs.existsSync(VIEWS_FILE)) {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify({ count: 0 }), 'utf8');
  }
  const data = fs.readFileSync(VIEWS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeViews(count) {
  fs.writeFileSync(VIEWS_FILE, JSON.stringify({ count }), 'utf8');
}

// Increments and returns count as JSON
app.get('/api/views', (req, res) => {
  const data = readViews();
  data.count++;
  writeViews(data.count);
  res.json({ count: data.count });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});