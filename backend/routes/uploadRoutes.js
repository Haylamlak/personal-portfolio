const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image selected",
    });
  }

  res.json({
    message: "Image uploaded successfully",
    image: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;