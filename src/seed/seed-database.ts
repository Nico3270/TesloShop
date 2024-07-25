import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from './seed-countries';

async function main() {
  //1. Borrar registros previos
  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  

  // Ejecutar categorías - Se extraen las categorías del archivo initialData
  const { categories, products, users } = initialData;

  await prisma.country.createMany({
    data: countries
  });
  


  await prisma.user.createMany({
    data: users
  });

  //A continuación se crea un array con diferentes objetos que se almacenan dentro de categoriesData
  //   [
  //     { name: 'shirts' },
  //     { name: 'pants' },
  //     { name: 'hoodies' },
  //     { name: 'hats' }
  //   ]
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });
  // 2. Identificar los id de cada categoría, para insertar ese id en cada type del producto
  //Extraer las categorías y su id
  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // categoriesMap se convierte en un objeto que contiene los id y nombres de las categorias
  //   {
  //     shirts: '7680cc41-2160-4be1-9f46-01e9ddd11016',
  //     pants: '37d32a3f-4a93-4bc6-85b4-49c24930786e',
  //     hoodies: 'c8a72208-cac1-4c8a-8710-fe532bf2c58c',
  //     hats: '6d07f24c-56ef-4f69-9e78-d8e5025acac9'
  //   }

  //3. Insertar en base de datos los productos

  products.forEach(async (product) => {
    //Como type e images no se encuentran en el schema de products, se quitan y los demás datos se almacenan en ...rest
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });
    //4. Insertar las imágenes en la tabla ProductImage teniendo en cuenta la relación con el id del producto
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutado correctamente");
}

//Función anonima autoinvocada

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
