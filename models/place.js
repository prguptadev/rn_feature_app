class Place {
  constructor(id, title, imageuri, latitude, longitude) {
    this.id = id;
    this.title = title;
    this.imageuri = imageuri;
    (this.latitude = latitude), (this.longitude = longitude);
  }
}

export default Place;
