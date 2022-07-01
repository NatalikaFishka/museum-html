mapboxgl.accessToken = 'pk.eyJ1IjoidGltdXJraGFraW1vdjEiLCJhIjoiY2w1Mmg2bXMxMGZocDNkbnU2M3R6a2pvaCJ9.lPVHntdKA6nmeLnuLZ92Tg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3358312580815945, 48.86099131763282],
    zoom: 15.8,
    projection: 'globe'
});

map.on('style.load', () => {
    map.setFog({});
});


const louvre = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([2.336358, 48.860892])
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
    map.resize();
});
