// ml.routes.js (atau controller/handler)

import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/predict-saldo", async (req, res) => {
  try {
    const response = await axios.post(
      "https://ml-api-production-6fd5.up.railway.app/predict",
      {
        data: req.body.data, // pastikan formatnya: List of 7x[4 angka]
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error kirim ke ML API:", error.message);
    res.status(500).json({ error: "Gagal memprediksi saldo" });
  }
});

export default router;
