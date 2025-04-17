export const mapCakeSize = {
    1: 'Бенто',
    2 : 'Стандарт',
    3 : 'Большой',
} as const;

export const cakeSizes = Object.entries(mapCakeSize).map(([value, name]) => ({
    name,
    value,
  }));

  export type CakeSize = keyof typeof mapCakeSize;