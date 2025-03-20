import { getProducts, GetProductType } from "@/actions/products";
import { ProductGrid } from "@/components/product-grid";

export default async function Home() {
  //TODO: revisar con TanstackQuery
  const products: GetProductType = await getProducts();

  return <ProductGrid products={products} />;
}
