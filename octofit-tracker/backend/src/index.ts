import { app, port, baseUrl } from './server';
import { connectDatabase } from './config/database';

const start = async () => {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Backend listening on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
};

void start();
