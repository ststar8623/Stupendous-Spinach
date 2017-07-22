const _ = require('underscore');

const calculateDistance = (lat1, lon1, lat2, lon2, unit)  => {
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') { dist = dist * 1.609344; }
  if (unit === 'N') { dist = dist * 0.8684; }
  return dist;
};


const filterOnlyAttributes = (arr) => {
  return arr.length > 0 ? arr.map((item) => {
    return item.attributes;
  }) : [];
};

exports.filterByDistance = (photosArr, currentLocationObj = {latitude: 37.8837339, longitude: -122.5090785} ) => {

  console.log("ran filter by distance", photosArr);

  //get current location properties
  const { latitude, longitude } = currentLocationObj;

  //filter for photos that are within 30 miles and add the distance to the object
  let result = photosArr.filter((photo) => {

    let distance = calculateDistance(Number(latitude), Number(longitude), Number(photo.latitude), Number(photo.longitude));
    
    photo.distance = Number(distance.toFixed(2));

    return distance < 10;

  });

  console.log("result from filter by distance", result);
  return result;

};

exports.addLikedProperty = (photosObj, likesObj) => {

  //pluck the unique photo ids from likes table for user
  let uniqueLikes = _.uniq(_.pluck(likesObj, 'photo_id'));

  //set liked property to true or false for each photo
  return photosObj.map((photo) => {
    _.contains(uniqueLikes, photo.id) ? photo.liked = true : photo.liked = false;
    return photo;
  });

};