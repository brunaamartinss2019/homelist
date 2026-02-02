import { setupWorker } from 'msw/browser';
import { propertiesHandlers } from './properties'
import { handleLogin, handleRegister} from './auth';

export const worker = setupWorker(
    handleRegister,
    handleLogin,
    ...propertiesHandlers
);

export default worker;