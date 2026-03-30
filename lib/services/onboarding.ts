import axios from 'axios';

export async function registerAccount(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const res = await axios.post('/api/v1/auths/register', data, {
      withCredentials: true,
    });

    console.log('Registered:', res.data);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
}

export async function verifyEmailOtp(data: { otp: string }) {
  try {
    const res = await axios.post('/api/v1/auths/verify-email', data, {
      withCredentials: true,
    });

    console.log('OTP verified:', res.data);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'OTP verification failed',
      );
    }
    throw new Error('OTP verification failed');
  }
}

export async function resendEmailOtp() {
  try {
    const res = await axios.post(
      '/api/onboarding/resend-otp',
      {},
      { withCredentials: true },
    );

    console.log('OTP resent:', res.data);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Resend OTP failed');
    }
    throw new Error('Resend OTP failed');
  }
}

export async function setupProfile(data: {
  name: string;
  role: string;
  teamSize: string;
}) {
  console.log('profile onboarding', data);

  try {
    const res = await axios.post('/api/v1/onboarding/profile', data, {
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
    const res = await axios.post('/api/v1/onboarding/workspace', data, {
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
    const res = await axios.post('/api/v1/onboarding/workspace/invite', data, {
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

    const res = await axios.post('/api/v1/onboarding/goal', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data?.message || 'Goal setup failed');
    throw new Error('Goal setup failed');
  }
}

// ogin is not done

// export async function getDashboardStats() {
//   try {
//     const res = await axios.get('/api/v1/dashboard/stats', {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error))
//       throw new Error(
//         error.response?.data?.message || 'Failed to fetch dashboard',
//       );
//     throw new Error('Failed to fetch dashboard');
//   }
// }
