import { Box } from '@mui/system';
import {
    TextField,
    Button,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useSelectedApplication } from '../../../context/SelectedApplicationContext';
import { applicationConfigurationService } from '../../../services/application-configuration/application-configuration-service';

const initialValues = {
    applicationId: null,
    email_fone: "",
    email_text: "",
};

export default function SmsNotification() {
    const [app, setApp] = useSelectedApplication()

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleOnSubmit,
        // validationSchema: createApplicationModalValidator,
    });
    const { refetch } = useQuery(
        'create-application-configuration-request',
        async () => await applicationConfigurationService.createApplicationConfiguration(formik.values),
        { enabled: false }
    )


    async function handleOnSubmit() {
        formik.setFieldValue('applicationId', app.id)

        const { error }: any = await refetch()
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success('Configurações salvas com sucesso!')
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
                            label="Telefone dos usuários"
                            name="email_fone"
                            autoComplete="email_fone"
                            autoFocus
                            value={formik.values.email_fone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_fone && Boolean(formik.errors.email_fone)}
                            helperText={formik.touched.email_fone && formik.errors.email_fone}
                        />
                    </Grid>

                    <Grid item xl={6} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Texto da mensagem"
                            name="email_text"
                            autoComplete="email_text"
                            autoFocus
                            value={formik.values.email_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_text && Boolean(formik.errors.email_text)}
                            helperText={formik.touched.email_text && formik.errors.email_text}
                        />
                    </Grid>
                </Grid>

                <Box>
                    {/* <Button onClick={() => setOpen(false)}>Cancel</Button> */}
                    <Button type="submit" >Salvar</Button>
                </Box>
            </Box>
        </>
    )
}