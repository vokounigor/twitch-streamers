// Accepts 'users' and 'streams'
// Request object (users) has properties: 
// _id , bio, created_at, display_name, logo, name, type, updated_at
const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "noobs2ninjas", "habathcx", "RobotCaleb"];
const baseURL = 'https://wind-bow.glitch.me/twitch-api/';

streamers.forEach(s => {
    getStreamerData(s)
    .catch(err => console.error(err));
});


async function getStreamerData(streamer) {
    // Main url to get info (all but status)
    const url = `${baseURL}users/${streamer}`;
    // URL to get status info
    const url2 = `${baseURL}streams/${streamer}`;
    // First response (for name, logo etc.)
    const response = await fetch(url);
    const json = await response.json();
    // Getting status info
    const response2 = await fetch(url2);
    const streamerStatus = await response2.json();
    let str = streamerStatus.stream;
    let status = onlineStatus(str);

    // Making of elements below //
    //Creating the link
    let link = document.createElement('a');
    link.href = `https://www.twitch.tv/${streamer}`;
    link.target = "_blank";
    // Creating the main div to hold everything
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('card');
    // Creating the logo
    let img = document.createElement('img');
    img.src = json.logo;
    // Creating the div that holds streamer's info
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('card-text');
    // Getting streamer's name
    let name = document.createElement('h4');
    name.innerText = json.name;
    // Appending info to infoDiv
    infoDiv.append(name);

    // If the user is online, get streaming info
    if (status == 'online') {
        let label = document.createElement('p');
        label.innerText = "Streaming:";
        let game = document.createElement('p');
        game.innerText = str.game;
        // Appending
        infoDiv.append(label);
        infoDiv.append(game);
    } // Else say user is offline
    else {
        let label = document.createElement('p');
        label.innerText = "User is";
        let stat = document.createElement('p');
        stat.innerText = `currently ${status}`;
        // Appending
        infoDiv.append(label);
        infoDiv.append(stat);
    }

    // Appending all to main div
    mainDiv.append(img);
    mainDiv.append(infoDiv);
    // Link to wrap all
    link.append(mainDiv);
    link.setAttribute('data-status', status);
    // Appending everything to html page
    document.getElementById('main').append(link);
}

// Quick check for online status
function onlineStatus(stat) {
    if (stat == null) {
        return 'offline';
    }
    return 'online';
}

// Button behaviours
window.onload = () => {
    let online = document.getElementById('on');
    let offline = document.getElementById('off');
    let all = document.getElementById('all');
    let main = document.getElementById('main');

    online.addEventListener('click', () => {
        let results = main.querySelectorAll('a');
        results.forEach(r => {
            if (r.getAttribute('data-status') == "offline") {
                r.classList.add('inactive');
                r.classList.remove('active');
            } else {
                r.classList.add('active');
                r.classList.remove('inactive');
            }
        });
    });

    offline.addEventListener('click', () => {
        let results = main.querySelectorAll('a');
        results.forEach(r => {
            if (r.getAttribute('data-status') == "online") {
                r.classList.add('inactive');
                r.classList.remove('active');
            } else {
                r.classList.add('active');
                r.classList.remove('inactive');
            }
        });
    });

    all.addEventListener('click', () => {
        let results = main.querySelectorAll('a');
        results.forEach(r => {
            r.classList.remove('inactive');
            r.classList.add('active');
        });
    });

}