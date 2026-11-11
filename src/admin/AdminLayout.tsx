
import React, { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import { supabase } from '../lib/supabase';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let active = true;

    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (active) {
          navigate('/admin/login', { replace: true });
        }
        return;
      }

      const { data, error } = await supabase.rpc('is_pcj_admin');

      if (error || data !== true) {
        await supabase.auth.signOut();

        if (active) {
          navigate('/admin/login', { replace: true });
        }
        return;
      }

      if (active) {
        setCheckingAuth(false);
      }
    };

    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && active) {
        navigate('/admin/login', { replace: true });
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Properties', path: '/admin/properties' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Enquiries', path: '/admin/enquiries' },
    { name: 'Locations', path: '/admin/locations' },
  ];

  if (checkingAuth) {
    return <div style={{ padding: '40px' }}>Checking admin access...</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f5f6fa',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          minWidth: '250px',
          backgroundColor: '#172033',
          color: '#ffffff',
          padding: '30px 20px',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            fontSize: '21px',
            marginBottom: '8px',
          }}
        >
          PCJ Admin
        </h2>

        <p
          style={{
            fontSize: '12px',
            color: '#aab4c5',
            marginBottom: '35px',
          }}
        >
          Property Consultants
        </p>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              style={({ isActive }) => ({
                display: 'block',
                padding: '13px 15px',
                borderRadius: '7px',
                textDecoration: 'none',
                color: '#ffffff',
                backgroundColor: isActive ? '#344563' : 'transparent',
                fontWeight: isActive ? 'bold' : 'normal',
                transition: 'background-color 0.2s',
              })}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            marginTop: '40px',
            padding: '12px',
            backgroundColor: '#b83232',
            color: '#ffffff',
            border: 'none',
            borderRadius: '7px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: '30px',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
