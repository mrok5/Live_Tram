      var apikey = "b75ffbcb-fcbb-4eca-96d7-975fd6e5e5d6";
      var tramWayApi = "https://api.um.warszawa.pl/api/action/wsstore_get/?id=c7238cfe-8b1f-4c38-bb4a-de386db7e776&apikey="+apikey;
      var map;
      var markers = [];
      var new_marker; 
      var table = [];
      var tLat = [];
      var tLon =[];
      var PlanCoordinates=[];
      var flightPath = [];
      var lineSymbol;
      var time;
      var tramways=[];
      var startPoint = {lat: 52.2558479, lng: 20.9820652};
      var nrLini = "7";
	  var mapUpdate;
      var marksDelete;
      var linesDelete;
      var coordDelete;
      var LowFloor = false;
	  var myPos;
	  var tramStops =[];
	  var directionsDisplay;
	  var directionsService;
	  var flaga = false;
     
      function stopUpdate(){
    	  clearInterval(mapUpdate);
		  clearInterval(marksDelete);
		  clearInterval(linesDelete);
		  clearInterval(coordDelete );
		  console.log("Stopped");
      }
      
      function setTramwayNumber(nr){
    	  
    	 // $("#start").show();
    	  //("#stop").hide();
		  
    	  stopUpdate();
		  
		  console.log("clearInterval");

    	  nrLini = nr;
    	  tramways = [];
    	  deleteMarkers();
    	  removeLineCoord();
		  
		 // calcRoute(nrLini);
    	  
    	  createTramways(nrLini);
    	  updateData(nrLini);
    	  myFunction();

    	  if (!flaga) {
    	      //alert("strzałki pokazujące kierunki jazdy tramwajów pojawią się po 30sek")
    	      $(function () {
    	          $("#info").dialog("open");
    	      });
    	  }

    	  flaga = true;
      }
      
      function startApp(){
    	  updateData(nrLini);
    	  myFunction();
      }
      
      function CenterControl(controlDiv, map) {

          // Set CSS for the control border.
          var controlUI = document.createElement('label');
          controlDiv.appendChild(controlUI);
		  // select 
		  var controlSelect = document.createElement('select');
		  controlSelect.onchange = function(){
			  setTramwayNumber(this.value);
			  };
		  
		  
		  controlUI.appendChild(controlSelect);
		  
		  //options
		   controlSelect.add(new Option('Wybierz Tramwaj', ''));
		   for(var i=1;i<36;i++){
               if(i==8 || i==12 || i==16 || i==19 || i==21 || i==29 || i==30 || i==32 || i==34 ){
                    //console.log("nie ma lini nr:"+i);
               }else{
                    controlSelect.add(new Option('linia nr '+i, i));
                }
		   }

          // Setup the click event listeners: simply set the map to Chicago.
          controlUI.addEventListener('click', function() {
            //map.setCenter(startPoint);
            console.log("klik dziala");
			//myPosition();
			//console.log(myPos);
           // myFunction();
		   //calcDist(tramways,myPos);
          });

        }
      
         

      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          streetViewControl: false,
          center: startPoint,
          mapTypeId: 'roadmap',
		  disableDefaultUI: true,
		  zoomControl: true,
        });
        
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
       var centerControlDiv = document.createElement('div');
       var centerControl = new CenterControl(centerControlDiv, map);

          //select button
       centerControlDiv.index = 1;
       map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
       centerControlDiv.style['padding'] = '5px';
       centerControlDiv.style['marginRight']= '10%';

       // createTramways(nrLini);
        addYourLocationButton(map);
       // updateData();
	   		//	getTramStops();
		//event		
    //  map.addListener('click', function(event) {
					//find_closest_marker(event);
					//console.log("click; "+event.latLng.lat());
					//console.log(event.latLng.lng());
					//calcRoute(event);
    //    });
	//	 directionsService = new google.maps.DirectionsService();
	//	 directionsDisplay = new google.maps.DirectionsRenderer();
	//	 directionsDisplay.setMap(map);
		 
      }

      var isOnline = function () {
          var online = navigator.onLine;
          return online;
      }

	  var myPosition = function(){
	   if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var myPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
		  });
	   }
	  }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
        //console.log("tutaj");
      }
      
      function setLines(map) {
          console.log("ilosc lini:"+flightPath.length)
        for (var i = 0; i < flightPath.length; i++) {
          flightPath[i].setMap(map);
        }
        //console.log("tutaj");
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      var deleteMarkers = function() {
        //console.log(markers);
        clearMarkers();
        markers = [];
        console.log("markers deleted");
        //createMarks();
        //removeLineCoord();
      }
      
      var removeLine = function() {
       // for(var i=0;i<tramways.length;i++){
         //console.log("new test:"+tramways[i].flightPath );
       //  tramways[i].flightPath.setMap(null);
      //  }
         setLines(null);
        
         console.log("lines removed");
       //  removeLineCoordinates();
      }
      
      var removeLineCoord = function(){
    	 setLines(null);
         flightPath = [];
         for(var i=0;i<tramways.length;i++){
            tramways[i].PlanCoordinates = [];
     }
         console.log("line coordinates removed");
      }
      
      var updateData = function(){
           table = []; tLat = []; tLon =[];
           getData(nrLini);
           console.log("start");
     } 
      
       
       function myFunction() {
            mapUpdate = setInterval(updateData, 20005);
            marksDelete = setInterval(deleteMarkers,20000);
            linesDelete = setInterval(removeLine,19990);
            coordDelete = setInterval(removeLineCoord, 60000);
        }

       function animateCircle(line) {
          var count = 0;
          window.setInterval(function() {
            count = (count + 1) % 200;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        }, 20);
      }
      
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
      function createMarks(nr){
    	  var myIcon;
          for(var i=0;i<tLat.length;i++){
        	  if(tramways[i].LowFloor){
        		  myIcon = 'img/newTram.png';
        	  }else{
        		  myIcon = 'img/oldTram.png'; 
        	  }
                        new_marker = new google.maps.Marker({
                            position: new google.maps.LatLng(tLat[i], tLon[i]),
                            map: map,
                            title: 'czas:'+time,
                            icon: myIcon,
                           // label: nr
                        });
                       markers.push(new_marker); 
                   }
                   console.log("marks created");
      }
      
      function createLines(){
		  lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };
		  
                   for(var i=0;i<tLat.length;i++){     
                       tramways[i].PlanCoordinates.push({
                           lat:parseFloat(tLat[i]), lng:parseFloat(tLon[i])
                       });
                       
                           var polyline= new google.maps.Polyline({
                            path: tramways[i].PlanCoordinates,
                            icons: [{
                            icon: lineSymbol,
                            offset: '100%'
                          }],
                            geodesic: true,
                            strokeColor: getRandomColor(),
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                          });
                          flightPath[i]=polyline;

                         // console.log(flightPath[i]);
                          animateCircle(flightPath[i]);
                      }
                      setLines(map);
                      console.log("lines created")
      }
	  
	  
/**
 * Generic array sorting
 *
 * @param property
 * @returns {Function}
 */
var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};
      
      function getData(nr){
    	  var j = 0;
          $.getJSON(tramWayApi, function(json){
			  if(json == []){
				  alert("Błąd źrodła danych");
				  return;
			  }
			  console.log(json.result[0]);
			  var testX = json.result.sort(sortByProperty('Lat'));
			  testX = testX.sort(sortByProperty('Brigade'));
			  //console.log(testX);
              $.each(testX, function(i, v) {
				 // console.log(v);
                        if (v.FirstLine == parseInt(nr) ) {
                        // console.log(i);
                         time = v.Time;
                         time = time.substring(11,19);
                         table.push(i);
                         tLat.push(v.Lat);
                         tLon.push(v.Lon);  
                         tramways[j].LowFloor = v.LowFloor;
                        // console.log(j+":"+v.LowFloor);
                         j++;
                       //  console.log("nr:"+v.FirstLine);
                       // console.log("szer geo:"+  v.Lat);
                       // console.log("dlug test geo:"+  v.Lon);
                       // console.log("data aktualizacji: "+ v.Time);
						//console.log("brygada: "+v.Brigade);
                            return;
                       }  
            });   
            console.log("ilosc lini nr: "+nr+" = "+table.length);
			if(table.length == 0){
				  alert("Blad źródła danych ( api ZTM )");
				  return;
			  }
            createMarks(nrLini);
            createLines();
        });
      }
      
      function createTramways(nr){
        /*  $.getJSON(tramWayApi, function(json){
              $.each(json.result, function(i, v) {
                        if (v.FirstLine == parseInt(nr)) {
                             table.push(i);
                  }  
            });   
            console.log("test "+ table.length);
			*/
            for(var i=0;i<40;i++){ 
                tramways[i] = {
                    id:i,
                    PlanCoordinates:[],
                    LowFloor:false
                };
            }
       // });
	    console.log("uworzono tramwaje");
      }
	  
	  //distance
	  function calcDist (tram,pos){
		  console.log("test len "+tram.length);
		  for(var i=0;i<2;i++){
				console.log( calculator(tram[i].PlanCoordinates,pos) );
				console.log(tram[i].PlanCoordinates);
		  }
	  }
	  
	  function getTramStops(){
		  var stopCord;
		   $.getJSON("tramStops.json", function(json){
			   //console.log(json.elements[0].tags.name);
			  $.each(json.elements, function(i, v) {
				  stopCord = {tags:v.tags, lat:v.lat, lon:v.lon}
				  tramStops.push(stopCord);
			     // console.log(i+":"+v.tags.name);
			   });
				//console.log(v[1].tags.name);
		   });
	  }
	  
function rad(x) {return x*Math.PI/180;}
function find_closest_marker( event ) {
	//console.log("len:"+tramStops.length);
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
	console.log(lat+" "+lng);
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( i=0;i<tramStops.length; i++ ) {
		//console.log(i);
        var mlat = tramStops[i].lat;
        var mlng = tramStops[i].lon;
		//console.log(i+": "+tramStops[i].tags.name);
        var dLat  = rad(mlat - lat);
        var dLong = rad(mlng - lng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
		console.log(tramStops[i].tags.name+":"+d);
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }
	//console.log(closest+" res:"+tramStops[closest].tags.name);
	//console.log(calculator(tramStops[closest],event)+" m" );
    //alert(tramStops[closest].tags.name);
}

 var calcRoute = function() {
	// nrTram = nrLini;
	// if(nrTram == 7 ){
		 var lat1 = 52.2581052;
         var lng1 = 21.0596584;
		 
		 var lat2 = 52.1759779;
         var lng2 = 20.9439176;
	// }
	//var lat = event.latLng.lat();
   // var lng = event.latLng.lng();
    var start = new google.maps.LatLng(lat1, lng1);
    //var end = new google.maps.LatLng(38.334818, -181.884886);
    var end = new google.maps.LatLng(lat2, lng2);
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }		

 var removeRoute = function(){
	   directionsDisplay.setMap(null);
  }
  
 var internetConection = $(function () {
     if (!isOnline()) {
         $("#alert").dialog("open");
     }
 });

 internetConection;

