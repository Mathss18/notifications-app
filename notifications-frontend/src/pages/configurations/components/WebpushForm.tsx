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
} from '@mui/material';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { applicationConfigurationService } from '../../../services/application-configuration/application-configuration-service';
import { useSelectedApplication } from '../../../context/SelectedApplicationContext';
import BundleModal from './BundleModal';
import { useState } from 'react';
import { webpushService } from '../../../services/webpush/webpush-service';

export default function WebpushForm({ applicationConfiguration }: any) {
    const [app] = useSelectedApplication()
    const [open, setOpen] = useState(false);
    const [bundle, setBundle] = useState('');
    const formik = useFormik({
        initialValues: applicationConfiguration,
        onSubmit: handleOnSubmit,
    });

    const { refetch: createAppConfig } = useQuery(
        'create-application-configuration-request',
        () => getFunctionType(),
        { enabled: false }
    )

    const { refetch: createBundle } = useQuery(
        'create-application-bundle-request',
        () => webpushService.createWebpushBundle({ applicationId: app.id }),
        { enabled: false }
    )

    async function handleOnSubmit() {
        const { error }: any = await createAppConfig()
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success('Configurações salvas com sucesso!')
    }

    async function getFunctionType() {
        return formik.values?.id ? await applicationConfigurationService.updateApplicationConfiguration(formik.values?.id, formik.values) : await applicationConfigurationService.createApplicationConfiguration(formik.values)
    }

    async function generateIntegrationBundle() {
        const { data, error }: any = await createBundle()
        if (error) {
            toast.error(error.message)
            return
        }
        setBundle(data.data.data.bundle)
        setOpen(true)
    }

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Typography>Dados básicos</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Nome do site"
                            name="webpush_website_name"
                            autoComplete="webpush_website_name"
                            autoFocus
                            value={formik.values.webpush_website_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_website_name && Boolean(formik.errors.webpush_website_name)}
                            helperText={formik.touched.webpush_website_name && formik.errors.webpush_website_name}
                        />
                    </Grid>

                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Endereço do site"
                            name="webpush_website_url"
                            autoComplete="webpush_website_url"
                            autoFocus
                            value={formik.values.webpush_website_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_website_url && Boolean(formik.errors.webpush_website_url)}
                            helperText={formik.touched.webpush_website_url && formik.errors.webpush_website_url}
                        />
                    </Grid>

                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Ícone da aplicação"
                            name="webpush_website_image"
                            autoComplete="webpush_website_image"
                            autoFocus
                            value={formik.values.webpush_website_image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_website_image && Boolean(formik.errors.webpush_website_image)}
                            helperText={formik.touched.webpush_website_image && formik.errors.webpush_website_image}
                        />
                    </Grid>
                </Grid>

                <Typography>Configuração de notificações de permissões</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Texto da mensagem"
                            name="webpush_permisson_text"
                            autoComplete="webpush_permisson_text"
                            autoFocus
                            value={formik.values.webpush_permisson_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_permisson_text && Boolean(formik.errors.webpush_permisson_text)}
                            helperText={formik.touched.webpush_permisson_text && formik.errors.webpush_permisson_text}
                        />
                    </Grid>

                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Texto do botão Permitir"
                            name="webpush_permisson_allow_button_text"
                            autoComplete="webpush_permisson_allow_button_text"
                            autoFocus
                            value={formik.values.webpush_permisson_allow_button_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_permisson_allow_button_text && Boolean(formik.errors.webpush_permisson_allow_button_text)}
                            helperText={formik.touched.webpush_permisson_allow_button_text && formik.errors.webpush_permisson_allow_button_text}
                        />
                    </Grid>

                    <Grid item xl={4} md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Texto do botão Negar"
                            name="webpush_permisson_deny_button_text"
                            autoComplete="webpush_permisson_deny_button_text"
                            autoFocus
                            value={formik.values.webpush_permisson_deny_button_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_permisson_deny_button_text && Boolean(formik.errors.webpush_permisson_deny_button_text)}
                            helperText={formik.touched.webpush_permisson_deny_button_text && formik.errors.webpush_permisson_deny_button_text}
                        />
                    </Grid>
                </Grid>

                <Typography>Configuração da notificação de boas vindas</Typography>

                <Grid container spacing={2}>
                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Título da notificação"
                            name="webpush_welcome_title"
                            autoComplete="webpush_welcome_title"
                            autoFocus
                            value={formik.values.webpush_welcome_title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_welcome_title && Boolean(formik.errors.webpush_welcome_title)}
                        />
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Texto da mensagem"
                            name="webpush_welcome_text"
                            autoComplete="webpush_welcome_text"
                            autoFocus
                            value={formik.values.webpush_welcome_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_welcome_text && Boolean(formik.errors.webpush_welcome_text)}
                            helperText={formik.touched.webpush_welcome_text && formik.errors.webpush_welcome_text}
                        />
                    </Grid>

                    <Grid item xl={3} md={3} style={{ marginTop: 15 }}>
                        <FormControl fullWidth>
                            <InputLabel>Habilitar / Desabilitar link de destino *</InputLabel>
                            <Select
                                label="Tipo de Cliente "
                                name="webpush_redirect_url_enabled"
                                value={formik.values.webpush_redirect_url_enabled}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.webpush_redirect_url_enabled &&
                                    Boolean(formik.errors.webpush_redirect_url_enabled)
                                }
                            >
                                <MenuItem value={true}>Habilitado</MenuItem>
                                <MenuItem value={false}>Desabilitado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xl={3} md={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Endereço do link de destino"
                            name="webpush_redirect_url"
                            autoComplete="webpush_redirect_url"
                            autoFocus
                            value={formik.values.webpush_redirect_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.webpush_redirect_url && Boolean(formik.errors.webpush_redirect_url)}
                        />
                    </Grid>
                </Grid>

                <Box>
                    <Button variant="contained" type="submit">Salvar</Button>
                    <Button variant="contained" onClick={generateIntegrationBundle} color='secondary' style={{ marginLeft: 10 }}>Integrar</Button>
                </Box>
            </Box>

            <BundleModal open={open} setOpen={setOpen} bundle={bundle} />
        </>
    )
}