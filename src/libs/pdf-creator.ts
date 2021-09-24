// @ts-ignore
import pdf from "pdf-creator-node";
import fs from "fs-extra";
import { uploadImage } from "./cloudinary";

export default async function createPDF(order: any): Promise<string> {
  try {
    let html = fs.readFileSync("src/libs/index.html", "utf8");

    let values = Object.assign({}, order);

    let document = {
      html,
      data: {
        values,
      },
      path: `tmp/${order.restaurant_id}.pdf`,
    };

    let options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
    };

    await pdf.create(document, options);
    const receipt = await uploadImage(document.path);
    return receipt;
  } catch (error) {
    throw error;
  }
}
