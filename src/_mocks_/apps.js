import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const apps = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  appname: faker.name.findName(),
  team: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'revoked']),
  role: sample(['Team Owner', 'App Admin', 'Viewer'])
}));

export default apps;
