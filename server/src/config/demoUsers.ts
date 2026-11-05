export interface DemoUser {
  email: string;
  password: string;
  role: string;
  name: string;
}

export const DEMO_USERS: DemoUser[] = [
  { email: 'admin@scentorax.com', password: 'Scentora@2024', role: 'admin', name: 'ScentoraX Admin' },
];
