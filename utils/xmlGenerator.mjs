import { writeFile } from "fs";
import { Js2Xml as js2xml } from "js2xml";
import moment from "moment";

const data = {
  channel: [
    {
      "g:id": "375",
      "g:title": "Круасан-збери сам",
      "g:description": "qweqw",
      "g:link": "https://polarpelmeni.com.ua/product/375",
      "g:image_link":
        "https://pelmeni-proxy.work-set.eu/upload/pos_cdb_280243/menu/product_1679997365_375_original.jpeg",
      "g:availability": "[in_stock]",
      "g:price": "250.00 UAH",
      "g:brand": "Polar Pelmeni",
    },
    {
      "g:id": "376",
      "g:title": "Круасан-збери сам",
      "g:description": "qweqw",
      "g:link": "https://polarpelmeni.com.ua/product/375",
      "g:image_link":
        "https://pelmeni-proxy.work-set.eu/upload/pos_cdb_280243/menu/product_1679997365_375_original.jpeg",
      "g:availability": "[in_stock]",
      "g:price": "250.00 UAH",
      "g:brand": "Polar Pelmeni",
    },
  ],
};

export const generateXml = (data) => {
  const preXml = new js2xml(
    'rss xmlns:g="http://base.google.com/ns/1.0" version="2.0"',
    data
  );
  const xml = preXml
    .toString()
    .replace(
      '</rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">',
      "</rss>"
    );

  const fileName = moment().format("DDMMYYYY-HHmmss_SSS");

  writeFile(
    `/Users/6man/projects/1.WORKSET/google_merchant_feed/uploads/${fileName}.xml`,
    xml,
    (error) => {
      if (error) {
        console.error("Some troubles with saving file", error);
      }
      console.log("file was succesfully saved");
    }
  );
};
