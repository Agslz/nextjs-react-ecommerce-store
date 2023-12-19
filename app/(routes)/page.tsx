import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: false });

  //Cambiar el getBillboardId en caso de que sea necesario ---> Esto es el billboardId, se encuentrea en los 3 puntos de la derecha "66b81bb3-d2b8-4023-98c0-f20b5b5eb62b

  //El valor que se encuentra entre api y billboard es el Store -----> http://localhost:3000/api/97653dc0-0cad-40be-9edd-f72599f348ff/billboards

  const billboard = await getBillboard("7ac397ea-32d6-437b-9424-b24f9166d1b7");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Productos Destacados" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
