mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [80.4365, 16.3067], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
});
console.log(coordinates);
// const marker = new mapboxgl.Marker({color: "black"})
//     .setLngLat(coordinates)
//     .addTo(map);
