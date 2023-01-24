import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HistoryIcon from '@mui/icons-material/History';

export const menuItems = [
    {
        title: 'Home',
        path: '/home',
        icon: <HomeIcon />,
    },
    {
        title: 'Configurations',
        path: '/configurations',
        icon: <SettingsIcon />,
    },
    {
        title: 'Notificar',
        path: '/notifications',
        icon: <NotificationsNoneIcon />,
    },
    {
        title: 'Histórico',
        path: '/history',
        icon: <HistoryIcon />,
    },
]