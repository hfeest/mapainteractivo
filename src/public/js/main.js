var map = L.map('map-template').setView([-41.4676365,-72.9438977], 2);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();

// Geolocation
/*
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('You are Here!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});

*/
// Boton Precionado

function enviar (){
    //capura de datos de los clientes
    var nombre= document.getElementById('nombre').value;
    var lat= document.getElementById('lat').value;
    var lng= document.getElementById('lng').value;
    
    //arreglando datos para usarlos en crear un punto en el mapa
    

    //preparar json para enviar a servidor
    var enviar_json = {"nombre":nombre,"lat":lat,"lng":lng};
    socket.emit('userCoordinates', enviar_json);
    console.log("datos enviados");

}

// socket new User connected
/*socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup(coords.nombre);
  map.addLayer(newUserMarker);
}); 
*/

//Representar puntos que traemos de BBDD
socket.on('allUserCoordinates', (coords) => {
  
    /*
    const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
      
  })
  */
  
          for   (var contador = 0; contador<coords.length; contador++){
           ;

            var latitud = coords[contador].lat;
            var longitud = coords[contador].lng;
            var nombreS = coords[contador].nombre;

            if (latitud == null || longitud == null|| nombreS==0){
            }
            else{
              console.log(contador+" "+latitud+" "+longitud);
              const newUserMarker = new L.marker([latitud, longitud], {
                //icon: userIcon 
              });
              newUserMarker.bindPopup(nombreS);
              map.addLayer(newUserMarker);

            }
            
          }
          
  
}); 

map.addLayer(tile);

