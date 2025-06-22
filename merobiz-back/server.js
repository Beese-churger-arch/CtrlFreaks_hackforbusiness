// require('dotenv').config();
// const express = require('express');
// const app = express();
// const assistantRoutes = require('./routes/assistantRoutes');
// const cors = require('cors');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/assistant', assistantRoutes);

// // Server listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const assistantRoutes = require('./routes/assistantRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Must come before routes!

// ✅ Mounts: /api/assistant/chat
app.use('/api/assistant', assistantRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

