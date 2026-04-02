import { ImageItem } from "../types";

export const splitIntoColumns = (
  items: ImageItem[],
  columnCount: number
): ImageItem[][] => {
  const cols: ImageItem[][] = Array.from({ length: columnCount }, () => []);

  items.forEach((item, index) => {
    cols[index % columnCount].push(item);
  });

  return cols;
};
