var mongoose = require('mongoose');
var Users = mongoose.model('usuario');

  //GET - Return all Users in the DB
  exports.findAllUsers = function(req, res) {
  	console.log(Users);
  	Users.find(function(err, users) {
  		console.log(users);
  		if(!err) {
  			res.send(users);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  exports.findUserById = function(req, res) {
      Users.findById(req.params.cedula,function(err, user) {
      if(!err) {
        res.send(user);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //por username y pass
/*
    exports.findUsersUsername = function(req, res) {
    console.log(Users);
    Users.find({"Login.username":req.params.username},function(err, users) {
      console.log(users);
      if(!err) {
        res.send(users);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };*/

  //POST - Insert a new User in the DB
  exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
      var user = new Users({
        BasicInfo : 
        {
          nombres: req.body.BasicInfo.nombres,
          apellidos: req.body.BasicInfo.apellidos,
          edad: req.body.BasicInfo.edad,
          fechaNacimiento: req.body.BasicInfo.fechaNacimiento
        },
        Login :
        {
          username: req.body.Login.username,
          pasword: req.body.Login.pasword
        }
      });

      user.save(function(err) {
        if(!err) {
          console.log('User "'+ req.body.BasicInfo.nombres +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(user);//mensaje
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateUser = function(req, res)
  {
    Users.findById(req.params.id, function(err, user) {
      user.BasicInfo.nombres = req.body.BasicInfo.nombres,
      user.BasicInfo.apellidos = req.body.BasicInfo.apellidos,
      user.BasicInfo.edad = req.body.BasicInfo.edad,
      user.BasicInfo.fechaNacimiento = req.body.BasicInfo.fechaNacimiento,
      user.Login.username = req.body.Login.username,
      user.Login.pasword = req.body.Login.pasword

      user.save(function(err) {
        if(!err) 
        {
          console.log('User "'+ req.body.BasicInfo.nombres +'" Updated Succefull');
        }
        else
        {
          console.log('ERROR: ' + err); 
        }

        res.send(user);//mensaje
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteUser = function(req, res) {
    Users.findById(req.params.cedula, function(err, user) {
      user.remove(function(err) {
        if(!err) {
      console.log('User with Id "'+ req.params.cedula +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });


  }