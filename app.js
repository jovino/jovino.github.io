angular.module('myApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]);

var app =angular.module('myApp',['myApp.service', 'ngMaterial']);
app.config(function($mdThemingProvider, $mdIconProvider){
                  $mdIconProvider
                      .defaultIconSet("./svg/avatars.svg", 128)
                      .icon("menu"       , "./svg/menu.svg"        , 24)
                      .icon("share"      , "./svg/share.svg"       , 24)
                      .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                      .icon("hangouts"   , "./svg/hangouts.svg"    , 512)
                      .icon("twitter"    , "./svg/twitter.svg"     , 512)
                      .icon("phone"      , "./svg/phone.svg"       , 512);
                      $mdThemingProvider.theme('default')
                          .primaryPalette('red')
                          .accentPalette('blue-grey').backgroundPalette('grey').dark();
              });
app.controller(
    'AppController', ['$scope', 'DataSource','$mdSidenav', function AppController($scope,DataSource,$mdSidenav) {

    var SOURCE_FILE = "spanish_reina.xml";
        $scope.currentBook = {};
    $scope.selectBook = function(book){
          $scope.currentBook = book;
    }
    $scope.toggleList = function() {
      $mdSidenav('left').toggle();
    }

    $scope.IMAGE_LOCATION = "http://rabidgadfly.com/assets/angular/xmlload/";
    
    xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.bible.b;
    };
    
    setData = function(data) {
        $scope.dataSet = data;
    };
        
    DataSource.get(SOURCE_FILE,setData,xmlTransform);
    
}])