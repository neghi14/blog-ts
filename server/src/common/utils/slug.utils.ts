import slugify from "slugify";

export const slugTitle = (data: string) => {
  const splitData = data.split(" ");
  // eslint-disable-next-line prefer-const
  let newData: Array<string> = [];

  splitData.map((e) => {
    if (e.length > 2) {
      newData.push(e);
    }
  });

  return slugify(`${newData.join(" ")}-${Date.now()}`, {
    lower: true,
  });
};
