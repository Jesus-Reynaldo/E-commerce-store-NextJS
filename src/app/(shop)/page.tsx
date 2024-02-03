import { Title, ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";
import { initialize } from "next/dist/server/lib/render-server";


const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todo los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
