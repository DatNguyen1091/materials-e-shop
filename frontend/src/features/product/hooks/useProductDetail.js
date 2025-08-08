import { useState, useEffect } from 'react';
import { products } from '../data/products';

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    // Tìm sản phẩm theo ID
    const foundProduct = products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct);
    
    // Reset states khi thay đổi sản phẩm
    setSelectedImage(0);
    setQuantity(1);
    setSelectedColor(0);
  }, [productId]);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleColorChange = (index) => {
    setSelectedColor(index);
  };

  return {
    product,
    selectedImage,
    quantity,
    selectedColor,
    handleImageChange,
    handleQuantityChange,
    handleColorChange
  };
};
