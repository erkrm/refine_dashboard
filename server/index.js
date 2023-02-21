import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import propertyRoutes from './routes/property.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/users', userRoutes);

const startServer = async () => {
  try {
    // connect to the database...
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log('Server listening on port http://localhost:8080')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
