import { Box } from '@mui/system';
import {
    FormControlLabel,
    Switch,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';
import { useFormik } from 'formik';
import { useQuery, useQueryClient } from 'react-query';
import { createApplicationModalValidator } from './validation/CreateApplicationModalValidation';
import { applicationService } from '../../../../services/application/application-service';
import { toast } from 'react-hot-toast';

const initialValues = {
    name: "APP-",
    webpush: true,
    email: true,
    sms: true,
};

export default function CreateApplicationModal({ open, setOpen }: any) {
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleOnSubmit,
        validationSchema: createApplicationModalValidator,
    });
    const { refetch } = useQuery(
        'create-application-request',
        async () => await applicationService.createApplication(formik.values),
        { enabled: false }
    )
    const queryClient = useQueryClient();


    async function handleOnSubmit() {
        const { error }: any = await refetch()
        if (error) {
            toast.error(error.message)
            return
        }
        await queryClient.invalidateQueries('get-applications-request')
        toast.success('Aplicação cadastrada com sucesso!')
        setOpen(false)

    }
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                    <DialogTitle>Crie uma aplicação</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor, preencha corretamente os dados para criar uma aplicação.
                        </DialogContentText>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome da aplicação"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formik.values.webpush}
                                        onChange={formik.handleChange}
                                        name="webpush"
                                        type="checkbox"
                                    />
                                }
                                label="Ativar notificações Webpush"
                            />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formik.values.email}
                                        onChange={formik.handleChange}
                                        name="email"
                                        type="checkbox"
                                    />
                                }
                                label="Ativar notificações via Email"
                            />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formik.values.sms}
                                        onChange={formik.handleChange}
                                        name="sms"
                                        type="checkbox"
                                    />
                                }
                                label="Ativar notificações via SMS"
                            />
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" >Cadastrar</Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </div>
    );
}