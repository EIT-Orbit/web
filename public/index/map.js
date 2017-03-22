var currentLayer;

function initMap(){
    var map = L.map('mapid').setView([63.417497332879755, 10.404267311096193], 16);

    L.tileLayer('https://api.mapbox.com/styles/v1/petob/ciz6y0i7m001u2ro19pxb67vd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGV0b2IiLCJhIjoiY2l6NnhwODdvMDAwMDJxa3kzN3M3bmJ0MCJ9.clU5Cwy8LbD9rqPv4VgC7Q', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
    }).addTo(map);

    // Initialize the FeatureGroup to store editable layers
    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        position: 'topleft',
        draw: {
            polyline: false,
            polygon: {
                allowIntersection: false,
                showArea: true,
                drawError: {
                    color: '#000000',
                    timeout: 1000
                },
                shapeOptions: {
                    color: '#000000'
                }
            },
            circle: false,
            marker: false
        },
        edit: {
            featureGroup: drawnItems,
            remove: false
        }
    });
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType;
        currentLayer = e.layer;
        if (type === 'marker') {
            // Do marker specific actions
        }
        // Do whatever else you need to. (save to db; add to map etc)
        drawnItems.addLayer(currentLayer);
    });

    map.on(L.Draw.Event.DRAWSTART, function(e){
        clearLayers();
    });
}

function loadFence(fence){
  clearLayers();
  currentLayer = activeLayer = L.geoJson(fence.geoJSON, {});
  drawnItems.addLayer(currentLayer);
  fenceModal.hide();
}

function clearLayers(){
    currentLayer = undefined;
    drawnItems.clearLayers();
}
