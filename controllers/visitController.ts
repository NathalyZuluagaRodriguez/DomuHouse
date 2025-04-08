import db from "../config/config-db";
import Visit from "../Dto/VisitDto";

const VisitaService = {
  async register(visita: Visit) {
    const [result]: any = await db.execute(
      "INSERT INTO visita (id_visita, fecha_visita) VALUES (?, ?)",
      [visita.id_visita, visita.fecha_visita]
    );
    return result;
  },
};

export default VisitaService;
