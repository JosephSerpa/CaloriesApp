export interface NutritionData {
  foodName: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  briefSummary: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}
