import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './users';
import { Visitor } from './visitors';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
        {
          id:1,
          image:'man.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Anderson',
          company:'',
          comment:''
        },
        {
          id:2,
          image:'man.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Bardocz',
          company:'Savance',
          comment:'Be careful. Person very dangerous.'
        },
        {
          id:3,
          image:'no-image.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Jhonson',
          company:'Apple',
          comment:''
        },
        {
          id:4,
          image:'no-image.jpg',
          imageurl:'',
          firstName: 'Steven',
          lastName: 'Smith',
          company:'Apple',
          comment:''
        },
        {
          id:5,
          image:'man.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Wilko',
          company:'Travelocity',
          comment:''
        },
        {
          id:6,
          image:'man.jpg',
          imageurl:'',
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
          imageurl:'',
          firstName: 'Carl',
          lastName: 'Carlson',
          company:'Google',
          comment:''
        },
        {
          id:2,
          image:'man.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Anderson',
          company:'Savance',
          comment:''
        },
        {
          id:3,
          image:'no-image.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Smith',
          company:'Apple',
          comment:''
        },
        {
          id:4,
          image:'no-image.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Lucas',
          company:'Microsoft',
          comment:''
        },
        {
          id:5,
          image:'man.jpg',
          imageurl:'',
          firstName: 'Steve',
          lastName: 'Wilko',
          company:'Travelocity',
          comment:''
        },
        {
          id:6,
          image:'man.jpg',
          imageurl:'',
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
  genId1(visitors: Visitor[]): number {
    return visitors.length > 0 ? Math.max(...visitors.map(visitor => visitor.id)) + 1 : 1;
  }
}
