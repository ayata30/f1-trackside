const BASE_URL = "https://api.openf1.org/v1";

let requestQueue = Promise.resolve();
let lastRequestTime = 0;

async function fetchOpenF1(url) {
    const request = requestQueue.then(async () => {
        const elapsed = Date.now() - lastRequestTime;
        const delay = Math.max(0, 500 - elapsed);

        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        lastRequestTime = Date.now();
        

        const response = await fetch(url);

        const data = await response.json();


        if (!response.ok) {
            const message = 
            data.detail || `OpenF1 API error: ${response.status}`;

            throw new Error(message);
        }
        return data;
    });

    requestQueue = request.catch(() => {});

    return request;
}

export function getDrivers(sessionKey = "latest") {
    return fetchOpenF1(
        `${BASE_URL}/drivers?session_key=${sessionKey}`
    );
}

export function getSessionResults(sessionKey = "latest") {
    return fetchOpenF1(
        `${BASE_URL}/session_result?session_key=${sessionKey}`
    );
}

export function getMeetings() {
    return fetchOpenF1(`${BASE_URL}/meetings`);
}

export function getSessions(meetingKey) {
    return fetchOpenF1(
        `${BASE_URL}/sessions?meeting_key=${meetingKey}`
    );
}

export function getChampionshipDrivers(sessionKey) {
    return fetchOpenF1(
        `${BASE_URL}/championship_drivers?session_key=${encodeURIComponent(sessionKey)}`
    );
}

export function getChampionshipTeams(sessionKey) {
    return fetchOpenF1(
        `${BASE_URL}/championship_teams?session_key=${encodeURIComponent(sessionKey)}`
    );
}