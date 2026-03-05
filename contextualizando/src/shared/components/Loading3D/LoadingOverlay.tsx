import { Loading3D } from './Loading3D';
import './Loading3D.css';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Carregando dados...' }: LoadingOverlayProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.95)',
      zIndex: 9999,
      gap: '24px'
    }}>
      <Loading3D />
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        color: '#666',
        margin: 0
      }}>
        {message}
      </p>
    </div>
  );
}
