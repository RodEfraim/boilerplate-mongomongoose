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
  //favoriteFoods: [String],
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

/**
 * Part #6) Use model.findOne() to Return a Single Matching Document from Your Database
 * Model.findOne() behaves like Model.find(), but it returns only one document (not an array), even if there
 * are multiple items. It is especially useful when searching by properties that you have declared as unique.
 * Modify the findOneByFood function to find just one person which has a certain food in the person's favorites,
 * using Model.findOne() -> Person. Use the function argument food as search key.
 */
const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/**
 * Part #7) Use model.findById() to Search Your Database By _id
 * When saving a document, MongoDB automatically adds the field _id, and set it to a unique alphanumeric key.
 * Searching by _id is an extremely frequent operation, so Mongoose provides a dedicated method for it.
 * Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use
 * the function argument personId as the search key.
 */
const findPersonById = (personId, done) => {

  Person.findOne(personId, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/**
 * Part #8) Perform Classic Updates by Running Find, Edit, then Save
 * Modify the findEditThenSave function to find a person by _id (use any of the above methods) with the parameter
 * personId as search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()).
 * Then - inside the find callback - save() the updated Person
 */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, person){

    if(err) return console.error(err);
    //done(null, data);
    
    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, data){
      if(err) return console.error(err);
      done(null, data)
    })

  });
};

/**
 * Part #9) Perform New Updates on a Document Using model.findOneAndUpdate()
 * Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function
 * parameter personName as the search key
 * 
 * Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function
 * parameter personName as the search key.
 */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
  
};

/**
 * Part #10) findByIdAndRemove and findOneAndRemove are like the previous update methods.
 * They pass the removed document to the db. As usual, use the function argument personId as the search key.
 * 
 * Modify the removeById function to delete one person by the person's _id. You should use one of the methods
 * findByIdAndRemove() or findOneAndRemove().
 */
const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/**
 * Part #11) Delete Many Documents with model.remove()
 * Modify the removeManyPeople function to delete all the people whose name is within the variable
 * nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.
 * 
 * he Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the
 * operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use
 * it in tests.
 */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name : nameToRemove}, function(err,data){
    if(err) return console.error(err);
    done(null, data);
  });
};

/**
 * Part #12) Chain Search Query Helpers to Narrow Search Results
 * If you don’t pass the callback as the last argument to Model.find() (or to the other search methods), the
 * query is not executed. You can store the query in a variable for later use. This kind of object enables
 * you to build up a query using chaining syntax. The actual db search is executed when you finally chain
 * the method .exec(). You always need to pass your callback to this last method. There are many query helpers,
 * here we'll use the most commonly used
 * 
 * Modify the queryChain function to find people who like the food specified by the variable named foodToSearch.
 * Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(),
 * .select(), and then .exec(). Pass the done(err, data) callback to exec().
 * 
 */
const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Model.find({name: "Leah"})  <-- TO create but not execture a find query.
  // var findQuery = YourModel.find({ name: "Leah" }); <-- Or store the find query into variable for later use.
  // yourArray.sort({ age: 1 }); <-- Here: 1 for ascending	order and -1 for descending order.
  // yourArray.limit(5); <-- To limit an array's size. Returns array which has 5 items in it.
  // yourArray.select({ name: 0, age: 1 }); <-- To hide certain property from the result. Here: 0 means false and
  // thus hide name property; <-- 1 means true so age property will show.
  // YourQuery.exec(function(err, docs){}); <-- Callback needed to execute the query.

  Person.find({favoriteFoods : foodToSearch}).sort({name : 1}).limit(2).select({age: 0}).exec(function(err,data){
    if(err) return console.error(err);
    done(null, data);  });
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
