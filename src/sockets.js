module.exports = io => {
  const geo_Punto = require('./bbdd').geo_Punto;
  io.on('connection', socket => {

    console.log('new socket connected');
           //consultar todos los puntos en bbdd y enviarlos
           geo_Punto.find().exec(obtener_puntos);
           function obtener_puntos(err, geo_dot){
               if(err){console.log(err);
               }
               
               //pruebas para hacerlo en cliente
               
     
               
               //termino de pruebas para pegarlo en cliente
               socket.broadcast.emit('allUserCoordinates', geo_dot);
               socket.emit('allUserCoordinates', geo_dot);
               console.log("datos enviados a todos los usuarios");
             }
    
        //recibe datos del cliente por coords con evento nombre  userCoordinates
    socket.on('userCoordinates', (coords) => { 
      //console.log(coords);
      //console.log("desde el server");
      console.log(coords.nombre);

      var geo_puntot = new geo_Punto({nombre: coords.nombre, lat: coords.lat, lng: coords.lng});
     
        geo_puntot.save(function(){

          console.log("datos guardados");
        });
        
          //consultar todos los puntos en bbdd y enviarlos
      geo_Punto.find().exec(obtener_puntos);
      function obtener_puntos(err, geo_dot){
          if(err){console.log(err);
          }
          
          //pruebas para hacerlo en cliente
          

          
          //termino de pruebas para pegarlo en cliente
          //socket.broadcast.emit('allUserCoordinates', geo_dot);
          socket.emit('allUserCoordinates', geo_dot);
          console.log("datos enviados a todos los usuarios");
        }


        //socket.broadcast.emit('allUserCoordinates', coords);


      //socket.broadcast.emit('newUserCoordinates', coords); //enviar lo que acaba de recibir a todos los clientes conectados
    });
  });
};
