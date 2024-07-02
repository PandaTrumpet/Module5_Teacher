export const releaseYearRegexp = /^\d{4}$/; //new Regexp()
export const typeList = ['film', 'serial'];

// тут провекри для схемы модели

export const movieFiledList = [
  '_id',
  'title',
  'director',
  'type',
  'releaseYear',
  'createdAt',
  'updatedAt',
];
