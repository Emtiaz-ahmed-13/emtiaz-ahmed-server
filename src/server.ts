import "dotenv/config";
import { Server } from 'http';
import app from './app';
import config from './config';

async function bootstrap() {
    let server: Server;

    try {
        // Start server
        server = app.listen(config.port, () => {
            console.log(`🚀 Server is running on http://localhost:${config.port}`);
            console.log(`📊 Environment: ${config.node_env}`);
        });

        // Graceful shutdown
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.log('Server closed gracefully.');
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        };

        // Handle unhandled rejections
        process.on('unhandledRejection', (error) => {
            console.log('Unhandled Rejection detected, closing server...');
            if (server) {
                server.close(() => {
                    console.error(error);
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        });

        // Handle SIGTERM
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, closing server...');
            exitHandler();
        });

    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1);
    }
}

bootstrap();