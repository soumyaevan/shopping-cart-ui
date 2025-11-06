import { useProducts } from "../stores/useProduct";
import ProductCard from "./ProductCard";

import { useEffect } from "react";

const ProductList = () => {
  // const { products, loading, error } = useProducts();
  const {
    data: products = [],
    isLoading: loading,
    error,
    refetch,
  } = useProducts();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      {loading && <p>Loading ...</p>}
      {error && <div>❌ {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
