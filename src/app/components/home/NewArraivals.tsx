import Header from '@/app/components/shared/Header';
import ProductCard from '@/app/components/shared/ProductCard';

const products = [
  {
    brand: 'Sony',
    title: 'Camera Canon EOS 2000D Kit EF-S18-55mm',
    price: '$9.122',
    oldPrice: '$1.350',
    reviews: 50,
    discount: 'On Sale -10%',
    isNew: true,
  },
  {
    brand: 'Apple',
    title: 'Apple Watch SE GPS 40mm',
    price: '$1.122',
    reviews: 20,
    isNew: true,
  },
  {
    brand: 'Sony',
    title: 'Smart Watch Sony SW750',
    price: '$9.122',
    oldPrice: '$1.350',
    reviews: 25,
    discount: 'On Sale -10%',
    isNew: true,
  },
  {
    brand: 'Samsung',
    title: 'Sony PlayStation VR',
    price: '$1.122',
    reviews: 12,
    isNew: true,
  },
];

function NewArraivals() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <Header title="New Arraivals" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}

export default NewArraivals;
