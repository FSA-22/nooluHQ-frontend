import axios from 'axios';

export async function registerAccount(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const res = await axios.post('/api/onboarding/register', data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Registration failed');
  }
}
export async function verifyEmailOtp(data: { otp: string; sessionId: string }) {
  try {
    const res = await axios.post('/api/onboarding/verify-otp', data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || 'Verification failed');
  }
}
export async function resendEmailOtp(sessionId: string) {
  try {
    const res = await axios.post(
      '/api/onboarding/resend-otp',
      { sessionId },
      { withCredentials: true },
    );

    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Resend failed');
  }
}
export async function setupProfile(data: {
  name: string;
  role: string;
  teamSize: string;
}) {
  console.log('profile onboarding', data);

  try {
    const res = await axios.post('/api/onboarding/profile', data, {
      withCredentials: true,
    });

    console.log('Profile created:', res.data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Profile setup failed');
    }
    throw new Error('Profile setup failed');
  }
}
export async function createWorkspace(data: { name: string }) {
  console.log('focus body', data);

  try {
    const res = await axios.post('/api/onboarding/workspace', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(
        error.response?.data?.message || 'Workspace creation failed',
      );
    throw new Error('Workspace creation failed');
  }
}
export const inviteTeammate = async (data: { emails: string[] }) => {
  console.log('invite onboarding body', data);

  try {
    const res = await axios.post('/api/onboarding/workspace/invite', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data?.message || 'Invite failed');
    throw new Error('Invite failed');
  }
};

export async function setupGoal(data: { focusId: string }) {
  try {
    console.log('focus onboarding', data);

    const res = await axios.post('/api/onboarding/goal', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data?.message || 'Goal setup failed');
    throw new Error('Goal setup failed');
  }
}
