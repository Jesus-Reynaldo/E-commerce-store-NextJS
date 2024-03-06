export const revalidate = 604800;
import {
  ProductMobileSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { ProductSlideshow } from "../../../../components/product/slideshow/ProductSlideshow";
import { getProductByslug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductByslug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductByslug(slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Slideshow mobile */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        {/* Slideshow Desktop */}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1">
        <StockLabel slug="150" />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>
        <AddToCart product={product} />
        {/*Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
