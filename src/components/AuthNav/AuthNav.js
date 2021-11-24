import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div>
      <NavLink className={s.navRegister} to="/register">
        Registration
      </NavLink>
      <NavLink className={s.navRegister} to="/login">
        login
      </NavLink>
    </div>
  );
}
