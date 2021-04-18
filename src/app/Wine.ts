export interface WineItem {
  no?: string;
  name: string;
  image: string;
  cost: {
    bottle: number;
    case: number;
  };
  tags: string[];
  details: string;
}
