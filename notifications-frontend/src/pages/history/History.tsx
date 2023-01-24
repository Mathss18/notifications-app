import {
    Button,
    Container,
} from '@mui/material';
import { useQuery } from 'react-query';
import FullPageLoader from '../../components/full-page-loader/FullPageLoader';
import { useSelectedApplication } from '../../context/SelectedApplicationContext';
import { notificationService } from '../../services/notification/notification-service';
import MUIDataTable from "mui-datatables";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function History() {
    const [app] = useSelectedApplication()
    const { data, isFetching, refetch } = useQuery('get-notifications-request', async () => await notificationService.getAllByApplicationId(app.id), { refetchOnWindowFocus: false })
    const notifications = data?.data.data ?? []
    console.log(notifications)

    function getData() {
        var data = [];
        data = notifications.map((element: any) => {
            return [
                element.id,
                element.channel,
                element.origin,
                new Date(element.createdAt).toLocaleString(),
            ];
        });

        return data;
    }

    const columns = ["ID", "Canal", "Origem", "Data de envio"];
    const options: any = {
        selectableRowsHideCheckboxes: true,
    };

    if (isFetching) return <FullPageLoader />

    return (
        <Container maxWidth="xl">
            <h1>Histórico de Notificações</h1>
            <Button startIcon={<RefreshIcon />} onClick={() => refetch()}>Atualizar</Button>
            <MUIDataTable
                title={"Notificações"}
                data={getData()}
                columns={columns}
                options={options}
            />
        </Container>
    );
}








