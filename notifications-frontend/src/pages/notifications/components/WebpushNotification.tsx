import { Box } from '@mui/system';
import {
    TextField,
    Button,
    Typography,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useSelectedApplication } from '../../../context/SelectedApplicationContext';
import AudienceList from './AudienceList';
import { webpushService } from '../../../services/webpush/webpush-service';
import FullPageLoader from '../../../components/full-page-loader/FullPageLoader';
import { useState } from 'react';

const initialValues = {
    webpush_title: "",
    webpush_message: "",
    webpush_image: "",
    webpush_link: "",
};

export default function WebpushNotification() {
    const [app] = useSelectedApplication()
    const [checked, setChecked] = useState<number[]>([]);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleOnSubmit,
    });
    const { refetch } = useQuery(
        'send-notification-request',
        async () => await webpushService.sendNotification(getPayload()),
        { enabled: false }
    )

    const { data, isFetching } = useQuery('get-audience-request', async () => await webpushService.getAudienceByApplicationId(app.id), { refetchOnWindowFocus: false })

    if (isFetching) return <FullPageLoader />

    async function handleOnSubmit() {
        const { error }: any = await refetch()
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success('Notificações enviadas com sucesso!')
    }

    function getPayload() {
        const jsons = checked.map(item => {
            const element = data?.data.data.audience.find((el: any) => el.id === item)
            return element.json;
        })
        const payload = checked.map(item => {
            return {
                webpush_title: formik.values.webpush_title,
                webpush_message: formik.values.webpush_message,
                webpush_image: formik.values.webpush_image,
                webpush_link: formik.values.webpush_link,
                applicationId: app.id,
                origin: 'Plataforma',
                jsons: jsons
            }
        });

        return payload[0]
    }

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Typography>Dados da mensagem</Typography>
                <Grid container spacing={2}>
                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Título"
                            name="webpush_title"
                            autoComplete="webpush_title"
                            autoFocus
                            value={formik.values.webpush_title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_title && Boolean(formik.errors.webpush_title)}
                            helperText={formik.touched.webpush_title && formik.errors.webpush_title}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Texto da mensagem"
                            name="webpush_message"
                            autoComplete="webpush_message"
                            autoFocus
                            value={formik.values.webpush_message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_message && Boolean(formik.errors.webpush_message)}
                            helperText={formik.touched.webpush_message && formik.errors.webpush_message}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Image do ícone"
                            name="webpush_image"
                            autoComplete="webpush_image"
                            autoFocus
                            value={formik.values.webpush_image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_image && Boolean(formik.errors.webpush_image)}
                            helperText={formik.touched.webpush_image && formik.errors.webpush_image}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Link de destino"
                            name="webpush_link"
                            autoComplete="webpush_link"
                            autoFocus
                            value={formik.values.webpush_link}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_link && Boolean(formik.errors.webpush_link)}
                            helperText={formik.touched.webpush_link && formik.errors.webpush_link}
                        />
                    </Grid>
                </Grid>

                <Typography>Audiência</Typography>
                <Grid container spacing={2}>
                    <Grid item xl={3} md={3}>
                        <AudienceList data={data?.data.data.audience} checked={checked} setChecked={setChecked} />
                    </ Grid>
                </Grid>

                <Box>
                    <Button variant="contained" type="submit" disabled={checked.length === 0}>Enviar Notificações</Button>
                </Box>
            </Box>
        </>
    )
}