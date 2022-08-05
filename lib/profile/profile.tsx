import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Styles from '../styles/styles';
import { AuthHandler } from '../authHandler';

const profilePage = (authHandler: AuthHandler, name: string) => {
    return (
        <View style={Styles.centeredSection}>
            <Text style={{ textAlign: 'center', paddingBottom: 48 }}>Name: {name}</Text>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => authHandler.logout()}
            >
                <Text style={Styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
};

export default profilePage;