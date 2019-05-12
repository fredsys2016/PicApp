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

var pictureSource;
var destinationType;
document.addEventListener('deviceready', onDeviceReady,false);
function onDeviceReady()
{
  console.log("Device Ready..");
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;

  console.log(cordova.file);
}


function openCamera()
{
  navigator.camera.getPicture(cameraCallBack, onError,options); 
}
function cameraCallBack(imgData){
  var img = document.getElementById('photo');
  img.src =  imgData;
  document.getElementById("msg").textContent=imgData;
  savePicture(imgData);
 // document.getElementById("photo2").src=imgData;
}

var options = {
      quality: 50,
      destinationType: destinationType.DATA_URL,
      mediaType: Camera.MediaType.PICTURE,
      

  };
  

  function openGalery(source)
  {
    var opt={
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: source
      };
    navigator.camera.getPicture(onPhotoURISucess,onError, opt);
  }

function onPhotoURISucess(imgURI)
{
  var img= document.getElementById("photo");
  img.src= imgURI;
}


function onError(msg)
{alert("Failed because"+msg);}

/**
 * Save a picture after take picture
 */
function savePicture(pathImg)
{
  alert("method save");
  window.cordova.plugins.imagesaver.saveImageToGallery(pathImg,onSaveImageSuccess, onError);
}

function onSaveImageSuccess(){
  alert("Picture Saved");
}