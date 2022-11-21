exports = async function(ci) {

    var connLoc = context.services.get("mongodb-atlas").db("qrhunt").collection("locations");
    var connCI = context.services.get("mongodb-atlas").db("qrhunt").collection("checkin");
    
    var hasSubmitted = await connCI.findOne({"owner":context.user.id,"location.secret":ci.location.secret.toLowerCase()});
    
    if(!hasSubmitted) {
    
      var location = await connLoc.findOne({"eventcode":context.values.get("preFilter"),"secret":ci.location.secret.toLowerCase()});
      ci.location = location;
      
      connCI.insertOne(ci);
    }
};
