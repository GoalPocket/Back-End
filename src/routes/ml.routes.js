// routes/ml.routes.js

import express from "express";
import axios from "axios";

const router = express.Router();

// Endpoint untuk memprediksi saldo
router.post("/predict-saldo", async (req, res) => {
  const { data } = req.body;

  // Validasi dasar
  if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
    return res.status(400).json({
      error: "Format data tidak valid. Harus berupa array 2 dimensi.",
    });
  }

  try {
    const mlResponse = await axios.post(
      // Gunakan alamat production saat sudah live
      "https://ml-api-production-6fd5.up.railway.app/predict",
      { data }
    );

    res.status(200).json(mlResponse.data);
  } catch (error) {
    console.error("❌ Error mengirim ke ML API:", error.message);

    const status = error.response?.status || 500;
    const message =
      error.response?.data?.error ||
      "Gagal memprediksi saldo. Silakan coba lagi nanti.";

    res.status(status).json({ error: message });
  }
});

export default router;
