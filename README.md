The Inventory Tracker.
We decided to do a inventory tracker that, if you hit the checkout button will remove one item from our quanitiy or if you click the add button our qaunitiy will go up by one. One you click one of the buttons, the app will open a webcam and scan a barcode. It recognizes bar codes by using the Quagga.js library.
Once the barcode is scanned an API call is made to our database and the name of the item is displayed on the screen. At the same time our app checkes to see if this item is stored in our firebase. If it is then the qaunitiy will be changed, based on the button user clciked, and the quanitiy will be displayed on the screen.
