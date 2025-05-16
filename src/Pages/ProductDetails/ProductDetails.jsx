import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
// import { loadStripe } from '@stripe/stripe-js';

// ✅ Charger Stripe en dehors du composant
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/products/${productId}`);
        if (res.data) {
          setProduct(res.data);
        } else {
          setError("Produit non trouvé.");
        }
      } catch (error) {
        setError("Erreur lors de la récupération du produit.");
        console.error("Erreur API : ", error.response?.data || error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-600 py-10">Chargement du produit...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">{product.price} FCFA</p>
          </div>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
