class Place {
  constructor(id, title, imageuri, address, latitude, longitude) {
    this.id = id;
    this.title = title;
    this.imageuri = imageuri;
    (this.address = address),
      (this.latitude = latitude),
      (this.longitude = longitude);
  }
}

export default Place;
