// This function is the endpoint's request handler.
exports = async function() {

    var conn = context.services.get("mongodb-atlas").db("qrhunt").collection("locations");
    
    var pipeline = [{
       $match: {
        eventcode: context.values.get("preFilter")
       }
      }, {
       $sort: {
        order: 1
       }
      },{
        $project: {
        order: 1,
        points: 1,
        title: 1,
        note: 1,
        _id:0
    }}];
      
    var docs = await conn.aggregate(pipeline).toArray();

    return docs;
};