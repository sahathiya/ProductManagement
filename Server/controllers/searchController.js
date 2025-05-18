const Product=require("../models/productSchema")



const SearchByproductTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query is required" });
    }

    // Case-insensitive regex match
    const products = await Product.find({
      title: { $regex: title, $options: "i" }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { SearchByproductTitle };
