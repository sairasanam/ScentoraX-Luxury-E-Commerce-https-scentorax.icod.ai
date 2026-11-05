import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, register, clearError } from '@/store/slices/authSlice';
import { Button, Input, Field, Alert, Card } from '@/components/ui';
import { DEMO_CREDENTIALS } from '@/config/demoUsers';

export default function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((s) => s.auth);
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    if (tab === 'login') {
      dispatch(login({ email: formData.email, password: formData.password })).then((res) => {
        if (!('error' in res)) navigate('/');
      });
    } else {
      dispatch(register(formData)).then((res) => {
        if (!('error' in res)) navigate('/');
      });
    }
  };

  const fillDemo = () => {
    setFormData({ ...formData, email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 pt-16"
      data-icod-id="src_pages_auth_tsx_206e">
      <Card
        className="w-full max-w-md border-border/40 p-8"
        data-icod-id="src_pages_auth_tsx_f48d">
        <div className="mb-8 text-center" data-icod-id="src_pages_auth_tsx_37ef">
          <h1
            className="font-serif text-2xl font-bold text-foreground"
            data-icod-id="src_pages_auth_tsx_cb5f">
            <span className="text-primary" data-icod-id="src_pages_auth_tsx_ead5">Scentora</span>X
          </h1>
          <p
            className="mt-2 text-sm text-muted-foreground"
            data-icod-id="src_pages_auth_tsx_fd43">Welcome to the world of luxury fragrance</p>
        </div>

        {/* Tabs */}
        <div
          className="mb-6 flex rounded-lg bg-muted p-1"
          data-icod-id="src_pages_auth_tsx_86d7">
          {(['login', 'register'] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); dispatch(clearError()); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-luxury ${
                tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              data-icod-id={`src_pages_auth_tsx_443c_${t}`}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {error && <Alert variant="error" className="mb-4" data-icod-id="src_pages_auth_tsx_67d6">{error}</Alert>}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-icod-id="src_pages_auth_tsx_080e">
          {tab === 'register' && (
            <Field label="Full Name" required data-icod-id="src_pages_auth_tsx_ed18">
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Your full name"
                data-icod-id="src_pages_auth_tsx_3091" />
            </Field>
          )}
          <Field label="Email" required data-icod-id="src_pages_auth_tsx_4239">
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="your@email.com"
              data-icod-id="src_pages_auth_tsx_e217" />
          </Field>
          <Field label="Password" required data-icod-id="src_pages_auth_tsx_4366">
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="Enter your password"
              data-icod-id="src_pages_auth_tsx_dde9" />
          </Field>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={status === 'loading'}
            data-icod-id="src_pages_auth_tsx_0c5a">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {tab === 'login' && (
          <div
            className="mt-6 border-t border-border/40 pt-4"
            data-icod-id="src_pages_auth_tsx_ffd9">
            <p
              className="mb-2 text-center text-xs text-muted-foreground"
              data-icod-id="src_pages_auth_tsx_b963">Demo account available:</p>
            <button
              onClick={fillDemo}
              className="w-full rounded-lg border border-dashed border-border/60 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-luxury"
              data-icod-id="src_pages_auth_tsx_b35a">
              Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
