application.config(function($routeProvider, $locationProvider){
     $locationProvider.html5Mode(true);
  
    $routeProvider.when('/', {
        templateUrl : 'views/login.html',
        controller : 'admin_controller', 
    });

    $routeProvider.when('/login', {
        templateUrl : 'views/login.html',
        controller : 'admin_controller', 
    });

    $routeProvider.when('/dashboard', {
        templateUrl : 'views/index.html',
        controller : 'admin_controller', 
    });
 
    $routeProvider.when('/members', {
        templateUrl : 'views/members.html',
        controller : 'admin_controller', 
    });
 
    $routeProvider.when('/missing', {
        templateUrl : 'views/missing.html',
        controller : 'admin_controller', 
    });
 
     $routeProvider.when('/volunteers', {
        templateUrl : 'views/volunteer.html',
        controller : 'admin_controller', 
    });
 
    $routeProvider.when('/manifest', {
        templateUrl : 'views/manifest.html',
        controller : 'admin_controller', 
    });
 
    $routeProvider.otherwise({
    templateUrl : 'views/404.html',
    });


});


application.run(function($rootScope, $location, checkLogin, Admin){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        checkLogin.check(function(response){
       if(response){
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/login' || nextUrl == '/')
                {
                   $location.path('/dashboard');
                }
                $rootScope.isLoggedIn = true;   
            }
            else
                {
                    $location.path('/login');
                    $rootScope.isLoggedIn = false;
                }

            });
    });
}); 