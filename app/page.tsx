import { getProducts } from "@/actions/products";

export default async function Home() {
  //TODO: revisar con TanstackQuery
  const products = await getProducts();
  return <ProductGrid products={products} />;
}
