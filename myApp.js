/**
 * Tutorial to set up set up a hosted database on
 * MongoDB Atlas: https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/
 */
require('dotenv').config();

/**
 * PART #1) Install and set up Mongoose
 */
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URI);
// TODO: See if you can replace the enitre string URL with the .env variable instead.
//mongoose.connect("mongodb+srv://mongodbMaster:mongodb115@cluster0.iasnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


/**
 * PART #2) Create a Model
 * Schemas are building block for Models. They can be nested to create complex models, but in this case 
 * we'll keep things simple. A model allows you to create instances of your objects, called documents.
 * 
 * + Create a personSchema with its name, age, favoriteFoods prototype.
 * + Now, create a model called Person from the personSchema
 * 
 * Useful Links: 
 * https://mongoosejs.com/docs/index.html
 * https://mongoosejs.com/docs/schematypes.html#arrays
 */
const { Schema } = mongoose;

const personSchema = new Schema({
  //name:  String, // String is shorthand for {type: String}
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [{ type: String}]
  //favoriteFoods: [],
});

const Person = mongoose.model('Person', personSchema);

const person1 = new Person({ name: 'Rodrigo' });
console.log(person1.name);
const person2 = new Person({ name: 'Albert' });
console.log(person2.name);


// Arrays like this used to pass onto createManyPeople function.
var arrayOfPeople = [
  {name: "Susi Etinguer", age: 62, favoriteFoods:  ["Hamburger", "Pizza"]},
  {name: "Vivi Efraim", age: 57, favoriteFoods:  ["Steak", "Salad"]},
  {name: "Gabriel Efraim", age: 58, favoriteFoods:  ["Beans", "Pizza"]}];


/**
 * PART #3) Create and Save a Record of a Model
 * Within the createAndSavePerson function, create a document instance using the Person model constructor
 * you built before. Pass to the constructor an object having the fields name, age, and favoriteFoods.
 * Their types must conform to the ones in the personSchema. Then, call the method document.save() on
 * the returned document instance. 
 */
const createAndSavePerson = (done) => {

  var Beni = new Person({name: "Beni", age: 62, favoriteFoods:  ["Hamburger", "Pizza"]});

  Beni.save(function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/**
 * Part #4) Create Many Records with model.create()
 * Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data.
 * Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and
 * saves them all in the db.
 */
const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/**
 * Part #5) Use model.find() to Search Your Database.
 * Modify the findPeopleByName function to find all the people having a given name, using Model.find().
 * In its simplest usage, Model.find() accepts a query document (a JSON object) as the first argument, then a
 * callback. It returns an array of matches. It supports an extremely wide range of search options.
 */
const findPeopleByName = (personName, done) => {

  Person.find({name: personName}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
