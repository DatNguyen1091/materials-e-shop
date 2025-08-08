import { useState, useEffect } from 'react';
import { getProductById } from '../services/productApi';
import { mapApiProductToProduct } from '../utils/productMapper';

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const fetchedProduct = await getProductById(productId);
        const mappedProduct = mapApiProductToProduct(fetchedProduct);
        setProduct(mappedProduct);
        
        // Reset states khi thay đổi sản phẩm
        setSelectedImage(0);
        setQuantity(1);
        setSelectedColor(0);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
    loading,
    error,
    handleImageChange,
    handleQuantityChange,
    handleColorChange
  };
};
