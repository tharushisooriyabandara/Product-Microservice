const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/products.controller");

const router = require("express").Router();

router.get("/", async(req,res)=>{
    await getAllProducts(req,res)
})

router.get("/:id", async(req,res)=>{
    await getProductById(req,res);
})

router.post("/add-product", async (req, res) => {
  await addProduct(req, res);
});

router.put("/:id", async(req,res)=>{
    await updateProduct(req,res)
})

router.delete("/:id", async(req,res)=>{
    await deleteProduct(req,res);
})


module.exports = router;
