const CLIENT_ID = '344313430701-idcjpv974tofcd2c8mef08ri1hiec341.apps.googleusercontent.com'; // Your actual client ID here

let tokenClient = null;

export async function initGoogleAuth() {
    if (!tokenClient) {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
            callback: (response) => {
                if (response.access_token) {
                    localStorage.setItem('google_access_token', response.access_token);
                }
            },
        });
    }
    return tokenClient;
}

export async function signIn() {
    const client = await initGoogleAuth();
    return new Promise((resolve) => {
        client.callback = (response) => {
            if (response.access_token) {
                localStorage.setItem('google_access_token', response.access_token);
                resolve(response);
            }
        };
        client.requestAccessToken({ prompt: 'consent' });
    });
}

export function signOut() {
    const token = localStorage.getItem('google_access_token');
    if (token) {
        google.accounts.oauth2.revoke(token, () => {
            localStorage.removeItem('google_access_token');
        });
    }
}

export function isSignedIn() {
    return !!localStorage.getItem('google_access_token');
}