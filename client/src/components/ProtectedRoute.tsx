import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@/components/ui';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, status } = useAppSelector((s) => s.auth);

  if (status === 'loading') {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_components_protectedroute_tsx_808a">
        <Spinner size="lg" data-icod-id="src_components_protectedroute_tsx_442a" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
