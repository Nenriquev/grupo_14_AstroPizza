const { body } = require("express-validator");
const path = require("path");

const productValidation = {
  createProduct: [
    body("product_name")
      .notEmpty()
      .withMessage("Nombre de producto requerido")
      .isLength({ min: 1 })
      .withMessage("El campo debe tener minimo 1 caracter"),

    body("price")
      .notEmpty()
      .withMessage("Precio requerido")
      .isNumeric()
      .withMessage("Valores invalidos"),

    body("description")
      .notEmpty()
      .withMessage("Debe dar una descripcion")
      .isLength({ min: 1, max: 200 })
      .withMessage("La descripcion debe tener minimo 1 caracter"),

    body("category").notEmpty().withMessage("Debe elegir una categoria"),

    body("image")
      .if((value, { req }) => req.file)
      .bail()
      .custom((value, { req }) => {
        const extensions = [".jpg", ".webp", ".png", ".jpeg"];
        const fileExtension = path.extname(req.file.originalname);
        return extensions.includes(fileExtension);
      })
      .withMessage("Imagen con extencion invalida"),
  ],
  updateProduct: [
    body("product_name")
      .notEmpty()
      .withMessage("Nombre de producto requerido")
      .isLength({ min: 1 })
      .withMessage("El campo debe tener minimo 1 caracter"),

    body("price")
      .notEmpty()
      .withMessage("Precio requerido")
      .isNumeric()
      .withMessage("Valores invalidos"),

    body("category").notEmpty().withMessage("Debe elegir una categoria"),
  ],
};

module.exports = productValidation;
