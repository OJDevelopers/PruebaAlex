exports = module.exports = function(app, mongoose) {
  var esquemaUsuarios = new mongoose.Schema({
    BasicInfo : 
    {
      nombres: String,
      cedula: String,
    	apellidos: String,
    	edad: Number,
    	fechaNacimiento: Date
    }
   ,Login :
    {
      username: String,
      pasword: String
    }
  });

  mongoose.model('usuario', esquemaUsuarios);
};


 