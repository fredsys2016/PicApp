var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'PicApp_v2',
    // App id
    id: 'com.PicApp_v2.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    }
    // ... other parameters
  });
  
var mainView = app.views.create('.view-main');


var destinationType;
document.addEventListener('deviceready', onDeviceReady,false);
function onDeviceReady()
{
  console.log("Device Ready..");
  destinationType=navigator.camera.DestinationType;
}

/**
 * this method open camera to take picture later
 */
function openCamera()
{
  navigator.camera.getPicture(cameraCallBack, onError,options); 
}
function cameraCallBack(imgData){
  savePicture(imgData);//Save picture (path of picture)
}
var options = {
      quality: 50,
      destinationType: destinationType.DATA_URL,
      mediaType: Camera.MediaType.PICTURE
  };
  
/**
 * This method is encharged to open galery and select a picture by user
 * @param {*} source 
 */
  function openGalery(source){
    var opt={
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: source };
      //require 3 parameter 
    navigator.camera.getPicture(onPhotoURISucess,onError, opt);
  }
function onPhotoURISucess(imgURI){
  var img= document.getElementById("photo");
  img.src= imgURI;
}

/**
 * Message general for all porpuse
 * @param {*} msg 
 */
function onError(msg)
{alert("Failed because"+msg);}

/**
 *this method Save a picture after take picture
 */
function savePicture(pathImg){ window.cordova.plugins.imagesaver.saveImageToGallery(pathImg,onSaveImageSuccess, onError);}
function onSaveImageSuccess(){}


/***
 * -----------------------
 * 


function moveFile(file){

  var deferred = $q.defer();

  window.resolveLocalFileSystemURL(file,
      function resolveOnSuccess(entry){

          var dateTime = moment.utc(new Date).format('YYYYMMDD_HHmmss');
          var newFileName = dateTime + ".jpg";
          var newDirectory = "PicAppPhoto";

          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {

                  //The folder is created if doesn't exist
                  fileSys.root.getDirectory( newDirectory,
                      {create:true, exclusive: false},
                      function(directory) {

                          entry.moveTo(directory, newFileName, function (entry) {
                              //Now we can use "entry.toURL()" for the img src
                              console.log(entry.toURL());
                              deferred.resolve(entry);

                          }, resOnError);
                      },
                      resOnError);
              },
              resOnError);
      }, resOnError);

  return deferred.promise;
}

function resOnError(error) {
  alert('Awwww shnap!: ' + error.code);
}


 */