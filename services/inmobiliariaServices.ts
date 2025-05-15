import inmobiliariaRepo from "../repositories/inmobiliariaRepository";
import sendEmail from "../utils/sendEmailer"; 

interface NuevaInmobiliaria {
    nombre: string;
    telefono: string;
    correo: string;
    id_persona: number;
}

const registrarInmobiliaria = async (data: NuevaInmobiliaria) => {

      const personaExiste = await inmobiliariaRepo.existePersona(data.id_persona);
    if (!personaExiste) {
        throw new Error("El id_persona no está registrado en la base de datos");
    }

    // RF05.5: Validar si ya es administrador
    const yaEsAdmin = await inmobiliariaRepo.verificarSiYaEsAdministrador(data.id_persona);
    if (yaEsAdmin) {
        throw new Error("Ya estás registrado como administrador de una inmobiliaria");
    }

    // RF05.2: Validar nombre/correo duplicados
    const existe = await inmobiliariaRepo.buscarPorNombreOCorreo(data.nombre, data.correo);
    if (existe) {
        throw new Error("Ya existe una inmobiliaria con ese nombre o correo");
    }

    // RF05.4: Insertar inmobiliaria con id_persona como admin principal
    const creada = await inmobiliariaRepo.crearInmobiliaria(data);
    if (!creada) {
        throw new Error("Error al registrar la inmobiliaria");
    }

    const correoAdmin = await inmobiliariaRepo.obtenerCorreoPersona(data.id_persona);
    if (correoAdmin) {
        await sendEmail(
            correoAdmin,
            "Registro Exitoso de Inmobiliaria",
            `¡Hola! Tu inmobiliaria "${data.nombre}" ha sido registrada exitosamente. 
             Ya eres el administrador principal. Puedes iniciar sesión para gestionar tus propiedades, agentes y más.`
        );
    }
     return true;
};


export default {
    registrarInmobiliaria,
};
