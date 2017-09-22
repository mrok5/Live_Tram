function FormatNumber(Number, Decimals) {
 Number = "" + Number;
 Decimals = "" + Decimals;
 var OriginalNumber = Number;
 var Sign = 1;
 var Pad = "";
 var Count = 0;

 if(parseFloat(Number)) {
  Number = parseFloat(Number);
 }
 else {
  Number = 0;
 }

 if((parseInt(Decimals,10)) || (parseInt(Decimals,10) == 0)) {
  Decimals = parseInt(Decimals,10);
 }
 else {
  Decimals = 2;
 }

 if(Number < 0) {
  Sign = -1;
  Number *= Sign;
 }

 if(Decimals < 0)
  Decimals *= -1;

 Number = "" + Math.floor(Number * Math.pow(10,Decimals + 1) + 5);

 if((Number.substring(1,2) == '.') || (Number=='NaN'))
  return(OriginalNumber);

 if(Number.length < Decimals +1)
 {
  for(Count = Number.length; Count <= Decimals; Count++)
  Pad += "0"
 }

 Number = Pad + Number;

 if(Decimals == 0) {
  Number = Number.substring(0, Number.length -1)
 }
 else {
  Number = Number.substring(0,Number.length - Decimals -1) +  "." +
          Number.substring(Number.length - Decimals -1, Number.length -1);
 }

 if(Sign == -1)
  Number = "-" + Number;

return(Number)
}

 // Calculate Distance
 function calculator(form,pos) {
  var degtorad = 0.01745329;
  var radtodeg = 57.29577951;

  var lat1h = form.lat
  var lat2h = pos.latLng.lat();
  var long1h = form.lon
  var long2h = pos.latLng.lng();

  var lat1 = parseFloat(lat1h);
  var lat2 = parseFloat(lat2h);
  var long1 = parseFloat(long1h);
  var long2 = parseFloat(long2h);

  console.log(lat1);
  console.log(lat2);
  /*
  if ((lat1h.lastIndexOf("S"))!=-1 || (lat1h.lastIndexOf("s"))!=-1)
    lat1 = (lat1 * (-1));
  if ((lat1h.lastIndexOf("W"))!=-1 || (lat1h.lastIndexOf("w"))!=-1)
    lat1 = (lat1 * (-1));

  if((lat2h.lastIndexOf("S"))!=-1 || (lat2h.lastIndexOf("s"))!=-1)
    lat2 = (lat2 * (-1));
  if((lat2h.lastIndexOf("W")!=-1) || (lat2h.lastIndexOf("w"))!=-1)
    lat2 = (lat2 * (-1));

  if((long1h.lastIndexOf("S")!=-1) || (long1h.lastIndexOf("s"))!=-1)
    long1 = (long1 * (-1));
  if((long1h.lastIndexOf("W")!=-1) || (long1h.lastIndexOf("w"))!=-1)
    long1 = (long1 * (-1));

  if((long2h.lastIndexOf("S")!=-1) || (long2h.lastIndexOf("s"))!=-1)
    long2 = (long2 * (-1));
  if((long2h.lastIndexOf("W")!=-1) || (long2h.lastIndexOf("w"))!=-1)
    long2 = (long2 * (-1));
*/

  var dlong = (long1 - long2);

  var dvalue = (Math.sin(lat1 * degtorad) * Math.sin(lat2 * degtorad))
   + (Math.cos(lat1 * degtorad) * Math.cos(lat2 * degtorad)
   * Math.cos(dlong * degtorad));

  var dd = Math.acos(dvalue) * radtodeg;

  var miles = (dd * 69.16);
  miles = (miles * 100)/100;
  var km = (dd * 111.302);
  km = (km * 100)/100;
  //form.result.value = FormatNumber(miles, 2);
  result = FormatNumber(km, 2);
  
  return result*1000;
 }
