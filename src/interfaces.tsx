export interface Episode {
  id: number,
  name: string,
  image: any,
  season: number,
  number: number,
  [propName: string]: any;
}
