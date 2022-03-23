import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const teams = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  teamname: faker.random.word(),
  company: faker.company.companyName(),
  domain: faker.internet.domainName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'inactive']),
  role: sample(['Team Owner', 'App Admin', 'Viewer'])
}));

export default teams;
