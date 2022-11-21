// This function is the endpoint's request handler.
exports = async function() {

    var conn = context.services.get("mongodb-atlas").db("qrhunt").collection("checkin");
    
    var pipeline = [{
     $match: {
      'location.eventcode': context.values.get("preFilter")
     }
    }, {
     $addFields: {
      un: {
       $concat: [
        '$name',
        '_',
        '$owner'
       ]
      }
     }
    }, {
     $group: {
      _id: '$un',
      points: {
       $sum: '$location.points'
      }
     }
    }, {
     $sort: {
      points: -1
     }
    }, {
     $limit: 10
    }, {
      $project: {
        _id:0,
        key:"$_id",
        value:"$points"
      }
    }];
      
    var docs = await conn.aggregate(pipeline).toArray();

    return docs;
};