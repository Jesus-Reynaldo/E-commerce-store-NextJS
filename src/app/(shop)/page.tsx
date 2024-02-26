import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";
import { initialize } from "next/dist/server/lib/render-server";


const products = initialData.products;

export default async function Home() {
  const {products} = await getPaginatedProductsWithImages()
  return (
    <>
      <Title title="Tienda" subtitle="Todo los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
