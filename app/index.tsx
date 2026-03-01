import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Index() {
    const { user } = useSelector((state: RootState) => state.user);

    if (!user) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/(tabs)" />;
}
