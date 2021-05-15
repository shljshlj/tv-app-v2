import { PROFILE_IMG_M } from '../shared/constants';

export default class PreviewPerson {
  constructor({ id, name, character, order, credit_id, profile_path, gender }, episodeCount = null) {
    this.id = id;
    this.name = name;
    this.character = character;
    this.order = order;
    this.creditId = credit_id;
    this.episodeCount = episodeCount;
    this.profilePath = profile_path;
    this.gender = gender;
  }

  getProfileImgUrl() {
    if (!this.profilePath) return null;
    return `${PROFILE_IMG_M}${this.profilePath}`;
  }

  getGenderStr() {
    if (this.gender === 1) return 'female';
    return 'male';
  }
};