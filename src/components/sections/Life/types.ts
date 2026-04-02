import { StaticImageData } from "next/image";

export type ImageItem = {
  id: number | string;
  url: string | StaticImageData;
  alt?: string;
  title?: string;
};
