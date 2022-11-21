window.shimLog = async function(obj) {
    console.log(obj);
}

const client = stitch.Stitch.initializeDefaultAppClient("ffpc-tcjrg");

if (client.auth.hasRedirectResult()) {
    client.auth.handleRedirectResult().then(user => {
        console.log(user);
    });
}

var errCt = 0;


window.login = async function(){
    try {
        if (!client.auth.isLoggedIn) {
            const credential = new stitch.AnonymousCredential();
            client.auth.loginWithCredential(credential);
        } else {
            console.log(client.auth.currentUser);
        }
    }
    catch(e) {
        errCt++;
        console.log("try " + errCt);
        console.log(e);
        if(errCt < 5) {
            setTimeout(function() { login();}, 500);
        }
    }
}

window.getCurrentUserId = async function() {
    return client.auth.currentUser.id;
}

window.realmShim_getLocations = async function() {
    await login();
    var result = await client.callFunction("getLocations");
    console.log(result);
    return result;
}

window.realmShim_getLocation = async function(secret) {
    await login();
    console.log(secret);
    var result = await client.callFunction("getLocation", [secret]);
    console.log(result);
    return result;
}

window.realmShim_setCheckin = async function(ci) {
    await login();
    var result = await client.callFunction("setCheckin", [ci]);
    console.log(result);
    return result;
}

window.realmShim_getCheckins = async function() {
    await login();
    var result = await client.callFunction("getCheckins");
    console.log(result);
    return result;
}

window.realmShim_getLeaderboardGraph = async function() {
    await login();
    var result = await client.callFunction("getLeaderboardGraph");
    console.log(result);
    return result;
}