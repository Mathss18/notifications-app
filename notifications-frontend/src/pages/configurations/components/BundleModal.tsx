import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-hot-toast';

export default function BundleModal({ open, setOpen, bundle }: any) {
  const sw = `self.addEventListener("push",i=>{var{title:t,body:n,icon:a,tag:o,actions:e,data:d}=i.data.json();i.waitUntil(self.registration.showNotification(t,{body:n,icon:a,tag:o,actions:e,data:d}))}),self.addEventListener("notificationclick",i=>{console.log(i);let{url:t}=i.notification.data;clients.openWindow(t)});`;

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast('Copiado para a área de transferencia.')
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle>
          Instruções de Integração
        </DialogTitle>
        <DialogContent>
          <h4>Service Worker: Crie um arquivo chamado <i style={{ color: 'red' }}>sw.js</i> em seu projeto e cole o seguinte código</h4>
          <DialogContentText>
            {sw}
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => copyToClipboard(sw)}>Copiar Service Worker</Button>
          </DialogActions>
          <hr></hr>
          <h4>Código Bundle: Cole o código abaixo no fim da tag <i style={{ color: 'red' }}>{`<body />`}</i> em seu projeto</h4>
          <DialogContentText>
            {bundle}
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => copyToClipboard(bundle)}>Copiar Bundle</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}