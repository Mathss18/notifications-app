import { Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Box } from "@mui/system";
import { useSelectedApplication } from "../../../../context/SelectedApplicationContext";
import { toast } from "react-hot-toast";

export function ApplicationCard({ application }: any) {

    const [app, setApp] = useSelectedApplication()

    function selectApplication() {
        setApp(application)
        toast.success('Aplicação Selecionada')
    }

    return (
        <Card sx={{ display: 'flex', mt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {application.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {`Criado em: ${new Date(application.createdAt).toLocaleDateString("pt-BR")}`}
                    </Typography>
                </CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Webpush" color={application.webpush ? "success" : "default"} />
                            <Chip label="Email" color={application.email ? "success" : "default"} />
                            <Chip label="SMS" color={application.sms ? "success" : "default"} />
                        </Stack>
                    </Box>
                    <IconButton color="primary" size="small" style={{ marginBottom: 10, marginLeft: 40 }} onClick={selectApplication}>
                        <PlayCircleOutlineIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Card>
    );
}