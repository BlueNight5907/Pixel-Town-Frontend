import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const rooms = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  mapid: faker.datatype.number(10),
  quantity: faker.datatype.number(50),
  current: faker.datatype.number(50),
  description: faker.lorem.paragraph(2)
}));

export default rooms;
