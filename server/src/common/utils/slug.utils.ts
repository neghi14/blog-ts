import slugify from "slugify";
import crypto from "crypto";

export const slugTitle = (data: string) => {
  const splitData = data.split(" ");
  // eslint-disable-next-line prefer-const
  let newData: Array<string> = [];

  splitData.map((e) => {
    if (e.length > 2) {
      newData.push(e);
    }
  });
  const random = crypto.randomBytes(3).toString("hex");
  return slugify(`${newData.join(" ")}-${random}`, {
    lower: true,
  });
};
