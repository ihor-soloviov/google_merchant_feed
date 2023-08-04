import axios from "axios";
import { generateXml } from "./xmlGenerator.mjs";

export const DailyLoader = async () => {
  try {
    const data = { channel: [] };
    const response = await axios.get(
      "https://joinposter.com/api/menu.getProducts?token=436783:670964579c5655f22513de1218a29b4d&type=batchtickets"
    );

    response.data.response.forEach((el) => {
      const elPrice = parseInt(el.spots[0].price.slice(0, -2)) + ".00 UAH";
      data.channel.push({
        "g:id": el.product_id.toString(),
        "g:title": el.product_name,
        "g:description": el.product_production_description.length > 0 ? el.product_production_description : el.product_name,
        "g:link": `https://polarpelmeni.com.ua/product/${el.product_id}`,
        "g:image_link": `https://pelmeni-proxy.work-set.eu${el.photo_origin}`,
        "g:availability": "in_stock",
        "g:price": elPrice,
        "g:brand": "Polar Pelmeni",
      });
    });

    generateXml(data);
    // console.log(data)
  } catch (error) {
    console.log(error);
  }
};

DailyLoader();
