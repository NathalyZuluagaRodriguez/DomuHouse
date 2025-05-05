import { PropertyRepository } from '../repositories/propertyRepository';
import Property from '../Dto/propertyDto'; 

class propertyServi {
     // Registro de propiedad
     static async registerProperty(property: Property) {
        try {
            console.log("🏠 Propiedad recibida en servicio:", property);
            return await PropertyRepository.create(property);
        } catch (error) {
            console.error('Error al registrar propiedad:', error);
            throw new Error('No se pudo registrar la propiedad');
        }
    }
}

export default propertyServi;