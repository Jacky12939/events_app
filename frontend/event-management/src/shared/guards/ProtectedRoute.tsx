import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthStorage } from '../../features/Authentification/data/storage/auth.storage';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: string[]; // Liste optionnelle des rôles autorisés (ex: ['ADMIN'])
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  // 1. Vérification globale de la session via le stockage dédié
  const isAuthenticated = AuthStorage.hasValidSession();

  if (!isAuthenticated) {
    // Redirection automatique vers la page de connexion si non connecté
    return <Navigate to="/login" replace />;
  }

  // 2. Vérification des droits et rôles applicatifs
  if (allowedRoles && allowedRoles.length > 0) {
    // Récupération de l'utilisateur stocké (souvent sous forme de chaîne JSON)
    const userString = localStorage.getItem('user');
    let userRole = 'PARTICIPANT';

    if (userString) {
      try {
        const user = JSON.parse(userString);
        userRole = user.role || localStorage.getItem('user_role') || 'PARTICIPANT';
      } catch (e) {
        // Repli sur la clé directe si le JSON global n'est pas utilisé
        userRole = localStorage.getItem('user_role') || 'PARTICIPANT';
      }
    } else {
      userRole = localStorage.getItem('user_role') || 'PARTICIPANT';
    }

    // Sécurisation de la comparaison : on passe tout en MAJUSCULES pour éviter les conflits
    const cleanUserRole = userRole.toUpperCase();
    const cleanAllowedRoles = allowedRoles.map(role => role.toUpperCase());

    const isAuthorized = cleanAllowedRoles.includes(cleanUserRole);

    if (!isAuthorized) {
      // Redirection vers la page "Accès Interdit" si le rôle ne correspond pas
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si tout est valide, on affiche la page protégée
  return children;
};