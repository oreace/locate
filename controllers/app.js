        function loadstate() 
        {
            var action = "fetch_states";
            $.ajax({

			url:"model/user.php",
			method:"POST",
			data:{action:action},
			dataType:"text",
			success:function(data)
			{
				$('#state').html(data);
			}

            });
        }
    
    	$('#state').change(function(){
			var state = $(this).val();
            var action = "fetch_lga";
            $.ajax({
			url:"model/user.php",
			method:"POST",
			data:{action:action,state:state},
			dataType:"text",
			success:function(data)
			{
				$('#lga').html(data);
			}
			});
		});
        
$(document).on('click', '.update',function()

{
         var user_id = $(this).attr("id");
         $.ajax({
            url:"fetch_single.php",
            method:"POST",
            data:{user_id:user_id},
            dataType:"json",
            success:function(data)
                 {
                $('#userModal').modal('show');
                $('#first_name').val(data.first_name);
                $('#last_name').val(data.last_name);
                $('.modal-title').text("Edit User");
                $('#user_id').val(user_id);
                $('#user_uploaded_image').html(data.user_image);
                $('#action').val("Edit");
                $('#operation').val("Edit");
                }
         });
});

/*
     $(document).on('click', '.volunteer', function(){
             var action = "volunteer";
        if (confirm("Are you sure you want to volunteer this? Please note this is a commitment!"))
        {
            $.ajax({
                url:"model/missing.php",
                method:"POST",
                data:{action:action},
                success:function(data)
                {
                    
                    
                if (data == 'Success')
                {
                    
                    alert("Thank you for voluneering");
                   // $scope.type = "success";
                   // $scope.msg = "Thank you for volunteering";
                   // $scope.showAlert();
                
                }
                else
                {
                 alert(data);   
                 //  $scope.type = "danger";
                 //   $scope.msg = response.data;
                 //   $scope.showAlert();
                
                }
        
                }                

            });
        }
        else
        {
            return false;
        }
     });

*/
$(document).on('click', '.viewmissing', function()
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
                
                $('#viewMissing').modal('show');
                }
            } 
        });
});


     $(document).on('submit', '#travel-form',function(event){
        event.preventDefault();
            $.ajax({
                url:"model/manifest.php",
                method: "POST",
                data: new FormData(this),
                contentType:false,
                processData:false,
                success:function(data)
                {
                    if (data == "success")
                    {
                    alert(data);
                    $('#travel-form')[0].reset();
                    $('#travel-table').bootstrapTable('refresh', {url:'model/fetchmanifest.php'});
                    }
                   else
                   {
                    alert(data);
                   }
                }
            });
       
     });  


     $(document).on('submit', '#visit-form',function(event){
        event.preventDefault();
            $.ajax({
                url:"model/manifest.php",
                method: "POST",
                data: new FormData(this),
                contentType:false,
                processData:false,
                success:function(data)
                {
                    if (data == "success")
                    {
                    alert(data);
                    $('#visit-form')[0].reset();
                    $('#travel-table').bootstrapTable('refresh', {url:'model/fetchmanifest.php'});
                    }
                   else
                   {
                    alert(data);
                   }
                }
            });
       
     });  


$(document).on('click', '.details', function()
{
         var user_id = $(this).attr("id");
         $.ajax({
            url:"model/manifest.php",
            method:"POST",
            data:{id:user_id, action:'get'},
            dataType:"json",
            success:function(data)
            {
                if (data)
                {    
                $('#user_from').text(data.from);
                $('#user_to').text(data.to);
                $('#user_number').text(data.number);
                $('#user_address').text(data.address);
                $('#user_dateposted').text(data.dateposted);
                $('#user_datedepart').text(data.datedepart);
                $('#user_type').text(data.type);
                $('#user_status').text(data.status);
                
                
                $('#viewmanifest').modal('show');
                }
            } 
        });
});

$(document).on('click', '.ref', function()
{
 $('#travel-table').bootstrapTable('refresh', {url:'model/fetchmanifest.php'});
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


var application = angular.module('locate_app', ['ngRoute']);

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


application.controller('locate_controller', function($scope, $location, $timeout, Http, User){
     $scope.register = {};
     $scope.login = {};
     $scope.missing = {};
     $scope.miss = {};  
     $scope.missme = {};
     $scope.travel = {};
     $scope.visit = {};
     $scope.manifestme = {};
     $scope.contact = {};


$scope.showAlert = function(){
    $('#msgmodal').fadeIn(1000);
    $timeout(function(){
        $('#msgmodal').fadeOut(1000);
    }, 5000);
}
                
$scope.loginme = function(){
    var email = $scope.login.email;
    var password = $scope.login.password;
    if (email != '' && password != '')
    {

          var data = $scope.login;
          var url = "model/user.php";
          var action = "login";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data.email)
                {
                    User.isLoggedIn = true;
                    User.email = response.data.email;
                    //$scope.type = "success";
                    //$scope.msg = User.isLoggedIn;
                    var name = response.data.name;
                    alert("Welcome "+ name);
                    window.location.reload();
                    
                    //$scope.showAlert();
                    //$('#login').fadeOut(500);
                    //$('#login').modal('hide');
                    
                }
                else
                {
                    User.isLoggedIn = false;
                    User.email = '';
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

$scope.registerme = function(){

      var name = $scope.register.name;
      var email = $scope.register.email;
      var gsm = $scope.register.gsm;
      var password = $scope.register.password;
      var cpassword = $scope.register.cpassword;
      var img = $scope.register.img;
      
      if (name != ''  && email != ''  && gsm != '' && password  != '' && cpassword != ''){

      if (password == cpassword)
      {
          var data = $scope.register;
          var url = "model/user.php";
          var action = "register";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data == 'Success')
                {
                    $scope.type = "success";
                    $scope.msg = "Successful";
                    $scope.showAlert();
                    $('#register').modal('hide');
                    $scope.register = {};
             }
                else
                {

                    $scope.type = "danger";
                    $scope.msg = response.data;
                    $scope.showAlert();
                
                }
      
          });
       
                }else{
                    $scope.type = "danger";
                    $scope.msg = "Passwords do not match";
                    $scope.showAlert();
          
                 }
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
        window.location.reload();
        });
}

    
    
$scope.isAuthenticated = function(){
        var data = "";
        var url = "model/user.php";
        var action = "isAuthenticated";
        var request = Http.post(data, url, action);
        Http.send(request, function(response){
        if(response.data)
        {
                User.isLoggedIn = true;
        }
        else
        {
                User.isLoggedIn = false;
        }
    
    });
}
    
    
angular.element(document).ready(function(){
    $scope.isAuthenticated();
});
    

$scope.missingme = function()
{

      var name = $scope.missing.name;
      var day =  $scope.missing.day;
      var info = $scope.missing.info;
      var user = User.email;
    if (user != '')
    {        
          if (name != ''  && day != ''  && info != ''){
            
          var data = $scope.missing;
          var url = "model/missing.php";
          var action = "insert";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data == 'Success')
                {
                    $scope.type = "success";
                    $scope.msg = "Successful";
                    $scope.showAlert();
                    $location.path('missing');
     
               //      $('#missingModal').modal('hide');
               //     $scope.displayMissing();
                }
                else
                {

                    $scope.type = "danger";
                    $scope.msg = response.data;
                    $scope.showAlert();
                
                }
      
          });
       
        }
        else
        {
        $scope.type = "danger";
        $scope.msg = "Please fill all details";
        $scope.showAlert();
        }
    }
    else
    {
                    $scope.type = "danger";
                    $scope.msg = "Please Login First";
                    $scope.showAlert();
    }
}

$scope.displayMissing = function()
{
        var data = "";
        var url = "model/missing.php";
        var action = "display";
        var request = Http.post(data, url, action);
        Http.send(request, function(response){
        $scope.miss = response.data;
});            
}

$scope.MissingView = function(name,day,info,img)
{
    $('#viewMissing').modal('show');
    $scope.missme.name = name;
    $scope.missme.day = day;
    $scope.missme.img= img;
    $scope.missme.info = info;
}


$scope.Volunteer = function()
{
    var user = User.email;
    if (user != '')
    {        
    //    if (confirm("Are you sure you want to volunteer?"))
    //    {

          $('#vModal').modal('show');
          var data = "";
          var url = "model/missing.php";
          var action = "volunteer";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data == 'Success')
                {
                    
                    alert("Thank you for voluneering");
                   // $scope.type = "success";
                   // $scope.msg = "Thank you for volunteering";
                   // $scope.showAlert();
                
                }
                else
                {
                 alert(response.data);   
                 //  $scope.type = "danger";
                 //   $scope.msg = response.data;
                 //   $scope.showAlert();
                
                }
        
                });  
      //      }
      //      else
      //      {
     //           return false;
      //      }   

                }
                else
                {
                    alert("Login First");
                }
}


/*
$scope.travellingme = function()
{

      var from = $scope.travel.from;
      var to =  $scope.travel.to;
      var est = $scope.travel.est;
      var number = $scope.travel.number;
      var address = $scope.travel.address;
      
      var user = User.email;
    if (user != '')
    {        
          if (from != ''  && to != ''  && est != '' && number != '' && address != '')
          {
          $scope.travel.type = "Travel";  
          var data = $scope.travel;
          var url = "model/manifest.php";
          var action = "insert";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data == 'Success')
                {
                alert("Successful");
                 //   $scope.type = "success";
                 //   $scope.msg = "Successful";
                 //   $scope.showAlert();
              // angular.element( document.querySelector( '#travel-table' )).bootstrapTable('refresh');
              $('#travel-table').bootstrapTable('refresh', {url:'model/fetchmanifest.php'});
              //     $scope.displaymanifest();
                }
                else
                {
                    var err = response.data;
                //    $scope.type = "danger";
               //     $scope.msg = response.data;
               //     $scope.showAlert();
                alert(err);
                }
      
          });
       
        }
        else
        {
        $scope.type = "danger";
        $scope.msg = "Please fill all details";
        $scope.showAlert();
        }
    }
    else
    {
                    $scope.type = "danger";
                    $scope.msg = "Please Login First";
                    $scope.showAlert();
    }
}

$scope.visitingme = function()
{

      var from = $scope.travel.from;
      var to =  $scope.travel.to;
      var est = $scope.travel.est;
      var number = $scope.travel.number;
      var address = $scope.travel.address;
      
      var user = User.email;
    if (user != '')
    {        
          if (from != ''  && to != ''  && est != '' && number != '' && address != '')
          {
          $scope.travel.type = "Visit";  
          var data = $scope.travel;
          var url = "model/manifest.php";
          var action = "insert";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data == 'Success')
                {
                    $scope.type = "success";
                    $scope.msg = "Successful";
                    $scope.showAlert();
                    $scope.displaymanifest();
                }
                else
                {

                    $scope.type = "danger";
                    $scope.msg = response.data;
                    $scope.showAlert();
                
                }
      
          });
       
        }
        else
        {
        $scope.type = "danger";
        $scope.msg = "Please fill all details";
        $scope.showAlert();
        }
    }
    else
    {
                    $scope.type = "danger";
                    $scope.msg = "Please Login First";
                    $scope.showAlert();
    }
}
*/
$scope.displaymanifest = function()
{
        var data = '';
        var url = "model/manifest.php";
        var action = "display";
        var request = Http.post(data, url, action);
        Http.send(request, function(response){
        $scope.manifest = response.data;
        });            
}

$scope.ManifestView = function(from,to,number,address,dateposted,datedepart,status,type)
{
    $('#viewManifest').modal('show');
    $scope.manifestme.from = from;
    $scope.manifestme.to = to;
    $scope.manifestme.number = number;
    $scope.manifestme.address = address;
    $scope.manifestme.dateposted = dateposted;
    $scope.manifestme.datedepart = datedepart;
    $scope.manifestme.status = status;
    $scope.manifestme.type = type;
}


$scope.CheckoutManifest = function(id)
{
    var user = User.email;
    if (user != '')
    {        
   
        if (id != '')
        {
          var data = {
            'id' : id,
            };
          var url = "model/manifest.php";
          var action = "checkout";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data == 'Success')
                {
                    
                    alert("Thank you! Done");
                   // $scope.type = "success";
                   // $scope.msg = "Thank you for volunteering";
                   // $scope.showAlert();
                
                }
                else
                {
                 alert(response.data);   
                 //  $scope.type = "danger";
                 //   $scope.msg = response.data;
                 //   $scope.showAlert();
                }
        
            });  

            }
            }
            else
            {
                alert("Login First");
            }
}


$scope.Panic = function(id)
{
    var user = User.email;
    if (user != '')
    {        
   
        if (id != '')
        {
          var data = {
            'id' : id,
            };
          var url = "model/manifest.php";
          var action = "panic";
          var request = Http.post(data, url, action);
          Http.send(request, function(response)
          {
             if (response.data == 'Success')
                {
                    
                    alert("Help is on its way!!!");
                   // $scope.type = "success";
                   // $scope.msg = "Thank you for volunteering";
                   // $scope.showAlert();
                
                }
                else
                {
                 alert(response.data);   
                 //  $scope.type = "danger";
                 //   $scope.msg = response.data;
                 //   $scope.showAlert();
                
                }
        
          });  

        }
    }
    else
    {
    alert("Login First");
    }
}

$scope.sendmail = function()
{
    var name = $scope.contact.name;
    var email = $scope.contact.email;
    var subject = $scope.contact.subject;
    var msg = $scope.contact.msg;
    if (name !='' && email != '' && subject != '' && msg != '')
    {

          var data = $scope.contact;
          var url = "model/user.php";
          var action = "sendmail";
          var request = Http.post(data, url, action);
          Http.send(request, function(response){
             if (response.data.email)
                {
                    $scope.type = "success";
                    $scope.msg = "Message Sent";
                    $scope.showAlert();
                    
                }
                else
                {
                    $scope.type = "danger";
                    $scope.msg = "Failed, try again";
                    $scope.showAlert();
                
                }
      
          });
    



    }else{
        $scope.type = "danger";
        $scope.msg = "Please fill all details";
        $scope.showAlert();
    } 
}

});