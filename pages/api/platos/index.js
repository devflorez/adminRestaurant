import dbConnect from "/config/mongoose";
import Plato from "/models/Plato";
dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const platos = await Plato.find();
        return res.status(200).json(platos);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const plato = new Plato(body);
        const platoGuardado = await plato.save();
        return res.status(201).json(platoGuardado);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      res.status(405).json({
        error: `${req.method} metodo no permitido`,
      });
  }
}
