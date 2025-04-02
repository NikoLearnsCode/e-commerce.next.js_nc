import type {Metadata} from 'next';
import PasswordResetUI from './password-reset';

export const metadata: Metadata = {
  title: 'Återställ lösenord',
};

export default async function PasswordReset() {
  return <PasswordResetUI />;
}