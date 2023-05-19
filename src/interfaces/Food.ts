export default interface Food {
  id: string;
  name: string;
  price: number;
  ingredients?: string;
  categoryId: string;
  imagePath: string;
}

export interface FoodWithCategory extends Food {
  categoryName: string;
}
