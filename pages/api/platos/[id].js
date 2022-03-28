import dbConnect from "config/mongoose";
import Plato from "models/Plato";
import  mongoose from "mongoose";

dbConnect();
export default async function Id(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
        try {
            const plato = await Plato.findById(id);
            return res.status(200).json(plato);
          } catch (error) {
            if (error.kind === "ObjectId") {
              return res.status(400).json({ error: "Id no valido" });
            }
            return res.status(500).json({ error: error.message });
          }
    case "PUT":
      try {
        const plato = await Plato.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json(plato);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "DELETE":
      try {
        const plato = await Plato.findByIdAndDelete(id);
        return res.status(200).json(plato);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      res.status(405).json({
        error: `${req.method} metodo no permitido`,
      });
  }
}
