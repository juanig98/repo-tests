import { Brand } from "./Brand";
import { Category } from "./Category";

export interface Product {
  id: number;
  code: string;
  description: string;
  location: string;
  category: Category;
  brand: Brand;
  slug: string;
  observations: string;
  equivalencies: Product[];
}
