const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('KenGen Resto Server is Running...');
});

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server hummin' on port ${PORT}`));
