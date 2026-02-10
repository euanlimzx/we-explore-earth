import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    filterTitle: {
        fontWeight: 700, /** bold */
        fontSize: 32,
    },
    filterHeaderWrapper:{
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    filterHeader: {
        fontWeight: 700, /** bold */
        fontSize: 24,
    },
    reset: {
        color: 'mediumgrey',
        textDecorationLine: 'underline',
    },
    filterOptionWrapper: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterOption: {
        fontWeight: 600, /** semi-bold */
        fontSize: 16,
    },
    submit: {
        marginTop: 24,
        padding: 4,
        borderRadius: 4,
        backgroundColor: 'lightgrey',
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 700, /** bold */
        fontSize: 16,
        color: '#3c3b3b',
    },
});