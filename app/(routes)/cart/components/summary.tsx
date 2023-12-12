"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const Summary = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // const onCheckout = async () => {
  //   setLoading(true);
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
  //     {
  //       productIds: items.map((item) => item.id),
  //     }
  //   );

  //   window.location = response.data.url;
  // };

  const handlePaymentClick = () => {
    Swal.fire({
      title: "Contacta a nuestro WhatsApp",
      text: "Debido a problemas con las pasarelas de pago para realizar el pago, comunícate con nosotros a través de WhatsApp.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ir a WhatsApp",
      footer: `
      <p><strong>Pronto volveremos a procesar pagos con Mercado Pago</strong></p>
      <p>Mientras tanto, puedes seguirnos en nuestras redes sociales:</p>
      <ul>
        <li><a href="https://www.instagram.com/grabarardigital/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram</a></li>
        <li><a href="https://www.facebook.com/grabarardigitalmza" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} size="lg" /> Facebook</a></li>
      </ul>
    `,
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(
          "https://wa.me/+5492615979085?text=Hola! Me comunico desde el ecommerce, quisiera realizar el pago de unos artículos",
          "_blank"
        );
      }
    });
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={handlePaymentClick}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        {loading ? (
          <div className="flex justify-center cursor-wait space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <p>Loading....</p>
          </div>
        ) : (
          "Checkout"
        )}
      </Button>
    </div>
  );
};

export default Summary;
