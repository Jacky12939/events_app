import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useEventActions } from '../hooks/useEvents';
import { EventRepositoryImpl } from '../../data/impRepository/EventRepositoryImpl';

const schema = z.object({
  title: z.string().min(3, 'Titre requis (min 3 caractères)'),
  description: z.string().min(10, 'Description requise (min 10 caractères)'),
  location: z.string().min(3, 'Lieu requis'),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().min(1, 'Date de fin requise'),
  capacity: z.coerce.number().min(1, 'Capacité minimale : 1'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CANCELLED']),
  imageUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  categoryId: z.string().optional(),
});

type EventFormData = z.infer<typeof schema>;

const repo = new EventRepositoryImpl();

const InputField = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

export default function EventFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { create, update, loading, error } = useEventActions();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'DRAFT', capacity: 100 },
  });

  useEffect(() => {
    if (isEdit && id) {
      repo.getById(id).then(ev => {
        reset({
          title: ev.title,
          description: ev.description,
          location: ev.location,
          startDate: ev.startDate.slice(0, 16),
          endDate: ev.endDate.slice(0, 16),
          capacity: ev.capacity,
          status: ev.status,
          imageUrl: ev.imageUrl || '',
          categoryId: ev.categoryId || '',
        });
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data: EventFormData) => {
    try {
      const payload = {
        ...data,
        imageUrl: data.imageUrl || undefined,
        categoryId: data.categoryId || undefined,
      };
      if (isEdit && id) {
        await update(id, payload);
      } else {
        await create(payload);
      }
      navigate('/organizer/dashboard');
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md sticky top-0 bg-inherit z-50">
        <div className="flex items-center space-x-2">
          <FiArrowLeft size={24} />
          <h1 className="text-xl font-semibold">{isEdit ? 'Modifier l\'événement' : 'Créer un événement'}</h1>
        </div>
        <Link
          to="/organizer/dashboard"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center space-x-2"
        >
          <FiArrowLeft /> Retour
        </Link>
      </nav>

      {/* Formulaire */}
      <div className="flex-1 p-8 max-w-3xl mx-auto">
        {/* Erreur globale */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Titre */}
          <InputField label="Titre *" error={errors.title?.message}>
            <input {...register('title')} placeholder="Titre de l'événement" className={inputCls} />
          </InputField>

          {/* Description */}
          <InputField label="Description *" error={errors.description?.message}>
            <textarea {...register('description')} placeholder="Description" className={`${inputCls} resize-none`} rows={4} />
          </InputField>

          {/* Lieu */}
          <InputField label="Lieu *" error={errors.location?.message}>
            <input {...register('location')} placeholder="Douala, Cameroun" className={inputCls} />
          </InputField>

          {/* Date et heure de début / fin */}
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField label="Date et heure de début *" error={errors.startDate?.message}>
              <input {...register('startDate')} type="datetime-local" className={inputCls} />
            </InputField>
            <InputField label="Date et heure de fin *" error={errors.endDate?.message}>
              <input {...register('endDate')} type="datetime-local" className={inputCls} />
            </InputField>
          </div>

          {/* Capacité & Statut */}
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField label="Capacité *" error={errors.capacity?.message}>
              <input {...register('capacity')} type="number" min="1" className={inputCls} />
            </InputField>
            <InputField label="Statut *" error={errors.status?.message}>
              <select {...register('status')} className={inputCls}>
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publié</option>
                <option value="CANCELLED">Annulé</option>
              </select>
            </InputField>
          </div>

          {/* URL Image */}
          <InputField label="URL de l'image" error={errors.imageUrl?.message}>
            <input {...register('imageUrl')} type="url" placeholder="https://..." className={inputCls} />
          </InputField>

          {/* Boutons */}
          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl transition shadow-md"
            >
              <FiSave size={16} />
              {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer l\'événement'}
            </button>
            <Link
              to="/organizer/dashboard"
              className="px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}