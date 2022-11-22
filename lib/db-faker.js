import { faker } from '@faker-js/faker/locale/de';

export const RandomUser = [];
export const RandomSite = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    userName: faker.internet.userName(),
    userEmail: faker.internet.email(),
    useravatar: faker.image.avatar(),
    url: faker.internet.url()
  };
}

export function createRandomSite() {
  return {
    siteId: faker.datatype.uuid(),
    siteName: faker.internet.userName(),
    siteurl: faker.internet.url(),
    siteAt: faker.date.past()
  };
}

Array.from({ length: 10 }).forEach(() => {
  RandomSite.push(createRandomSite());
});

// export default [
//   {
//     id: 'pRTMMovUKZx16npaMCET',
//     createdAt: '2020-05-21T04:01:31.694Z',
//     url: 'https://react2025.com',
//     userId: 'WG2acuO8oqW3Np0EXCSn28E19Rs2',
//     name: 'React 2025'
//   },
//   {
//     id: 'zckViEhZSAZD84lUEYyc',
//     createdAt: '2020-05-21T04:01:31.694Z',
//     url: 'http://masteringnextjs.com/',
//     userId: 'WG2acuO8oqW3Np0EXCSn28E19Rs2',
//     name: 'Mastering Next.js'
//   }
// ];
