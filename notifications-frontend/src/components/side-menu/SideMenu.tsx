import {
    IconButton,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Toolbar,
    Typography

} from "@mui/material";
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useMenu } from "../../context/SideMenuContext";
import { menuItems } from "./components/menu-items";
import { useNavigate } from "react-router-dom";
import { useSelectedApplication } from "../../context/SelectedApplicationContext";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function SideMenu({ children }: any) {

    const navigate = useNavigate();
    const [openSideMenu, setOpenSideMenu] = useMenu();

    const toggleSideMenu = () => setOpenSideMenu(!openSideMenu);
    const [app, setApp] = useSelectedApplication()


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={openSideMenu}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleSideMenu}
                        sx={{
                            marginRight: '36px',
                            ...(openSideMenu && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {app ? app.name : 'Nenhuma aplicação selecionada'}
                    </Typography>
                    <IconButton color="error" size="large" onClick={() => { localStorage.clear(); navigate('/login') }}>
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openSideMenu}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleSideMenu}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {menuItems.map((item) => {
                        return (
                            <ListItem onClick={() => navigate(item.path)} key={item.title} sx={{ cursor: "pointer" }}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <div style={{ paddingTop: 70, paddingLeft: 30, width: '100vw', height: '100vh' }}>
                {children}
            </div>
        </Box>
    );
}

export default SideMenu;
