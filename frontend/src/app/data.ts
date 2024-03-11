import { Food } from './shared/models';

export const sampleFoods: Food[] = [
    {
    id:'1',
    name: 'Pizza Pepperoni',
    cookTime: '10-20',
    price: 10,
    favorite: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'https://raw.githubusercontent.com/nasirjd/foodmine-course/007095da4fef5c43d1f2f309c4a85b42677405ad/frontend/src/assets/food-1.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
    id:'2',
    name: 'Meatball',
    price: 20,
    cookTime: '20-30',
    favorite: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'https://raw.githubusercontent.com/nasirjd/foodmine-course/007095da4fef5c43d1f2f309c4a85b42677405ad/frontend/src/assets/food-2.jpg',
    tags: ['SlowFood', 'Lunch'],
  },
  {
    id:'3',
    name: 'Hamburger',
    price: 5,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'https://raw.githubusercontent.com/nasirjd/foodmine-course/007095da4fef5c43d1f2f309c4a85b42677405ad/frontend/src/assets/food-3.jpg',
    tags: ['FastFood', 'Hamburger'],
  },
  {
    id:'4',
    name: 'Fried Potatoes',
    price: 2,
    cookTime: '15-20',
    favorite: true,
    origins: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'https://raw.githubusercontent.com/nasirjd/foodmine-course/007095da4fef5c43d1f2f309c4a85b42677405ad/frontend/src/assets/food-4.jpg',
    tags: ['FastFood', 'Fry'],
  },
  {
    id:'5',
    name: 'Chicken Soup',
    price: 11,
    cookTime: '40-50',
    favorite: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'https://raw.githubusercontent.com/nasirjd/foodmine-course/007095da4fef5c43d1f2f309c4a85b42677405ad/frontend/src/assets/food-5.jpg',
    tags: ['SlowFood', 'Soup'],
  },
  {
    id:'6',
    name: 'Vegetables Pizza',
    price: 9,
    cookTime: '40-50',
    favorite: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'https://github.com/nasirjd/foodmine-course/blob/007095da4fef5c43d1f2f309c4a85b42677405ad/frontend/src/assets/food-1.jpg?raw=true',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  }
]