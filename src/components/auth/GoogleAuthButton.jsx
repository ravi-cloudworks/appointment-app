import React, { useState, useEffect } from 'react';
import { signIn, signOut, isSignedIn, initGoogleAuth } from '../../lib/google/auth';

const GoogleAuthButton = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                await initGoogleAuth();
                setAuthenticated(isSignedIn());
            } catch (error) {
                console.error('Failed to initialize:', error);
            } finally {
                setLoading(false);
            }
        };

        if (window.google) {
            initialize();
        } else {
            // Wait for Google Identity Services to load
            window.addEventListener('load', initialize);
            return () => window.removeEventListener('load', initialize);
        }
    }, []);

    const handleSignIn = async () => {
        try {
            setLoading(true);
            await signIn();
            setAuthenticated(true);
        } catch (error) {
            console.error('Sign in failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = () => {
        try {
            signOut();
            setAuthenticated(false);
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    if (loading) {
        return (
            <button disabled className="px-4 py-2 bg-gray-200 rounded opacity-50 cursor-not-allowed">
                Loading...
            </button>
        );
    }

    return authenticated ? (
        <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
            Sign Out
        </button>
    ) : (
        <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
            Sign in with Google
        </button>
    );
};

export default GoogleAuthButton;