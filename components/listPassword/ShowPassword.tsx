import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { PasswordType } from './PassWordType';

type Props = {
    item: PasswordType;
    onEdit?: (item: PasswordType) => void;
    onDelete?: (id: string) => void;
}

const ShowPassword = ({ item, onEdit, onDelete }: Props) => {
    const [show, setShow] = useState(false);

    return (
        <Animated.View
            entering={FadeInRight.duration(500)}
            style={styles.card}
        >
            <View style={styles.iconContainer}>
                <Icon name={item.icon || 'help'} size={24} color="#22E1FF" />
            </View>
            <View style={styles.info}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.credentialContainer}>
                    <Text style={styles.itemSubtitle}>{item.user}</Text>
                    {show && item.password && (
                        <Text style={styles.passwordText}>{item.password}</Text>
                    )}
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => setShow(!show)}>
                    <Icon
                        name={show ? "eye-off" : "eye"}
                        size={20}
                        color={show ? "#22E1FF" : "rgba(255,255,255,0.4)"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn}>
                    <Icon name="content-copy" size={18} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => onEdit?.(item)}
                >
                    <Icon name="pencil" size={18} color="#FF7E5F" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => item.id && onDelete?.(item.id)}
                >
                    <Icon name="delete" size={18} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        padding: 12,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        flex: 1,
        marginLeft: 12
    },
    itemTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '700'
    },
    credentialContainer: {
        marginTop: 2,
    },
    itemSubtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12
    },
    passwordText: {
        color: '#22E1FF',
        fontSize: 13,
        fontWeight: '900',
        marginTop: 3,
        letterSpacing: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        padding: 6,
        marginLeft: 1,
    }
});

export default ShowPassword;