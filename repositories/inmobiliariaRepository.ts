import db from '../config/config-db'; // Uso consistente de "db" como en otros repositorios
import { RowDataPacket } from 'mysql2';

// Definir el tipo para la respuesta esperada de la consulta
type QueryResult = RowDataPacket & {
  'COUNT(*)': number; 
};

export const checkInmobiliariaExists = async (inmobiliariaId: number): Promise<boolean> => {
  const query = 'SELECT COUNT(*) FROM Inmobiliaria WHERE id_inmobiliaria = ?'; // Corregido: "Inmobiliaria" en singular como está en la BD
  
  // Ejecutar la consulta y asegurarse de que la respuesta es del tipo adecuado
  const [result] = await db.execute<QueryResult[]>(query, [inmobiliariaId]);
  
  // Ahora TypeScript sabe que result es un array de QueryResult
  return result[0]['COUNT(*)'] > 0;
};