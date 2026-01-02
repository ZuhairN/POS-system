import { useData } from '@/context/DataProvider';
import ProductCard from './ProductCard';

export default function ProductsGrid() {
  const products = JSON.parse(useData()).products;

  return (
    <div className='grid overflow-auto grid-cols-4 gap-16 p-16'>
      {products.map(pro => (
        <ProductCard key={pro.id} product={pro} />
      ))}
    </div>
  );
}
