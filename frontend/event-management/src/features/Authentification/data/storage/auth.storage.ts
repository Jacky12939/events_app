const TOKEN_KEY = 'access_token';

export const AuthStorage = {
  /**
   * Sauvegarde le jeton d'authentification après connexion ou inscription
   */
  saveToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du token dans le localStorage", error);
    }
  },

  /**
   * Récupère le jeton stocké
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Erreur lors de la récupération du token depuis le localStorage", error);
      return null;
    }
  },

  /**
   * Supprime le jeton lors de la déconnexion
   */
  clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Erreur lors de la suppression du token du localStorage", error);
    }
  },

  /**
   * Vérifie si un utilisateur possède une session active
   */
  hasValidSession(): boolean {
    return this.getToken() !== null;
  }
};