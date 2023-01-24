import { Box } from '@mui/system';
import {
    TextField,
    Button,
    Typography,
    Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { applicationConfigurationService } from '../../../services/application-configuration/application-configuration-service';

export default function SmsForm({ applicationConfiguration }: any) {
    const formik = useFormik({
        initialValues: applicationConfiguration,
        onSubmit: handleOnSubmit,
    });

    const { refetch } = useQuery(
        'create-application-configuration-request',
        () => getFunctionType(),
        { enabled: false }
    )

    async function handleOnSubmit() {
        const { error }: any = await refetch()
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success('Configurações salvas com sucesso!')
    }

    async function getFunctionType() {
        return formik.values?.id ? await applicationConfigurationService.updateApplicationConfiguration(formik.values?.id, formik.values) : await applicationConfigurationService.createApplicationConfiguration(formik.values)
    }

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Typography>Envio de SMS</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Provedor de SMS integrado"
                            name="sms_provider"
                            autoFocus
                            value={formik.values.sms_provider}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sms_provider && Boolean(formik.errors.sms_provider)}
                        />
                    </Grid>

                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Login"
                            name="sms_login"
                            autoFocus
                            value={formik.values.sms_login}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sms_login && Boolean(formik.errors.sms_login)}
                        />
                    </Grid>

                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Senha"
                            name="sms_password"
                            autoComplete="sms_password"
                            autoFocus
                            type="password"
                            value={formik.values.sms_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sms_password && Boolean(formik.errors.sms_password)}
                        />
                    </Grid>
                </Grid>

                <Box>
                    <Button variant="contained" type="submit" >Salvar</Button>
                </Box>
            </Box>
        </>
    )
}