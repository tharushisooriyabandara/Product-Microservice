const {
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getAllProducts,
  } = require("../controllers/products.controller");
  const Product = require("../database/models/Product");
  
  jest.mock("../database/models/Product");
  
  // Mocking Express response
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  
  // Mocking request bodies
  const reqAddProduct = {
    body: {
      name: "Test Product",
      desc: "Test Description",
      banner: "Test Banner",
      type: "Test Type",
      unit: 10,
      price: 100,
    },
  };
  
  const reqUpdateProduct = {
    params: {
      id: "p_001",
    },
    body: {
      name: "Updated Product",
      desc: "Updated Description",
      banner: "Updated Banner",
      type: "Updated Type",
      unit: 20,
      price: 200,
    },
  };
  
  const reqGetProductById = {
    params: {
      id: "p_001",
    },
  };
  
  describe("addProduct", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should add a new product successfully", async () => {
      // Mocking Product instance and its save function
      const saveMock = jest.fn();
      Product.mockReturnValue({ save: saveMock });
  
      // Call the function
      await addProduct(reqAddProduct, res);
  
      // Check if the save function was called with the correct arguments
      expect(saveMock).toHaveBeenCalledWith();
  
      // Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product added successfully.",
      });
    });
  });
  
  describe("deleteProduct", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should delete a product successfully", async () => {
      // Mocking Product.findByIdAndDelete
      const findByIdAndDeleteMock = jest.fn();
      Product.findByIdAndDelete = findByIdAndDeleteMock;
  
      // Call the function
      await deleteProduct({ params: { id: "p_001" } }, res);
  
      // Check if the findByIdAndDelete function was called with the correct arguments
      expect(findByIdAndDeleteMock).toHaveBeenCalledWith("p_001");
  
      // Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product deleted successfully.",
      });
    });
  });
  
  describe("updateProduct", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should update a product successfully", async () => {
      // Mocking Product.findByIdAndUpdate
      const findByIdAndUpdateMock = jest.fn();
      Product.findByIdAndUpdate = findByIdAndUpdateMock;
  
      // Call the function
      await updateProduct(reqUpdateProduct, res);
  
      // Check if the findByIdAndUpdate function was called with the correct arguments
      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
        "p_001",
        reqUpdateProduct.body
      );
  
      // Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product updated successfully.",
      });
    });
  });
  
  describe("getProductById", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should get a product by id successfully", async () => {
      // Mocking Product.findById
      const findByIdMock = jest.fn().mockResolvedValue({
        name: "Test Product",
        desc: "Test Description",
        banner: "Test Banner",
        type: "Test Type",
        unit: 10,
        price: 100,
      });
      Product.findById = findByIdMock;
  
      // Call the function
      await getProductById(reqGetProductById, res);
  
      // Check if the findById function was called with the correct arguments
      expect(findByIdMock).toHaveBeenCalledWith("p_001");
  
      // Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        name: "Test Product",
        desc: "Test Description",
        banner: "Test Banner",
        type: "Test Type",
        unit: 10,
        price: 100,
      });
    });
  
    it("should return 404 if product not found", async () => {
      // Mocking Product.findById to return null
      Product.findById = jest.fn().mockResolvedValue(null);
  
      // Call the function
      await getProductById(reqGetProductById, res);
  
      // Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product not found.",
      });
    });
  });
  
  describe("getAllProducts", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should get all products successfully", async () => {
      // Mocking Product.find
      const findMock = jest.fn().mockResolvedValue([
        {
          name: "Test Product 1",
          desc: "Test Description 1",
          banner: "Test Banner 1",
          type: "Test Type 1",
          unit: 10,
          price: 100,
        },
        {
          name: "Test Product 2",
          desc: "Test Description 2",
          banner: "Test Banner 2",
          type: "Test Type 2",
          unit: 20,
          price: 200,
        },
      ]);
      Product.find = findMock;
  
      // Call the function
      await getAllProducts({}, res);
  
      // Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          name: "Test Product 1",
          desc: "Test Description 1",
          banner: "Test Banner 1",
          type: "Test Type 1",
          unit: 10,
          price: 100,
        },
        {
          name: "Test Product 2",
          desc: "Test Description 2",
          banner: "Test Banner 2",
          type: "Test Type 2",
          unit: 20,
          price: 200,
        },
      ]);
    });
  });