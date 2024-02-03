import { ProductMobileSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { ProductSlideshow } from '../../../../components/product/slideshow/ProductSlideshow';

interface Props{
  params:{
    slug:string
  }
}
export default function ProductPage({params}:Props) {
  const {slug} = params
  const product = initialData.products.find(product => product.slug === slug )  
  if(!product){
    notFound()
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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>
        {/* Slector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSize={product.sizes}
        />
        {/* Selector de Cantidad */}
        <QuantitySelector 
          quantity={3}
        />
        {/* Button */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}