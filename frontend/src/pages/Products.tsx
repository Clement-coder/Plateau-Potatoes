import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import ClaySelect from '../components/ClaySelect';
import ProductSearch from '../components/ProductSearch';

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
          <ProductSearch value={filters.search} onChange={(v) => set('search', v)} />
          <ClaySelect
            value={filters.category}
            onChange={(v) => set('category', v)}
            options={[
              { value: '', label: 'All Categories' },
              { value: 'fresh', label: 'Fresh' },
              { value: 'processed', label: 'Processed' },
              { value: 'seeds', label: 'Seeds' },
            ]}
            placeholder="All Categories"
            className="min-w-44"
          />
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
