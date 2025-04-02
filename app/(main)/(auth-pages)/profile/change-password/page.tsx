import ChangePassword from './change-password';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Byt lösenord',
};

export default function page() {
  return <ChangePassword />;
}
