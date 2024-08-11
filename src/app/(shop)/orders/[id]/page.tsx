import { getOrderById } from "@/actions/order/get-order-by-id";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { PayPalButton } from "@/components/paypal/PaypalButton";
import { Title } from "@/components/ui/title/Title";
import { currencyFormar } from "@/utils/currencyFormat";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersPage({ params }: Props) {
  const { id } = params;

  // Todo: Llamar al server action

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;
  // console.log(order);

  //Todo: Verificar

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden # ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.product.title} x 3</p>
                  <p>
                    $ {item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: $ {currencyFormar(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7 ml-10">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-1">
              <p className="text-xl">{`${address!.firstName} ${
                address!.lastName
              }`}</p>
              <p className="font-bold">{address!.address}</p>
              <p className="">
                {address!.city}, {address!.countryId}
              </p>
              <p className="">{`Telefono ${address!.phone}`} </p>
              <p className="">{`Código postal: ${address!.postalCode}`} </p>
            </div>

            {/* Línea de división */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2"> Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>Número de producto</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormar(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormar(order!.tax)}</span>

              <span className="mt-5 text-2xl text-blue-600 font-bold">
                Total
              </span>
              <span className="mt-5 text-2xl text-right text-blue-600 font-bold">
                {currencyFormar(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PayPalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
