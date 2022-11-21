// This function is the endpoint's request handler.
exports = async function(secret) {

    var connLoc = context.services.get("mongodb-atlas").db("qrhunt").collection("locations");
    var connCI = context.services.get("mongodb-atlas").db("qrhunt").collection("checkin");
    
    retDoc = {};
    
    var hasSubmitted = await connCI.findOne({"owner":context.user.id,"location.secret":secret.toLowerCase()});
    
    if(!hasSubmitted) {
      var location = await connLoc.findOne({"eventcode":context.values.get("preFilter"),"secret":secret.toLowerCase()});
      retDoc = location;
    }
    

    return retDoc;
};
