import React, { useState } from 'react';
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit2, FiSave, FiX, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import type { AdminProfile } from '../../domain/entities/AdminEntities';

interface AdminAccountProps {
  profile: AdminProfile;
  onUpdate: (data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }) => Promise<void>;
}

export const AdminAccount: React.FC<AdminAccountProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (formData.newPassword && formData.newPassword.length < 8) newErrors.newPassword = 'Le mot de passe doit faire au moins 8 caractères';
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (formData.newPassword && !formData.currentPassword) newErrors.currentPassword = 'Mot de passe actuel requis pour changer le mot de passe';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updateData: { name?: string; email?: string; currentPassword?: string; newPassword?: string } = {
      name: formData.name,
      email: formData.email,
    };
    if (formData.currentPassword) updateData.currentPassword = formData.currentPassword;
    if (formData.newPassword) updateData.newPassword = formData.newPassword;

    await onUpdate(updateData);
    setIsEditing(false);
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name,
      email: profile.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const PasswordInput = ({ value, onChange, show, onToggleShow, placeholder, error, label }: {
    value: string;
    onChange: (v: string) => void;
    show: boolean;
    onToggleShow: () => void;
    placeholder: string;
    error?: string;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">{label}</label>
      <div className="relative flex items-center">
        <FiLock className="absolute left-4 text-slate-400 w-5 h-5" />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder={placeholder}
        />
        <button type="button" onClick={onToggleShow} className="absolute right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
          {show ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="text-sm font-bold text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 text-slate-800 dark:text-slate-100">
      <h1 className="text-3xl font-black text-blue-600 dark:text-blue-400">Mon compte</h1>

      {!isEditing ? (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 relative">
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-6 right-6 bg-blue-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-blue-700 transition shadow-md"
          >
            <FiEdit2 size={13} /> Modifier
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-950/80 p-4 rounded-full text-blue-600 dark:text-blue-400">
              <FiUser size={36} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{profile.name}</h2>
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-0.5 rounded-full mt-1.5 inline-block uppercase">
                {profile.role}
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Nom complet', value: profile.name, icon: FiUser },
              { label: 'Adresse email', value: profile.email, icon: FiMail },
              { label: 'Rôle', value: profile.role, icon: FiShield },
              { label: 'Membre depuis', value: profile.memberSince, icon: FiCalendar },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{field.label}</label>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 px-4 py-3 rounded-xl text-sm font-semibold border border-slate-100 dark:border-slate-700/30">
                  <field.icon className="text-slate-400 w-4 h-4" /> {field.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Modifier mon profil</h2>
            <button type="button" onClick={handleCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium">
              <FiX className="w-5 h-5" /> Annuler
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Nom complet</label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-4 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              {errors.name && <p className="text-sm font-bold text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Adresse email</label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-4 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              {errors.email && <p className="text-sm font-bold text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FiLock className="text-indigo-500" /> Changer le mot de passe</h3>
            <div className="space-y-4">
              <PasswordInput
                value={formData.currentPassword}
                onChange={v => setFormData(prev => ({ ...prev, currentPassword: v }))}
                show={showCurrentPassword}
                onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
                placeholder="Mot de passe actuel"
                label="Mot de passe actuel"
                error={errors.currentPassword}
              />
              <PasswordInput
                value={formData.newPassword}
                onChange={v => setFormData(prev => ({ ...prev, newPassword: v }))}
                show={showNewPassword}
                onToggleShow={() => setShowNewPassword(!showNewPassword)}
                placeholder="Nouveau mot de passe (min 8 caractères)"
                label="Nouveau mot de passe"
                error={errors.newPassword}
              />
              <PasswordInput
                value={formData.confirmPassword}
                onChange={v => setFormData(prev => ({ ...prev, confirmPassword: v }))}
                show={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                placeholder="Confirmer le nouveau mot de passe"
                label="Confirmer le nouveau mot de passe"
                error={errors.confirmPassword}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <button type="button" onClick={handleCancel} className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-xl hover:bg-slate-300 transition">
              Annuler
            </button>
            <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <FiSave className="w-5 h-5" /> Enregistrer
            </button>
          </div>
        </form>
      )}

      {/* Cartes Complémentaires */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-2">Statistiques du compte</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl text-center border border-blue-100/20">
            <h4 className="text-blue-600 dark:text-blue-400 text-xl font-black">Tous</h4>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Accès complet</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl text-center border border-emerald-100/20">
            <h4 className="text-emerald-600 dark:text-emerald-400 text-xl font-black">Actif</h4>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Statut du compte</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl flex items-center justify-center border border-blue-100/20">
            <h4 className="text-blue-600 dark:text-blue-400 text-xl font-black">2024</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;