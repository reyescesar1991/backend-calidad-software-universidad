import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { MenuService } from "../../../services/menu/Menu.service";


initializeTestEnvironment();

const runTestGetSubrouteByPermission = async () => {


    try {

        const permissionKey : string = "buscar_producto";

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.getSubroutesByPermission(permissionKey);

        console.log(`📄 Subruta encontrada asociada al permiso ${permissionKey}: `, result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }

}

runTestGetSubrouteByPermission().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});