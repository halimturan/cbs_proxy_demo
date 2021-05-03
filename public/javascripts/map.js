mapboxgl.accessToken = 'pk.eyJ1IjoiaGFsaW10dXJhbiIsImEiOiJjamQybTR5d2Ywb2xzMzNvcXpqdTg3OGVyIn0.WODE8x7l6SGSjh0jinS1dQ';

const csrf_token = $('#csrf_input').val();

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [29.04064178, 41.06019740], // starting position [lng, lat]
    zoom: 10,
    transformRequest: (url, resourceType)=> {
        if(url.startsWith('http://localhost:3000') && resourceType === 'Source') {
            return {
                url: url,
                headers: { "X-CSRF-Token": csrf_token },
                method: "POST"
            }
        }
    }
});

map.on('load', function () {
// Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

// The 'building' layer in the Mapbox Streets
// vector tileset contains building height data
// from OpenStreetMap.
    map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

// Use an 'interpolate' expression to
// add a smooth transition effect to
// the buildings as the user zooms in.
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },

        labelLayerId
    );
});

function addDataToMap(url, icon_url) {
    map.loadImage(icon_url, function (error, image) {
        if (error) throw error;
        if (!map.getSource(`source1`)) {
            map.addSource(`source1`, {
                type: 'geojson',
                data: url
            });
        }

        map.addImage(`icon1`, image);
        map.addLayer({
            "id": `layer1`,
            "type": "symbol",
            "source": `source1`,
            "maxzoom": 22,
            "minzoom": 0,
            "layout": {
                "icon-image": `icon1`,
                "text-field": "{ADI}",
                "text-font": ["Open Sans Semibold"],
                "text-offset": [0, 1.6],
                "text-anchor": "top"
            },
            "paint": {
                "text-color": "#000"
            },
            'filter': ['==', '$type', 'Point']
        });
    });
}