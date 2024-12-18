const express = require("express");
const { getProductsController, addProductController, updateProductController, deleteProductController, getProductsByQuery, getProductById, getSimiliarProducts, getProductsByName, getProductFilters,getProductFiltersMobile, getFilteredProducts } = require("../controllers/productController");
const router = express.Router();

router.post("/addproduct", addProductController);
router.get("/getproducts", getProductsController);

// GET Products by query
router.get("/get", getProductsByQuery);

router.get("/:id", getProductById);
router.get("/similiarProducts/:id", getSimiliarProducts)

// router.get("/searchProduct/:productName", getProductsByName);
router.get("/search/searchedProduct", getProductsByName);
router.get("/searchfilters/getProductFilters",getProductFilters );
router.get("/searchfilters/getProductFiltersMobile",getProductFiltersMobile)
router.post("/search/filteredProduct", getFilteredProducts);

router.put("/updateproduct/:id", updateProductController);
router.delete("/deleteProduct/:id", deleteProductController);

module.exports = router;