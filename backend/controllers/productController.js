import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

const getCollection = () => getDB().collection('products');

export const getProducts = async (req, res) => {
  try {
    const products = await getCollection().find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getCollection().findOne({ _id: new ObjectId(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Format ID tidak valid' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, imageUrl, stock } = req.body;
    const newProduct = {
      name,
      price: Number(price),
      category,
      description,
      imageUrl,
      stock: Number(stock),
      createdAt: new Date()
    };

    const result = await getCollection().insertOne(newProduct);
    res.status(201).json({ _id: result.insertedId, ...newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, imageUrl, stock } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (price !== undefined) updateData.price = Number(price);
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (stock !== undefined) updateData.stock = Number(stock);

    const result = await getCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result.matchedCount > 0) {
      res.json({ message: 'Produk berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const result = await getCollection().deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.json({ message: 'Produk berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};