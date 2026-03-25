import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Products: React.FC = () => {
  const [filters, setFilters] = useState({ category: '', search: '', page: 1 });

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsAPI.getProducts(filters)
  });

  const set = (key: string, value: string) => setFilters(p => ({ ...p, [key]: value, page: 1 }));

  if (error) return <div className="clay-page flex items-center justify-center min-h-[60vh]"><div className="clay-card text-red-500 font-semibold">Error loading products</div></div>;

  return (
    <div className="clay-page px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-700 mb-8">Our Products</h1>

        <div className="clay-card mb-8 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." value={filters.search}
              onChange={(e) => set('search', e.target.value)}
              className="clay-input pl-10" />
          </div>
          <select value={filters.category} onChange={(e) => set('category', e.target.value)}
            className="clay-select min-w-40">
            <option value="">All Categories</option>
            <option value="fresh">Fresh</option>
            <option value="processed">Processed</option>
            <option value="seeds">Seeds</option>
          </select>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="clay-card h-72 animate-pulse">
                <div className="h-48 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #e8f5e9, #d4edda)' }} />
                <div className="h-4 rounded-full bg-gray-200 mb-2 w-3/4" />
                <div className="h-3 rounded-full bg-gray-100 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {data?.totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                {Array.from({ length: data.totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setFilters(p => ({ ...p, page: i + 1 }))}
                    className={filters.page === i + 1 ? 'clay-btn !px-4 !py-2' : 'clay-btn-secondary !px-4 !py-2'}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
