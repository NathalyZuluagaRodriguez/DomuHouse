import { PropertyRepository } from '../repositories/propertyRepository';
import Property from '../Dto/propertyDto'; 

class propertyServi {
     // Registro de propiedad
     static async registerProperty(property: Property) {
        try {
            console.log("🏠 Propiedad recibida en servicio:", property);
            return await PropertyRepository.CreateProperty(property);
        } catch (error) {
            console.error('Error al registrar propiedad:', error);
            throw new Error('No se pudo registrar la propiedad');
        }
    }

    static async getAllProperties() {
        try {
            return await PropertyRepository.getAll();
        } catch (error) {
            throw new Error('No se pudieron obtener las propiedades');
        }
    }

    static async getByIdProperty(id: number) {
        try {
            console.log("Obteniendo propiedad con ID:", id);
            const result = await PropertyRepository.getById(id);
            
            if (!result) {
                throw new Error(`Propiedad con ID ${id} no encontrada`);
            }
            
            return result;
        } catch (error) {
            console.error('Error en getByIdProperty:', error);
            throw error;
        }
    }
    
}

export default propertyServi;