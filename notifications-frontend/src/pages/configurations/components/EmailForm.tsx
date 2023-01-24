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
import { applicationConfigurationService } from '../../../services/application-configuration/application-configuration-service';

export default function EmailForm({ applicationConfiguration }: any) {
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
                <Typography>Dados técnicos do servidor</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Nome do Servidor SMTP"
                            name="email_smtp"
                            autoComplete="email_smtp"
                            autoFocus
                            value={formik.values.email_smtp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_smtp && Boolean(formik.errors.email_smtp)}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Porta de envio"
                            name="email_port"
                            autoComplete="email_port"
                            autoFocus
                            value={formik.values.email_port}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_port && Boolean(formik.errors.email_port)}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Login"
                            name="email_login"
                            autoComplete="email_login"
                            autoFocus
                            value={formik.values.email_login}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_login && Boolean(formik.errors.email_login)}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Senha"
                            type="password"
                            name="email_password"
                            autoComplete="email_password"
                            autoFocus
                            value={formik.values.email_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_password && Boolean(formik.errors.email_password)}
                        />
                    </Grid>
                </Grid>

                <Typography>Dados de envio</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={6} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Nome do remetente"
                            name="email_sender_name"
                            autoComplete="email_sender_name"
                            autoFocus
                            value={formik.values.email_sender_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_sender_name && Boolean(formik.errors.email_sender_name)}
                        />
                    </Grid>

                    <Grid item xl={6} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email do remetente"
                            name="email_sender_email"
                            autoComplete="email_sender_email"
                            autoFocus
                            value={formik.values.email_sender_email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_sender_email && Boolean(formik.errors.email_sender_email)}
                        />
                    </Grid>
                </Grid>

                <Typography>Submissão de templates</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={12} md={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Enviar template"
                            name="email_template"
                            autoComplete="email_template"
                            type="file"
                            autoFocus
                            multiline
                            rows={4}
                            value={formik.values.email_template}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_template && Boolean(formik.errors.email_template)}
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