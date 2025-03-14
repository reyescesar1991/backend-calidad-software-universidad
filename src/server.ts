
import {app} from './app';
import { config } from './core/config';

const startServer = async () => {

    console.log(config.PORT);

    try {
        app.listen(config.PORT, () => {
            

            console.log(`Server running on port ${config.PORT}"`);
            
        })
    } catch (error) {
        
    }
}

startServer();