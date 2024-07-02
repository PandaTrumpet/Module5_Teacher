import { sortOredrList } from '../constants/index.js';
const parseSortParams = ({ sortBy, sortOrder }, filedList) => {
  const parsedSortOrder = sortOredrList.includes(sortOrder)
    ? sortOrder
    : sortOredrList[0];

  const parsedSortBy = filedList.includes(sortBy) ? sortBy : filedList[0];
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
