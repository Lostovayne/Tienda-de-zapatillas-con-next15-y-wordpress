"use server";
import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WC_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

export const getProducts = async () => {
  const {data} = await WooCommerce.get("products");
  console.log(data);
  return data;
};

export const createOrder = async (orderData: any) => {
  try {
    const order = await WooCommerce.post("orders", orderData);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export type GetProductType = Awaited<ReturnType<typeof getProducts>>;
