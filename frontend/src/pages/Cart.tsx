import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="clay-page flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="clay-card text-center max-w-sm w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-extrabold text-gray-700 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-6">Add some fresh potatoes to get started!</p>
          <Link to="/products" className="clay-btn w-full justify-center py-4">
            <ShoppingBag className="w-5 h-5" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="clay-page px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-700 mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product._id} className="clay-card flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #e8f5e9, #d4edda)', boxShadow: 'inset 3px 3px 8px rgba(163,177,198,0.3)' }}>
                  🥔
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-700 truncate">{item.product.name}</h3>
                  <p className="text-gray-400 text-sm">{item.product.weight}</p>
                  <p className="text-green-700 font-extrabold">₦{item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="clay-btn-secondary !px-3 !py-2"><Minus className="w-3 h-3" /></button>
                  <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="clay-btn-secondary !px-3 !py-2"><Plus className="w-3 h-3" /></button>
                </div>
                <button onClick={() => removeFromCart(item.product._id)}
                  className="clay-btn-danger !px-3 !py-2 flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="clay-card h-fit">
            <h2 className="text-xl font-extrabold text-gray-700 mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {[['Subtotal', `₦${totalAmount.toLocaleString()}`], ['Delivery', '₦2,000'], ['Total', `₦${(totalAmount + 2000).toLocaleString()}`]].map(([label, val], i) => (
                <div key={i} className={`flex justify-between ${i === 2 ? 'font-extrabold text-green-700 pt-3 border-t border-green-100 text-lg' : 'text-gray-500 text-sm'}`}>
                  <span>{label}</span><span>{val}</span>
                </div>
              ))}
            </div>
            <Link to="/checkout" className="clay-btn w-full justify-center py-4">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
