import { auth } from '@/lib/firebase';
import { PhoneAuthProvider, signInWithCredential, User } from 'firebase/auth';

export type ConfirmHandle = { verify:(code:string)=>Promise<User> };

export async function startPhoneLogin(phoneE164: string, verifier: any): Promise<ConfirmHandle> {
  const provider = new PhoneAuthProvider(auth);
  const verificationId = await provider.verifyPhoneNumber(phoneE164, verifier);
  return {
    verify: async (code: string) => {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const { user } = await signInWithCredential(auth, credential);
      return user;
    },
  };
}





