import { useEffect, useState } from 'react';
import { verifyTelegramUser } from '../auth';

export default function DebugVerify() {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    verifyTelegramUser()
      .then(res => setState({ status: 'ok', res }))
      .catch(e => setState({ status: 'err', err: String(e) }));
  }, []);

  return (
    <pre style={{
      whiteSpace: 'pre-wrap',
      background: 'rgba(255,255,255,0.10)',
      color: '#fff',
      padding: 12, borderRadius: 10, marginTop: 12, fontSize: 12
    }}>
      {state.status === 'loading' && 'Проверяем initData...'}
      {state.status === 'ok' && JSON.stringify(state.res, null, 2)}
      {state.status === 'err' && `Ошибка: ${state.err}`}
    </pre>
  );
}
