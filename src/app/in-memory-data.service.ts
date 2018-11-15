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
      ];
      const hosts =[{
        "id": 1,
        "firstName": "Berty",
        image:'man.jpg',
        "lastName": "Connal",
        "email": "bconnal0@stumbleupon.com",
        "gender": "Male",
        "status": "#8FC600"
      }, {
        "id": 2,
        "firstName": "Hamlin",
        "lastName": "Meardon",
        image:'woman.jpg',
        "email": "hmeardon1@who.int",
        "gender": "Female",
        "status": "#8FC600"
      }, {
        "id": 3,
        "firstName": "Mariel",
        "lastName": "MacGraith",
        image:'man.jpg',
        "email": "mmacgraith2@techcrunch.com",
        "gender": "Male",
        "status": "#169AED"
      }, {
        "id": 4,
        "firstName": "Viki",
        "lastName": "Youings",
        image:'man.jpg',
        "email": "vyouings3@slideshare.net",
        "gender": "Male",
        "status": "#8FC600"
      }, {
        "id": 5,
        "firstName": "Lira",
        "lastName": "Matteris",
        image:'woman.jpg',
        "email": "lmatteris4@state.gov",
        "gender": "Female",
        "status": "#B41F1F"
      }, {
        "id": 6,
        "firstName": "Nicky",
        "lastName": "Lorincz",
        image:'man.jpg',
        "email": "nlorincz5@woothemes.com",
        "gender": "Male",
        "status": "#169AED"
      }, {
        "id": 7,
        "firstName": "Pansy",
        "lastName": "Iacovacci",
        image:'man.jpg',
        "email": "piacovacci6@rediff.com",
        "gender": "Male",
        "status": "#8FC600"
      }, {
        "id": 8,
        "firstName": "Hayley",
        "lastName": "Bursnoll",
        image:'man.jpg',
        "email": "hbursnoll7@angelfire.com",
        "gender": "Male",
        "status": "#B41F1F"
      }, {
        "id": 9,
        "firstName": "Smitty",
        "lastName": "Ogelbe",
        image:'man.jpg',
        "email": "sogelbe8@google.com.br",
        "gender": "Male",
        "status": "#B41F1F"
      }, {
        "id": 10,
        "firstName": "Cherie",
        "lastName": "Galliford",
        image:'man.jpg',
        "email": "cgalliford9@nasa.gov",
        "gender": "Male",
        "status": "#169AED"
      }, {
        "id": 11,
        "firstName": "Dougie",
        "lastName": "Tedridge",
        image:'man.jpg',
        "email": "dtedridgea@bloomberg.com",
        "gender": "Male",
        "status": "#B41F1F"
      }, {
        "id": 12,
        "firstName": "Dorry",
        "lastName": "Biggin",
        image:'man.jpg',
        "email": "dbigginb@mail.ru",
        "gender": "Male",
        "status": "#8FC600"
      }, {
        "id": 13,
        "firstName": "Jenny",
        "lastName": "Johantges",
        image:'woman.jpg',
        "email": "jjohantgesc@marketwatch.com",
        "gender": "Female",
        "status": "#B41F1F"
      }, {
        "id": 14,
        "firstName": "Reidar",
        "lastName": "Coope",
        image:'woman.jpg',
        "email": "rcooped@phpbb.com",
        "gender": "Female",
        "status": "#B41F1F"
      }, {
        "id": 15,
        "firstName": "Genvieve",
        "lastName": "Sumnall",
        image:'woman.jpg',
        "email": "gsumnalle@wired.com",
        "gender": "Female",
        "status": "#8FC600"
      }, {
        "id": 16,
        "firstName": "Reuben",
        "lastName": "Mallen",
        image:'man.jpg',
        "email": "rmallenf@printfriendly.com",
        "gender": "Male",
        "status": "#169AED"
      }, {
        "id": 17,
        "firstName": "Kristen",
        "lastName": "Leversuch",
        image:'woman.jpg',
        "email": "kleversuchg@google.it",
        "gender": "Female",
        "status": "#B41F1F"
      }, {
        "id": 18,
        "firstName": "Roma",
        "lastName": "Myring",
        image:'man.jpg',
        "email": "rmyringh@state.gov",
        "gender": "Male",
        "status": "#B41F1F"
      }, {
        "id": 19,
        "firstName": "Bell",
        "lastName": "Jehaes",
        image:'man.jpg',
        "email": "bjehaesi@blogs.com",
        "gender": "Male",
        "status": "#169AED"
      }, {
        "id": 20,
        "firstName": "Odele",
        "lastName": "O'Fallowne",
        image:'woman.jpg',
        "email": "oofallownej@1688.com",
        "gender": "Female",
        "status": "#B41F1F"
      }, {
        "id": 21,
        "firstName": "Eden",
        "lastName": "Connor",
        image:'woman.jpg',
        "email": "econnork@statcounter.com",
        "gender": "Female",
        "status": "#8FC600"
      }]
    return {users,visitors,hosts};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
  genId1(visitors: Visitor[]): number {
    return visitors.length > 0 ? Math.max(...visitors.map(visitor => visitor.id)) + 1 : 1;
  }
}
