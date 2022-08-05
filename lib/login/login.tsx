import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';

import Styles from '../styles/styles';
import { AuthHandler } from '../authHandler';

const loginPage = (authHandler: AuthHandler) => {
    return (
        <TouchableOpacity
            style={Styles.button}
            onPress={() => authHandler.login()}
        >
            <Text style={Styles.buttonText}>Login</Text>
        </TouchableOpacity>
    )
};

export default loginPage;