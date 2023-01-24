import AddIcon from '@mui/icons-material/Add';
import {
    Stack,
    Box,
    Typography,
    Container,
    Button,
    Fab
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FullPageLoader from '../../components/full-page-loader/FullPageLoader';
import { applicationService } from '../../services/application/application-service';
import { ApplicationCard } from './components/ApplicationCard/ApplicationCard';
import CreateApplicationModal from './components/CreateApplicationModal/CreateApplicationModal';

export default function Home() {
    const [open, setOpen] = useState(false);

    const { data, isFetching } = useQuery('get-applications-request', async () => await applicationService.getAll(), { refetchOnWindowFocus: false })
    const applications = data?.data.data.applications ?? []

    if (isFetching) return <FullPageLoader />

    return (
        <main>
            <Container maxWidth="xl">
                {
                    applications.length > 0 ?
                        <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                            <Fab
                                onClick={() => { setOpen(true) }}
                                variant="extended"
                                color="primary"
                                style={{
                                    margin: 20,
                                    top: "auto",
                                    right: 0,
                                    bottom: 0,
                                    left: "auto",
                                    position: "fixed",
                                }}
                            >
                                <AddIcon sx={{ mr: 1 }} />
                                Criar aplicação
                            </Fab>
                            {
                                applications.map((application: any) => {
                                    return (
                                        <div style={{ width: 300 }} key={application.id}>
                                            <ApplicationCard application={application} />
                                        </div>
                                    )
                                })
                            }
                        </Box>
                        : <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Crie sua primeira aplicação!
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                Para utilizar as ferramentas de nosso sistema, é importante criar uma aplicação.
                                Uma aplicação é onde você gerencia suas notificações.
                            </Typography>
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Criar aplicação</Button>
                            </Stack>
                        </Box>
                }
                <CreateApplicationModal open={open} setOpen={setOpen} />
            </Container>
        </main>
    );
}