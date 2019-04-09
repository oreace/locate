application.config(function($routeProvider, $locationProvider){
     $locationProvider.html5Mode(true);
  
    $routeProvider.when('/', {
        templateUrl : 'views/home.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/home', {
        templateUrl : 'views/home.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/contact', {
        templateUrl : 'views/contact.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/addmissing', {
        templateUrl : 'views/addmissing.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/cases/:id', {
          templateUrl: function(attrs){ 
            return 'views/cases.php?id=' + attrs.id; },
        controller : 'locate_controller', 
    });

  $routeProvider.when('/missing', {
        templateUrl : 'views/missing.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/post', {
        templateUrl : 'views/post.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/result', {
        templateUrl : 'views/result.html',
        controller : 'locate_controller', 
    });

    $routeProvider.when('/travel', {
        templateUrl : 'views/travel.html',
        controller : 'locate_controller', 
    });

    

    $routeProvider.when('/blog', {
        templateUrl : 'views/blog.html',
        controller : 'locate_controller', 
    });

    $routeProvider.otherwise({
    templateUrl : 'views/404.html',
    });


});


application.run(function($rootScope, $location, checkLogin, User){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        checkLogin.check(function(response){
            if(response){
            $rootScope.isLoggedIn = true;   
            }
            else
            {
            $rootScope.isLoggedIn = false;
            }
        });


    });
}); 