import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WebpushNotification from './components/WebpushNotification';
import EmailNotification from './components/EmailNotification';
import SmsNotification from './components/SmsNotification';
import { useSelectedApplication } from '../../context/SelectedApplicationContext';
import { SyntheticEvent, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
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

export default function Notifications() {
  const [app] = useSelectedApplication()
  const [value, setValue] = useState(0);

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
        <WebpushNotification />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmailNotification />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SmsNotification />
      </TabPanel>
    </Box>
  );
}