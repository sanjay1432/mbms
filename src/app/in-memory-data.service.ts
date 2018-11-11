import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './users';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
        {
          id:1,
          image:'man.jpg',
          firstName: 'Steve',
          lastName: 'Anderson',
          company:'',
          comment:''
        },
        {
          id:2,
          image:'man.jpg',
          firstName: 'Steve',
          lastName: 'Bardocz',
          company:'Savance',
          comment:'Be careful. Person very dangerous.'
        },
        {
          id:3,
          image:'no-image.jpg',
          firstName: 'Steve',
          lastName: 'Jhonson',
          company:'Apple',
          comment:''
        },
        {
          id:4,
          image:'no-image.jpg',
          firstName: 'Steve',
          lastName: 'Lucas',
          company:'Microsoft',
          comment:''
        },
        {
          id:5,
          image:'man.jpg',
          firstName: 'Steve',
          lastName: 'Wilko',
          company:'Travelocity',
          comment:''
        },
        {
          id:6,
          image:'man.jpg',
          firstName: 'man',
          lastName: 'Wilko',
          company:'ebay',
          comment:''
        }
      ];
      const visitors = [
        {
          id:1,
          image:'man.jpg',
          firstName: 'Carl',
          lastName: 'Carlson',
          company:'Google',
          comment:''
        },
        {
          id:2,
          image:'man.jpg',
          firstName: 'Steve',
          lastName: 'Anderson',
          company:'Savance',
          comment:''
        },
        {
          id:3,
          image:'no-image.jpg',
          firstName: 'Steve',
          lastName: 'Smith',
          company:'Apple',
          comment:''
        },
        {
          id:4,
          image:'no-image.jpg',
          firstName: 'Steve',
          lastName: 'Lucas',
          company:'Microsoft',
          comment:''
        },
        {
          id:5,
          image:'man.jpg',
          firstName: 'Steve',
          lastName: 'Wilko',
          company:'Travelocity',
          comment:''
        },
        {
          id:6,
          image:'man.jpg',
          firstName: 'man',
          lastName: 'Wilko',
          company:'Google',
          comment:''
        }
      ]
    return {users,visitors};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
