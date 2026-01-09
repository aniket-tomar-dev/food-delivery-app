// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../lib/api";

// const steps = ["Pending", "Confirmed", "Out for Delivery", "Delivered"];

// export default function OrderDetails() {
//   const { id } = useParams();
//   const [order, setOrder] = useState<any>(null);

//   const fetchOrder = async () => {
//     const res = await api.get(`/orders/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     setOrder(res.data);
//   };

//   useEffect(() => {
//     fetchOrder();
//     const interval = setInterval(fetchOrder, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!order) return <p>Loading...</p>;

//   const currentStep = steps.indexOf(order.status);

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold">Order Tracking</h2>

//       {/* Stepper */}
//       <div className="flex justify-between mt-6">
//         {steps.map((step, index) => (
//           <div key={step} className="text-center">
//             <div
//               className={`w-8 h-8 rounded-full mx-auto ${
//                 index <= currentStep ? "bg-green-500" : "bg-gray-300"
//               }`}
//             />
//             <p className="text-sm mt-1">{step}</p>
//           </div>
//         ))}
//       </div>

//       <p className="mt-4">
//         Estimated Delivery: <b>{order.estimatedDeliveryTime}</b>
//       </p>

//       {order.rider && (
//         <div className="mt-4 border p-3 rounded">
//           <p className="font-semibold">Rider Details</p>
//           <p>{order.rider.name}</p>
//           <p>{order.rider.phone}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const steps = ["Pending", "Confirmed", "Out for Delivery", "Delivered"];

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = async () => {
    const res = await api.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            Loading order details...
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Order Tracking</CardTitle>
          <Badge variant="secondary">{order.status}</Badge>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white text-sm
                    ${index <= currentStep ? "bg-green-600" : "bg-gray-300"}`}
                >
                  {index + 1}
                </div>
                <p className="text-xs mt-2">{step}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-4 text-sm text-muted-foreground">
            Estimated Delivery:{" "}
            <span className="font-semibold">{order.estimatedDeliveryTime}</span>
          </p>
        </CardContent>
      </Card>

      {/* ORDER SUMMARY */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item: any) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </CardContent>
      </Card>

      {/* RIDER DETAILS */}
      {order.rider && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delivery Partner</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>
              <span className="font-medium">Name:</span> {order.rider.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {order.rider.phone}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
