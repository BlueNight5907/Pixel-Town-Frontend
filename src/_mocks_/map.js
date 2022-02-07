import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockMapCover } from '../utils/mockImages';

const MAP_NAME = ['Map 1', 'Map 2', 'Map 3', 'Map 4', 'Map 5'];

const maps = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockMapCover(setIndex),
    name: MAP_NAME[index]
  };
});

export default maps;
