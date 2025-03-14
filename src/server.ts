
import {app} from './app';
import { config } from './core/config';

const startServer = async () => {

    try {
        app.listen(config.PORT, () => {
            
            console.log(`Server running on port ${config.PORT}"`);
            
        })
    } catch (error) {
        
    }
}

startServer();