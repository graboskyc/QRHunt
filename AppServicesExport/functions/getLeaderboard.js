// This function is the endpoint's request handler.
exports = async function() {

    var conn = context.services.get("mongodb-atlas").db("qrhunt").collection("checkin");
    
    var pipeline = [{
       $match: {
        "location.eventcode": context.values.get("preFilter")
       }
      }];
      
    var docs = await conn.aggregate(pipeline).toArray();

    return docs;
};