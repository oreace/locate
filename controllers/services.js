application.factory('Http', function($http, User){
    //var base_url = "../locate/model/server.php";
      
    return{
        post : function(data, base_url, action){
            var fd = new FormData();
            for (var key in data)
                fd.append(key, data[key]);
            fd.append('action', action);    
            
            if (action == "insert" || action == "volunteer")
            {
            fd.append('user', User.email);    
            }
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

application.factory('User', function(){
    var obj = {
        isLoggedIn : false,
        email : '',        
    }
    return obj;
});

application.factory('checkLogin', function(Http, User){
    return {
        check : function(callback){
            var data = "";
            var action = "check_if_logged_in";
            var url = "../locate/model/user.php";
            
            var request = Http.post(data, url, action);
            Http.send(request,function(response){
                if (response.data.email != '')
                {
                    User.isLoggedIn = true;
                    User.email = response.data.email;
                }
                else
                {
                    User.isLoggedIn = false;
                    User.email = '';
                }  
                callback(User.isLoggedIn);
            });
        }
    }


});
