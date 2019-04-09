application.factory('Http', function($http, Admin){
      
    return{
        post : function(data, base_url, action){
            var fd = new FormData();
            for (var key in data)
                fd.append(key, data[key]);
            fd.append('action', action);    
            
            var request = $http({
                method : 'post',
                url : base_url,
                data : fd,    
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}    
            
        });
            return request;
        },

        send : function(request, callback){
            request.then(function(response){
                callback(response);
            })
            
        }
    }
});

application.factory('Admin', function(){
    var obj = {
        isLoggedIn : false,
        user : '',        
    }
    return obj;
});

application.factory('checkLogin', function(Http, Admin){
    return {
        check : function(callback){
            var data = "";
            var action = "check_if_logged_in";
            var url = "model/user.php";
            
            var request = Http.post(data, url, action);
            Http.send(request,function(response){
                if (response.data.user != '')
                {
                    Admin.isLoggedIn = true;
                    Admin.user = response.data.user;
                }
                else
                {
                    Admin.isLoggedIn = false;
                    Admin.user = '';
                }  
                callback(Admin.isLoggedIn);
            });
        }
    }


});
