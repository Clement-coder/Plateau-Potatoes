import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, PackageX, CheckCircle } from 'lucide-react';

interface ProductCardProps { product: Product; }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="clay-card hover:-translate-y-1 transition-transform duration-200 relative overflow-hidden">
      <div className="h-48 rounded-2xl overflow-hidden mb-4"
        style={{ background: 'linear-gradient(135deg, #e8f5e9, #d4edda)', boxShadow: 'inset 3px 3px 8px rgba(163,177,198,0.4)' }}>
        {product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">🥔</div>
        )}
      </div>

      <h3 className="font-bold text-gray-700 text-lg mb-1">{product.name}</h3>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-green-700 font-extrabold text-lg">₦{product.price.toLocaleString()}</span>
        <span className="clay-badge text-xs">{product.weight}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400 font-medium">Stock: {product.stock}</span>
        <button onClick={handleAddToCart} disabled={product.stock === 0}
          className={product.stock === 0 ? 'clay-btn-secondary !px-4 !py-2 text-sm opacity-60 cursor-not-allowed' : 'clay-btn !px-4 !py-2 text-sm'}>
          {product.stock === 0
            ? <><PackageX className="w-4 h-4" /> Out of Stock</>
            : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
        </button>
      </div>

      {added && (
        <div className="absolute bottom-0 left-0 w-full py-2 text-center text-sm font-semibold text-white flex items-center justify-center gap-1"
          style={{ background: 'linear-gradient(135deg, #2cb67d, #1a9e68)', borderRadius: '0 0 1.5rem 1.5rem' }}>
          <CheckCircle className="w-4 h-4" /> Added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
