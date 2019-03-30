$(document).ready(function () {


  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqmUpbmR_CpPZg4Fx6PsYnXdiEKJ52uek",
    authDomain: "inventory-cc9b8.firebaseapp.com",
    databaseURL: "https://inventory-cc9b8.firebaseio.com",
    projectId: "inventory-cc9b8",
    storageBucket: "inventory-cc9b8.appspot.com",
    messagingSenderId: "560743834764"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  const invDB = { //object to track uniqueIDs for each beer TODO update placeholder with beer type
    B0854141006410: '-LarLGv5K2cwCBNSFMfg',
    B0860000660402: '-LarLGv8o4ozan6yH0W7',
    B0853249004373: '-LarLGv9tfyPEicnD6Mw',
    B0859490002427: '-LarLGv9tfyPEicnD6Mx',
    B0856765007194: '-LarLGv9tfyPEicnD6My',
    B0011711276370: '-LarLGvA4iLxGlDv0f6F',
    B0709870876387: '-LarLGvA4iLxGlDv0f6G',
    B0635797791963: '-LarLGvBTjhbUoe-GwMd',
    B0853249004106: '-LarLGvBTjhbUoe-GwMe',
    B0851831000017: '-LarLGvBTjhbUoe-GwMf',
  }
  // database.ref('/inventory/' + invDB.B0854141006410).update({ 'qty': 1234567 });
  var modal = document.querySelector("#modal");
  var closeButton = document.querySelector("#close");
  ///////////////Begin Quagga API call///////////////
  let dataValidation = false; //initialize dataValidation variable as false
  let addRemove;
  $('#play').hide(); //hides the video area upon script execution. TODO: This might be better as a default CSS property

  $('.startButton').on('click', function () { //When the start/barcode scan button is clicked

    //TODO: for troubleshooting, remove for final and change readCode from let to const


    apiCall(readCode);

    updateInventory(readCode);
  })

  ///////////////End Quagga API///////////////
  var apiCall = function (readCode) {
    var upc = readCode;
    var getURL = `https://cors-anywhere.herokuapp.com/https://api.upcdatabase.org/product/${upc}/9C632CDFED6A28A6814FF46FB527C84D`;

    $.ajax({
      url: getURL,
      method: 'GET',
    }).then(function (response) {

      // console.log(response);
      // var result = response.data;
      var name = response.title;
      // var dTitle = $('#dTitle').val();
      $('#result').empty();
      //console.log(name);
      console.log("NAME IS : " + name)

      var resultDiv = $('<div>');
      $('#result').html(resultDiv);
      var p = $('<p>').html(`<h1 class="box">${name}</h1>`);
      resultDiv.append(p);
    });
  }



  var updateInventory = function (barcode) { //function to update quantity
    var dbKeyKey = 'B' + barcode; //the barcode with 'B' appended before, the key to the database key
    // console.log('dbKeyKey:' + dbKeyKey)
    var dbKey = invDB[dbKeyKey]; //the key to the database object
    // console.log('db key: ' + dbKey)
    // console.log('reference address: ' + '/inventory/' + dbKey)
    var currentQty; //initialize currentQty

    database.ref('/inventory/').on("child_added", function (snapshot) { //declare any event listener to pull data
      // console.log('snapshot start');
      // console.log('dbkey: ' + dbKey);
      if (snapshot.val().UPC == dbKeyKey) { //every database object will be looped through. we are only interested in the one that matches our UPC code

        console.log('before: ' + snapshot.val().qty);
        currentQty = snapshot.val().qty;

        // console.log(currentQty);
        if (addRemove) {
          database.ref('/inventory/' + dbKey).update({ 'qty': currentQty + 1 });
        } else {
          database.ref('/inventory/' + dbKey).update({ 'qty': currentQty - 1 });
        }
        // console.log('after: ' + snapshot.val().qty); // this console.log does not work because firebase updates are asynchronous
        // return currentQty;
      };

      updateHtml(currentQty);
    })
  }

  var updateHtml = function (currentQty) {
    if (addRemove) {
      $('#current').html(`<h1 class="box">Quanity: ${currentQty + 1}</h1>`);
    } else {
      $('#current').html(`<h1 class="box">Quanity: ${currentQty - 1}</h1>`);
    }
  }
});
