$(document).on('click', '.view',function()
{
         var user_id = $(this).attr("id");
         $.ajax({
            url:"model/members.php",
            method:"POST",
            data:{id:user_id, action:'get'},
            dataType:"json",
            success:function(data)
            {
                if (data)
                {    
                $('#user_uploaded_image').html(data.img);
                $('#user_name').text(data.name);
                $('#user_email').text(data.email);
                $('#user_gsm').text(data.gsm);
                $('#user_state').text(data.state);
                $('#user_address').text(data.address);
                $('#userModal').modal('show');
                }
            } 
        });
});


$(document).on('click', '.viewmissing',function()
{
         var user_id = $(this).attr("id");
         $.ajax({
            url:"model/missing.php",
            method:"POST",
            data:{id:user_id, action:'get'},
            dataType:"json",
            success:function(data)
            {
                if (data)
                {    
                $('#user_uploaded_image').html(data.img);
                $('#user_name').text(data.name);
                $('#user_day').text(data.day);
                $('#user_info').text(data.info);
                $('#user_status').text(data.status);
                $('#user_timeposted').text(data.timeposted);
                $('#user_postedby').text(data.postedby);
                
                $('#user_days').text(data.days);
                $('#user_lastloc').text(data.lastloc);
                $('#user_age').text(data.age);
                $('#user_gender').text(data.gender);
                $('#user_language').text(data.language);
                $('#user_relationship').text(data.relationship);
                

                $('#userModal').modal('show');
                }
            } 
        });
});

$(document).on('click', '#sendmail',function()
{
     //    var user_id = $(this).attr("id");
     //    $('#mail_id').val(user_id);
         $('#mailModal').modal('show');
});

 $(document).on('submit', '#mail_form',function(event){
        event.preventDefault();
        var msg = $('#mail_msg').val();
        var sub = $('#mail_sub').val();
        if(msg != '' && sub != '')
        {
            $.ajax({
                url:"model/missing.php",
                method: "POST",
                data: new FormData(this),
                contentType:false,
                processData:false,
                success:function(data)
                {
                    alert(data);
                    $('#mail_form')[0].reset();
                    $('#mailModal').modal('hide');
                }
            });
        }
        else
        {   
            alert("Both Fields are required");
        }

     });  


$(document).on('click', '.found', function(){
        var user_id = $(this).attr("id");
        if (confirm("Are you sure this person is found?"))
        {
            $.ajax({
                url:"model/missing.php",
                method:"POST",
                data:{id:user_id, action:'found'},
                success:function(data)
                {
                    
                    
                if (data == 'success')
                {
                    
                    alert("Found, Thank God");
//                    refreshmem();
                }
                else
                {
                 alert(data);   
                }
        
                }                

            });
        }
        else
        {
            return false;
        }
     });





     $(document).on('click', '.delete', function(){
        var user_id = $(this).attr("id");
        if (confirm("Are you sure you want to delete this member?"))
        {
            $.ajax({
                url:"model/members.php",
                method:"POST",
                data:{id:user_id, action:'delete'},
                success:function(data)
                {
                    
                    
                if (data == 'success')
                {
                    
                    alert("Deleted");
//                    refreshmem();
                }
                else
                {
                 alert(data);   
                }
        
                }                

            });
        }
        else
        {
            return false;
        }
     });


   $(document).on('click', '.panic', function(){
        var user_id = $(this).attr("id");
            $.ajax({
                url:"model/manifest.php",
                method:"POST",
                data:{id:user_id, action:'panic'},
                success:function(data)
                {
                    
                    
                if (data == 'success')
                {
                    
                    alert("Panicked");
//                    refreshmem();
                }
                else
                {
                 alert(data);   
                }
        
                }                

            });
     });


     $(document).on('click', '.checkout', function(){
        var user_id = $(this).attr("id");
        if (confirm("Are you sure you want to checkout this member?"))
        {
            $.ajax({
                url:"model/manifest.php",
                method:"POST",
                data:{id:user_id, action:'checkout'},
                success:function(data)
                {
                    
                    
                if (data == 'success')
                {
                    
                    alert("Checked-Out");
//                    refreshmem();
                }
                else
                {
                 alert(data);   
                }
        
                }                

            });
        }
        else
        {
            return false;
        }
     });





   /*
            var $memtable = $('#table');
            var refreshmem = function () {
                $memtable.bootstrapTable('refresh', {
                    data: '../admin/model/fetchmembers.php'
                });
            }
  */
 
  






var application = angular.module('admin_app', ['ngRoute']);

application.directive("fileModel", function($parse){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
});


application.controller('admin_controller', function($scope, $location, $timeout, Http, Admin, $routeParams){
    //$scope.register = {};
     $scope.login = {};
    /* $scope.missing = {};
     $scope.miss = {};  
     $scope.missme = {};
     $scope.travel = {};
     $scope.visit = {};
     $scope.manifestme = {};
     $scope.contact = {};
*/
$scope.vid = '';
$scope.showAlert = function(){
    $('#msgmodal').fadeIn(1000);
    $timeout(function(){
        $('#msgmodal').fadeOut(1000);
    }, 5000);
}

$scope.loadv = function()
{
      $scope.vid = $routeParams.id;
}

$scope.loginme = function(){
    var user = $scope.login.user;
    var password = $scope.login.password;
    if (user != '' && password != '')
    {

          var data = $scope.login;
          var url = "model/user.php";
          var action = "login";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data.user)
                {
                    Admin.isLoggedIn = true;
                    Admin.user = response.data.user;
                    $scope.type = "success";
                    $scope.msg = Admin.isLoggedIn;
                    $scope.showAlert();
                    $location.path('/dashboard');
                }
                else
                {
                    Admin.isLoggedIn = false;
                    Admin.user = '';
                    $scope.type = "danger";
                    $scope.msg = response.data.error;
                    $scope.showAlert();
                
                }
      
          });
    
    }else{
        $scope.type = "danger";
        $scope.msg = "Please fill all details";
        $scope.showAlert();
    } 
} 

    



$scope.logout = function(){
        var data = "";
        var url = "model/user.php";
        var action = "logout";
        var request = Http.post(data, url, action);
        Http.send(request, function(){
        $location.path('/login');
        });
}

/*
$scope.isAuthenticated = function(){
        var data = "";
        var url = "model/user.php";
        var action = "isAuthenticated";
        var request = Http.post(data, url, action);
        Http.send(request, function(response){
            if(response.data)
            {
            $location.path('/dashboard');
            }else
            {
            $location.path('/login');
            }
   
    });
}
    
    
angular.element(document).ready(function(){
    $scope.isAuthenticated();
});

*/

});