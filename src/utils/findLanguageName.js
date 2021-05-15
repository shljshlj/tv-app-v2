import { languageCodes } from '../shared/languageCodes';

export default function findLanguageName(langCode) {
  const lang = languageCodes.find(langObj => langObj.code === langCode);

  if (!lang) return null;

  const langNames = lang.name;
  const langNamesArr = langNames.split(/;|,/);
  const langName = langNamesArr[0].trim();

  return langName;
}