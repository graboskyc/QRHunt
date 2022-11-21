// This function is the endpoint's request handler.
exports = async function() {

    var conn = context.services.get("mongodb-atlas").db("qrhunt").collection("checkins");
    
    var pipeline = [{
       $match: {
        eventcode: context.values.get("preFilter")
       }
      }, {
       $sort: {
        order: 1
       }
      }];
      
    var docs = await conn.aggregate(pipeline).toArray();

    return docs;
};