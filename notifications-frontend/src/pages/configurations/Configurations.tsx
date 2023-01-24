import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WebpushForm from './components/WebpushForm';
import EmailForm from './components/EmailForm';
import SmsForm from './components/SmsForm';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { applicationConfigurationService } from '../../services/application-configuration/application-configuration-service';
import { useSelectedApplication } from '../../context/SelectedApplicationContext';
import FullPageLoader from '../../components/full-page-loader/FullPageLoader';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Configurations() {
  const [app] = useSelectedApplication()
  const [value, setValue] = useState(0);
  const initialValuesWebpush = {
    applicationId: app.id,
    webpush_website_name: "",
    webpush_website_url: "",
    webpush_website_image: "",
    webpush_permisson_text: "",
    webpush_permisson_allow_button_text: "",
    webpush_permisson_deny_button_text: "",
    webpush_welcome_title: "",
    webpush_welcome_text: "",
    webpush_redirect_url_enabled: false,
    webpush_redirect_url: "",
  };

  const initialValuesEmail = {
    applicationId: app.id,
    email_smtp: "",
    email_port: "",
    email_login: "",
    email_password: "",
    email_sender_name: "",
    email_sender_email: "",
    email_template: "",
  };

  const initialValuesSms = {
    applicationId: app.id,
    sms_provider: "",
    sms_login: "",
    sms_password: "",
  }

  const { data, isFetching, error } = useQuery('get-one-application-configuration-request', () => applicationConfigurationService.getOneApplicationConfiguration(app?.id), { retry: 0, refetchOnWindowFocus: false })

  if (isFetching) return <FullPageLoader />

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Selecione" disabled />
          <Tab label="Webpush" disabled={!app?.webpush} />
          <Tab label="E-mail" disabled={!app?.email} />
          <Tab label="SMS" disabled={!app?.sms} />
        </Tabs>

      </Box>
      <TabPanel value={value} index={0}>
        <h1>Selecione uma aba para configurar seu aplicativo.</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WebpushForm applicationConfiguration={error ? initialValuesWebpush : data?.data?.data.applicationConfiguration} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmailForm applicationConfiguration={error ? initialValuesEmail : data?.data?.data.applicationConfiguration} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SmsForm applicationConfiguration={error ? initialValuesSms : data?.data?.data.applicationConfiguration} />
      </TabPanel>
    </Box>
  );
}