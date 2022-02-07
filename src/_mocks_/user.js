import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  email: faker.internet.email(),
  birthday: faker.date.between('1980-01-01', '2021-12-31').toLocaleDateString('vi-VN'),
  isVerified: faker.datatype.boolean(),
  status: sample(['online', 'offline'])
}));

export default users;
