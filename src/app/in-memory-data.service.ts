import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './users';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
        {
          id:1,
          image:'man.jpg',
          firstName: 'Anderson',
          lastName: 'Steve',
          company:'',
          comment:''
        },
        {
          id:2,
          image:'man.jpg',
          firstName: 'Bardocz',
          lastName: 'Steve',
          company:'Savance',
          comment:'Be careful. Person very dangerous.'
        },
        {
          id:3,
          image:'no-image.jpg',
          firstName: 'Jhonson',
          lastName: 'Steve',
          company:'Apple',
          comment:''
        },
        {
          id:4,
          image:'no-image.jpg',
          firstName: 'Lucas',
          lastName: 'Steve',
          company:'Microsoft',
          comment:''
        },
        {
          id:5,
          image:'man.jpg',
          firstName: 'Wilko',
          lastName: 'Steve',
          company:'Travelocity',
          comment:''
        },
        {
          id:6,
          image:'man.jpg',
          firstName: 'Wilko',
          lastName: 'man',
          company:'ebay',
          comment:''
        }
      ]
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
