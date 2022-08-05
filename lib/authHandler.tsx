import { useCallback } from 'react';
import { authorize } from 'react-native-app-auth';
import axios from 'axios';

const configs = {
    serviceConfiguration: {
        authorizationEndpoint: 'https://auth-staging.pod-point.com/oauth/authorize',
        tokenEndpoint: 'https://auth-staging.pod-point.com/api/v1/oauth/token',
    },
    clientId: '74',
    redirectUrl: 'com.podpoint.testapp://callback',
    additionalParameters: {},
    scopes: [],
};

const userInfoEndpoint = 'https://auth-staging.pod-point.com/api/v1/user';

export class AuthHandler {
    update: (isBusy: boolean, isLoggedIn: boolean, name: string) => void;

    constructor(update: (isBusy: boolean, isLoggedIn: boolean, name: string) => void) {
        this.update = update
    }

    getUserProfile = async (accessToken: string) => {
        try {
            const result = await axios.get(
                userInfoEndpoint,
                {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                    }
                });
            return result.data;
        } catch (error) {
            console.log(error);
        }
    };

    login = useCallback(async () => {
        try {
            this.update(true, false, '');

            const result = await authorize({
                ...configs,
            });
            console.log(result);

            const profile = await this.getUserProfile(result.accessToken);
            console.log(profile);

            this.update(false, true, profile.data.name);
        } catch (error) {
            console.log(error);
        }
    }, []);

    logout = useCallback(async () => {
        this.update(false, false, '')
    }, []);
}