import { clothType } from "@/constant/clothType";

export const getLabelById = (id: number): string | undefined => {
  const clothTypeItem = clothType.find((item) => item.id === id);
  return clothTypeItem ? clothTypeItem.label : undefined;
};
