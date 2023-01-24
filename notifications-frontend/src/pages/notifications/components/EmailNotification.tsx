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
import { emailService } from '../../../services/email/email-service';

const initialValues = {
    applicationId: null,
    email_receiver: "",
    subject: "Assunto Importante!",
    text: "Assunto Importante!"
};

export default function EmailNotification() {
    const [app] = useSelectedApplication()

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleOnSubmit,
    });
    const { refetch } = useQuery(
        'send-notification-request',
        async () => await emailService.sendNotification(getPayload()),
        { enabled: false }
    )

    function getPayload() {
        return {
            applicationId: app.id,
            senderEmails: formik.values.email_receiver,
            subject: formik.values.subject,
            text: formik.values.text,
            origin: "Plaraforma"
        }
    }


    async function handleOnSubmit() {
        formik.setFieldValue('applicationId', app.id)

        const { error }: any = await refetch()
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success('Emails enviados com sucesso!')
    }

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Typography>Configurar notificações</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={6} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Emails dos destinatários"
                            name="email_receiver"
                            autoComplete="email_receiver"
                            autoFocus
                            value={formik.values.email_receiver}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_receiver && Boolean(formik.errors.email_receiver)}
                            helperText={formik.touched.email_receiver && formik.errors.email_receiver}
                        />
                    </Grid>
                </Grid>

                <Box>
                    <Button type="submit" >Salvar</Button>
                </Box>
            </Box>
        </>
    )
}