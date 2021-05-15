import {
  IMDB_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  TWITTER_URL
} from '../shared/constants';

export default class ExternalIds {
  constructor({ imdb_id, facebook_id, instagram_id, twitter_id }) {
    this.imdb = imdb_id;
    this.facebook = facebook_id;
    this.instagram = instagram_id;
    this.twitter = twitter_id;
  }

  getExternalUrl(externalIdName) {
    if (this[externalIdName] === null) return null;

    const urls = {
      imdb: `${IMDB_URL}${this.imdb}`,
      facebook: `${FACEBOOK_URL}${this.facebook}`,
      instagram: `${INSTAGRAM_URL}${this.instagram}`,
      twitter: `${TWITTER_URL}${this.twitter}`
    }

    return urls[externalIdName];
  }
};