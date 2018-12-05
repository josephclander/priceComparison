// 1Qrt	0.25Gal	1L
// 16oz	1lb	450g

let items = [];

class Item {
  constructor(food, store, quantity, unit, price) {
    this.food = food;
    this.store = store;
    this.unit = unit;
    this.quantity = quantity;
    this.price = price;
    items.push(this);
  }

  get pricePerUnit() {
    return (this.price / this.quantity).toFixed(2);
  }
}

// this was my original code - it would give the function of priceperunit as a property but not invoke it
// I tried again with classes to see if it would and it didn't - however it removed the ugly look of the function in the object

// function Item(food, store, quantity, unit, price) {
//   this.food = food;
//   this.store = store;
//   this.unit = unit;
//   this.quantity = quantity;
//   this.price = price;
//   this.pricePerUnit = () => {
//     return (this.price / this.quantity).toFixed(2);
//   };
//   items.push(this);
// }

// you should enter identical items with the same unit or the comparison will be incorrect
let a001 = new Item("Rice", "Amazon", 15, "lbs", 19.49);
let a002 = new Item("Rice", "WF", 2, "lbs", 3.99);
let a003 = new Item("Rice", "TJ's", 3, "lbs", 2.99);
let a004 = new Item("Beans", "TJ's", 15, "oz", 0.79);
let a005 = new Item("Beans", "WF", 15, "oz", 0.79);
let a006 = new Item("Dishwasher Tablets", "TJ's", 20, "tablets", 4.99);
let a007 = new Item("Red Lentils", "WF", 16, "oz", 2.99);
let a008 = new Item("Red Lentils", "TJ's", 16, "oz", 1.69);
let a009 = new Item("Milk", "TJ's", 2, "Qrt", 3.69);
let a010 = new Item("Milk", "WF", 2, "Qrt", 6.99);
let a011 = new Item("Milk", "Target", 2, "Qrt", 3.39);
let a012 = new Item("Pasta", "TJ's", 1, "lbs", 0.99);
let a013 = new Item("Olive Oil", "WF", 1, "L", 9.99);
let a014 = new Item("Beef Stew Meat", "TJ's", 1, "lbs", 7.99);
let a015 = new Item("Granola", "WF", 1, "lbs", 5.90);
let a016 = new Item("Granola", "TJ's", 1, "lbs", 2.99);
let a017 = new Item("Onions", "TJ's", 2, "lbs", 2.99);
let a018 = new Item("Onions", "Aldi", 3, "lbs", 1.49);
let a019 = new Item("Apples", "TJ's", 2, "lbs", 2.99);
let a020 = new Item("Apples", "Aldi", 3, "lbs", 2.29);
let a021 = new Item("Eggs", "TJ's", 12, "egg", 1.99);
let a022 = new Item("Grapes", "Aldi", 1, "lbs", 1.50);
let a023 = new Item("Grapes", "TJ's", 1, "lbs", 2.99);
let a024 = new Item("Chicken Breast", "TJ's", 1, "lbs", 2.69);
let a025 = new Item("Chicken Thighs", "Aldi", 1, "lbs", 1.29);
let a026 = new Item("Potatoes", "Aldi", 5, "lbs", 2.79);
let a027 = new Item("Mushrooms", "Aldi", 8, "oz", 1.19);


function groupFoods(array) {
  let list = [...array];
  let groupArrayList = [];
  let groupArray = [];
  let foodTypesArray = [];

  // make a list of the food types
  for (let i = 0; i < list.length; i++) {
    let foodType = list[i].food;
    foodTypesArray.push(foodType);
  }
  let foodTypeSet = new Set(foodTypesArray); // removes duplicate values
  foodTypeSet = [...foodTypeSet]; // turns a set into an iterable array

  // put foods of the same type into their own arrays within a complete array
  for (let i = 0; i < foodTypeSet.length; i++) {
    groupArray = [];
    groupArray = list.filter(x => x.food == foodTypeSet[i]);
    groupArrayList.push(groupArray);
  }
  return groupArrayList;
}

function lowestPriceInArray(array) {
  let list = [...array];
  let cheapestArray = [];
  for (let i = 0; i < list.length; i++) {
    let foodItemArray = list[i];
    let cheapestCounter = 0;
    let cheapestItem = foodItemArray[0].pricePerUnit;
    for (let j = 0; j < foodItemArray.length; j++) {
      let foodPricePerUnit = foodItemArray[j].pricePerUnit;
      if (foodPricePerUnit < cheapestItem) {
        cheapestItem = foodPricePerUnit;
        cheapestCounter = j;
      }
    }
    cheapestArray.push(foodItemArray[cheapestCounter]);
  }
  return cheapestArray;
}

function formatByFood(array) {
  let list = [...array];
  let message = "The best prices are: \n";
  for (let i = 0; i < list.length; i++) {
    message += `${list[i].food} at ${list[i].store}, ${list[i].quantity}${
      list[i].unit
    } for \$${list[i].price} \n`;
  }
  return message;
}

// a different version with more information but harder to go and shop like this
// function formatByStore(array) {
//     let list = [...array];
//     let order = list.sort((a, b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
//     let message = "The best prices are (in order of store): \n";
//     for (let i = 0; i < list.length; i++) {
//         message += `${list[i].food} at ${list[i].store}, ${list[i].quantity}${list[i].unit} for \$${list[i].price} \n`;
//     }
//     return message;
// }

function formatByStore(array) {
  let list = [...array];
  let storeNamesArray = [];
  for (let i = 0; i < list.length; i++) {
    let storeNames = list[i].store;
    storeNamesArray.push(storeNames);
  }
  let storeNamesSet = new Set(storeNamesArray); // removes duplicate values
  storeNamesSet = [...storeNamesSet]; // turns a set into an iterable array

  let message = "<h3>Get the cheapest products at the following stores:</h3>";

  for (let i = 0; i < storeNamesSet.length; i++) {
    message += `<p><strong>${storeNamesSet[i]}: </strong></p>`;
    let matchingStores = list.filter(x => x.store == storeNamesSet[i]);
    let foodList = [];
    
    for (let j = 0; j < matchingStores.length; j++) {
      foodList.push(matchingStores[j].food);
    }
    message += `<p>${foodList.join(", ")}.<p>`;
  }
  return message;
}
// to add more detail to this list means creating more arrays which implies the objects should have been turned into arrays
// to make this easier to iterate.

let grouped = groupFoods(items);
let lowestPrices = lowestPriceInArray(grouped);
let formattedFoodList = formatByFood(lowestPrices);
let formattedStoreList = formatByStore(lowestPrices);

let finalOutput = formatByStore(lowestPrices);

// add click event to the compare button
document.querySelector('#compare').addEventListener("click", () => {
  // Adding results to the DOM
  document.querySelector('.results').innerHTML = finalOutput;
})


