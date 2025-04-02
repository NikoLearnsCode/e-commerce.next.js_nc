import type {Metadata} from 'next';
import SignInForm from './sign-in-form';

export const metadata: Metadata = {
  title: 'Logga in',
};

export default async function Login() {
  return <SignInForm />;
}
