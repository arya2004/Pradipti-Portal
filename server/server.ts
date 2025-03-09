import dotenv from 'dotenv';
import app from './app';
import { migrate } from 'drizzle-orm/mysql2/migrator'; 
import { db } from './db/drizzle';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    
    console.log('Running migrations...');
    //await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations applied successfully!');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server or applying migrations:', error);
    process.exit(1);
  }
};

startServer();
