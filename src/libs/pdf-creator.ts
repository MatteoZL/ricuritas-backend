// @ts-ignore
import pdf from "pdf-creator-node";
import fs from "fs-extra";
import { uploadImage } from "./cloudinary";

export async function createOrderPDF(order: any): Promise<string> {
  try {
    let html = fs.readFileSync("src/libs/bill.html", "utf8");

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

export async function createBirthdaysPDF(users: any): Promise<string> {
  try {
    let html = fs.readFileSync("src/libs/birthdays.html", "utf8");

    let values = Object.assign({}, users);

    let random = Math.floor(Math.random() * 1000);

    let document = {
      html,
      data: {
        values,
      },
      path: `tmp/${random}.pdf`,
    };

    let options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
    };

    await pdf.create(document, options);
    const doc = await uploadImage(document.path);
    return doc;
  } catch (error) {
    throw error;
  }
}