/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

const { animals } = data;
const { employees } = data;
const { prices } = data;
const { hours } = data;

function animalsByIds(...ids) {
  const foundAnimals = ids.map((idOfIds) => {
    const findById = animals.find(({ id }) => id === idOfIds);

    return findById;
  });

  return foundAnimals;
}

function animalsOlderThan(animal, age) {
  const isEveryResidentOlder = data.animals
    .find(animalOfAnimals => animalOfAnimals.name === animal) // Find the animal
    .residents //  Vccess the residents
    .every(resident => resident.age >= age); // Verify if every resident has the minimum age

  return isEveryResidentOlder;
}

function findEmployeeByName(employeeName) {
  const foundEmployee = employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);

  return foundEmployee;
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') {
    return {};
  }

  return findEmployeeByName(employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const listOfManagers = employees
    .map(({ managers }) => managers)
    .some(managerArray => managerArray.some(manager => manager === id));

  return listOfManagers;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newEmployee);
}

function showSpeciesNumberOfResidents() {
  const objectOfAnimals = {};

  animals.forEach((animal) => {
    objectOfAnimals[animal.name] = animal.residents.length;
  });

  return objectOfAnimals;
}

function animalCount(species) {
  if (species === undefined) {
    return showSpeciesNumberOfResidents();
  }

  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') {
    return 0;
  }

  const total = Object.keys(entrants).reduce(
    (acc, typeOfEntrant) =>
      acc + (entrants[typeOfEntrant] * prices[typeOfEntrant]),
    0,
  );

  return total;
}

// function animalMapByLocation() {
//   const locations = ['NE','NW', 'SE', 'SW']
//   const mapObject = {}

//   const animalsOfEachLocation = locations.map((location) => {
//     const filteredAnimalsByLocation = animals.filter((animal) => {
//       return animal.location === location
//     })

//     return filteredAnimalsByLocation
//   })

//   const mapByName = animalsOfEachLocation.map((location) => {
//     return location.map((animal) => {
//       return animal.name
//     })
//   })

//   locations.forEach((_, index) => {
//     mapObject[locations[index]] = mapByName[index]
//   })

//   return mapObject
// }

// function includeNames() {

//   const animalResidents = animals
//   .map((animal) => animal.residents)


//   const animalMap = animalMapByLocation()

//   const everyTypeOfAnimal = [
//     ...animalMap.NE,
//     ...animalMap.NW,
//     ...animalMap.SE,
//     ...animalMap.SW,
//   ];

//   const animalsAndTheResidents = everyTypeOfAnimal.map((animal) => {
//     const currAnimal = animals.find((animalOfAnimals) => {
//       return animalOfAnimals.name === animal
//     })

//     return {
//       [animal]: currAnimal.residents
//     }
//   })

//   console.log(animalsAndTheResidents)
// }

// includeNames()

function animalMap(options) {
  // if (typeof (options) === 'undefined') {
  //   return animalMapByLocation()
  // }

  // if (options.includeNames && options.includeNames === true) {
  //   const toBeReturned = includeNames()
  // }
}

function scheduleList() {
  const scheduleObject = {};

  Object.keys(hours).forEach(day => (scheduleObject[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`));

  scheduleObject.Monday = 'CLOSED';

  return scheduleObject;
}

function schedule(dayName) {
  if (typeof dayName === 'undefined') {
    return scheduleList();
  }

  const daySchedule = {
    [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`,
  };

  if (daySchedule.Monday) {
    daySchedule.Monday = 'CLOSED';
  }

  return daySchedule;
}

function returnAnimalId(employeeId) {
  const animalId = employees.find(employee => employee.id === employeeId)
    .responsibleFor[0];

  return animalId;
}

function returnAnimalObject(animalId) {
  const animalInfoObject = animals
    .find(animal => animal.id === animalId)
    .residents.reduce((acc, resident) => (resident.age > acc.age ? resident : acc));

  return animalInfoObject;
}

function oldestFromFirstSpecies(id) {
  const animalId = returnAnimalId(id);
  const animalInfoObject = returnAnimalObject(animalId);

  return Object.values(animalInfoObject);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((typeOfCustomer) => {
    prices[typeOfCustomer] =
      Math.round((prices[typeOfCustomer] * 100 * (100 + percentage)) / 100) /
      100;
  });
}

function employeeCoverageList() {
  const responsabilitiesList = {};
  const listOfEmployees = employees.map(
    employee => `${employee.firstName} ${employee.lastName}`,
  );

  employees
    .map(employee => employee.responsibleFor)
    .forEach((idList, index) => {
      const maped = idList.map(function (id) {
        const found = animals.find(animal => animal.id === id);

        return found.name;
      });

      responsabilitiesList[listOfEmployees[index]] = maped;
    });

  return responsabilitiesList;
}

function employeeCoverage(idOrName) {
  if (typeof idOrName === 'undefined') {
    return employeeCoverageList();
  }

  const employee = employees.find(function (employeeElement) {
    if (
      employeeElement.id === idOrName ||
      employeeElement.firstName === idOrName ||
      employeeElement.lastName === idOrName
    ) {
      return employeeElement;
    }

    return undefined;
  });

  const animalsIds = employee.responsibleFor;

  const animalsNames = animalsIds.map((animalId) => {
    const found = animals.find(animal => animal.id === animalId);

    return found.name;
  });

  return {
    [`${employee.firstName} ${employee.lastName}`]: animalsNames,
  };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
