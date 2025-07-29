import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { runAllDependencies } from '../../core/config/configureAllDependencies';
import { UserService } from '../../services/userService/user.service';


initializeTestEnvironment();


const runTestGenerateLocationUser = async () => {


    try {

        await runAllDependencies();
          
        const userService = container.resolve(UserService);

        const result = await userService.generateLocationUser("USER7777");

        console.log("📄 Locacion del usuario construida en base a su departamento:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestGenerateLocationUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});