import axios from "axios";
import { generateXml } from "./xmlGenerator.mjs";

const excludedKeywords = ["АКЦІЯ", "Допинг", "модифік"];

const shouldIncludeProduct = (productName, price) => {
  return (
    !excludedKeywords.some((keyword) => productName.includes(keyword)) &&
    !isNaN(price) &&
    price !== 0
  );
};

const branding = (productName) => {
  if (productName.includes("Fanta")) {
    return "Fanta";
  }
  if (productName.includes("Джемесон")) {
    return "Jameson";
  }
  if (productName.includes("Немирів")) {
    return "Nemiroff";
  }
  if (productName.includes("Jaffa")) {
    return "Jaffa";
  }
  if (productName.includes("BonAqua")) {
    return "BonAqua";
  }
  if (productName.includes("Corona")) {
    return "Corona";
  }
  if (productName.includes("Sprite")) {
    return "Sprite";
  }
  if (productName.includes("Burn") || productName.includes("БЕРН")) {
    return "Burn";
  }
  if (productName.includes("Schweppes") || productName.includes("ШВЕПС")) {
    return "Schweppes";
  }
  if (productName.includes("Coca-Cola") || productName.includes("КОКА-КОЛА")) {
    return "Coca-Cola";
  } else {
    return "Polar Pelmeni";
  }
};

export const DailyLoader = async () => {
  try {
    const data = { channel: [] };
    const response = await axios.get(
      "https://joinposter.com/api/menu.getProducts?token=436783:670964579c5655f22513de1218a29b4d&type=batchtickets"
    );

    response.data.response.forEach((el) => {
      const productName = el.product_name;
      const elPrice = parseInt(el.spots[0].price.slice(0, -2));

      if (shouldIncludeProduct(productName, elPrice)) {
        data.channel.push({
          "g:id": el.product_id,
          "g:title": productName,
          "g:description":
            el.product_production_description.length > 0
              ? el.product_production_description
              : productName,
          "g:link": `https://polarpelmeni.com.ua/product/${el.product_id}`,
          "g:image_link": `https://pelmeni-proxy.work-set.eu${el.photo_origin}`,
          "g:availability": "in_stock",
          "g:price": elPrice + ".00 UAH",
          "g:brand": branding(productName),
        });
      }
    });

    generateXml(data);
  } catch (error) {
    console.log(error);
  }
};

DailyLoader();
