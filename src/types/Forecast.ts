export interface Forecast {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}
