# About QRHunt
This was built as a real quick cross between a scavenger hunt and FourSquare. The main requirement is that secret codes could be embedded in QR codes (a URL) to allow people to check in to a get together (in this case a pub crawl) and complete tasks all without requiring accounts.

# Tech Stack
The webapp is a Blazor WASM SPA. The backend database is MongoDB Atlas. The business logic is all in MongoDB Atlas App Services.Authentication is done with the Anonymous Authentication Provider within MongoDB Atlas App Services, and thus should retain the same user identifier through the day, assuming they use the same browser and do not clear browser cache.

# Data Models
## qrhunt.locations
```
{
    _id: ObjectId("637979d8b9b018382b438462"),
    eventcode: 'ffpc2022',
    order: 1,
    points: 1,
    title: "McGillin's Olde Ale House",
    note: 'Find Betty or Ryan for the secret code.',
    secret: 'welcome'
}
```

## qrhunt.checkin
```
{
    _id: ObjectId("637ad6fbc7dd2b464da30426"),
    owner: '637a1be7c7dd2b464dff923a',
    name: 'Chris',
    location: {
      _id: ObjectId("637979d8b9b018382b438462"),
      eventcode: 'ffpc2022',
      order: 1,
      points: 1,
      title: "McGillin's Olde Ale House",
      note: 'Find Betty Field or Ryan Benetz for the secret code.',
      secret: 'welcome'
    }
}
```

# Screenshots
## Homepage
![](/Screenshots/ss01.gif)

## Leaderboard
![](/Screenshots/ss02.gif)

## Checkins with validation
![](/Screenshots/ss03.gif)