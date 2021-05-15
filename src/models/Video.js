export default class Video {
  constructor({ name, key }) {
    this.title = name;
    this.videoId = key;
  }

  getImgUrl() {
    return `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`;
  }

  getVideoUrl() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }
}