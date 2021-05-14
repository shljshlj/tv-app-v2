import { countryCodes } from '../shared/countryCodes';

export default function findCountryName(countryCode) {
  const country = countryCodes.find(countryObj => countryObj['alpha-2'].toLowerCase() === countryCode.toLowerCase());

  let countryName;
  switch (country.name) {
    case 'United States of America':
      countryName = 'USA';
      break;
    case 'United Kingdom of Great Britain and Northern Ireland':
      countryName = 'United Kingdom';
      break;
    default:
      countryName = country.name;
  }

  return countryName;
}