
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'property-images';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB per image

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string | null;
  status: string | null;
  is_published: boolean;
  year_or_period: string | null;
  role_type: string | null;
  role_description: string | null;
  significance: string | null;
  current_status_note: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_query: string | null;
  images: string[] | null;
}

interface ProjectForm {
  title: string;
  description: string;
  location: string;
  city: string;
  status: string;
  year_or_period: string;
  role_type: string;
  role_description: string;
  significance: string;
  current_status_note: string;
  latitude: string;
  longitude: string;
  google_maps_query: string;
  is_published: boolean;
}

const emptyForm: ProjectForm = {
  title: '',
  description: '',
  location: '',
  city: '',
  status: '',
  year_or_period: '',
  role_type: '',
  role_description: '',
  significance: '',
  current_status_note: '',
  latitude: '',
  longitude: '',
  google_maps_query: '',
  is_published: false,
};

const generateSlug = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Image states
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setProjects([]);
    } else {
      setProjects((data ?? []) as Project[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Generate and clean up previews for newly selected images.
  useEffect(() => {
    const previews = selectedImageFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setNewImagePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImageFiles]);

  const resetImages = () => {
    setExistingImages([]);
    setSelectedImageFiles([]);
    setNewImagePreviews([]);
  };

  const handleAddNew = () => {
    setEditingProjectId(null);
    setIsAddingProject(true);
    setForm(emptyForm);
    resetImages();
    setError('');
    setSuccessMessage('');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setIsAddingProject(false);
    setSuccessMessage('');
    setError('');

    setForm({
      title: project.title ?? '',
      description: project.description ?? '',
      location: project.location ?? '',
      city: project.city ?? '',
      status: project.status ?? '',
      year_or_period: project.year_or_period ?? '',
      role_type: project.role_type ?? '',
      role_description: project.role_description ?? '',
      significance: project.significance ?? '',
      current_status_note: project.current_status_note ?? '',
      latitude: project.latitude != null ? String(project.latitude) : '',
      longitude: project.longitude != null ? String(project.longitude) : '',
      google_maps_query: project.google_maps_query ?? '',
      is_published: project.is_published ?? false,
    });

    setExistingImages(project.images ?? []);
    setSelectedImageFiles([]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingProjectId(null);
    setIsAddingProject(false);
    setForm(emptyForm);
    resetImages();
    setError('');
    setSuccessMessage('');
  };

  const handleImageSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    const validFiles: File[] = [];
    const rejectedFiles: string[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        rejectedFiles.push(`${file.name}: not an image`);
      } else if (file.size > MAX_IMAGE_SIZE) {
        rejectedFiles.push(`${file.name}: larger than 5 MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (rejectedFiles.length > 0) {
      setError(
        `Some images were not selected:\n${rejectedFiles.join('\n')}`
      );
    } else {
      setError('');
    }

    if (validFiles.length > 0) {
      setSelectedImageFiles((previous) => [...previous, ...validFiles]);
    }

    // Allow selecting the same file again if needed.
    event.target.value = '';
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImageFiles((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  // Permanently deletes a project after confirmation.
  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${project.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingProjectId(project.id);
    setError('');
    setSuccessMessage('');

    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (deleteError) {
        setError(`Unable to delete project: ${deleteError.message}`);
        return;
      }

      if (editingProjectId === project.id) {
        setEditingProjectId(null);
        setForm(emptyForm);
        resetImages();
      }

      setSuccessMessage(`"${project.title}" was deleted successfully.`);

      await fetchProjects();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while deleting the project.'
      );
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingProjectId && !isAddingProject) return;

    setError('');
    setSuccessMessage('');

    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }

    const slug = generateSlug(form.title);

    if (!slug) {
      setError('Please enter a valid project title.');
      return;
    }

    const latitude = form.latitude.trim() === ''
      ? null
      : Number(form.latitude);

    const longitude = form.longitude.trim() === ''
      ? null
      : Number(form.longitude);

    if ((latitude === null) !== (longitude === null)) {
      setError('Please enter both latitude and longitude, or leave both empty.');
      return;
    }

    if (
      latitude !== null &&
      (!Number.isFinite(latitude) || latitude < -90 || latitude > 90)
    ) {
      setError('Latitude must be between -90 and 90.');
      return;
    }

    if (
      longitude !== null &&
      (!Number.isFinite(longitude) || longitude < -180 || longitude > 180)
    ) {
      setError('Longitude must be between -180 and 180.');
      return;
    }

    setSaving(true);

    // Keep track of newly uploaded files in case the database save fails.
    const uploadedStoragePaths: string[] = [];

    try {
      const newImageUrls: string[] = [];

      // Upload newly selected images to Supabase Storage.
      for (const file of selectedImageFiles) {
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const filePath = `projects/${slug}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        uploadedStoragePaths.push(filePath);

        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath);

        newImageUrls.push(publicUrlData.publicUrl);
      }

      // Keep existing images and add the newly uploaded image URLs.
      const allImages = [
        ...existingImages,
        ...newImageUrls,
      ];

      const projectData = {
        title: form.title.trim(),
        slug,
        description: form.description.trim() || null,
        location: form.location.trim() || null,
        city: form.city.trim() || null,
        status: form.status.trim() || null,
        year_or_period: form.year_or_period.trim() || null,
        role_type: form.role_type.trim() || null,
        role_description: form.role_description.trim() || null,
        significance: form.significance.trim() || null,
        current_status_note: form.current_status_note.trim() || null,
        latitude,
        longitude,
        google_maps_query: form.google_maps_query.trim() || null,
        is_published: form.is_published,
        images: allImages,
      };

      let saveError;

      if (isAddingProject) {
        const { error: insertError } = await supabase
          .from('projects')
          .insert(projectData);

        saveError = insertError;
      } else {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProjectId);

        saveError = updateError;
      }

      if (saveError) {
        throw new Error(saveError.message);
      }

      setSuccessMessage(
        isAddingProject
          ? 'New project added successfully!'
          : 'Project updated successfully!'
      );

      setEditingProjectId(null);
      setIsAddingProject(false);
      setForm(emptyForm);
      resetImages();

      await fetchProjects();
    } catch (err) {
      // Remove newly uploaded files if the project could not be saved.
      if (uploadedStoragePaths.length > 0) {
        await supabase.storage
          .from(BUCKET_NAME)
          .remove(uploadedStoragePaths);
      }

      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while saving the project.'
      );
    } finally {
      setSaving(false);
    }
  };

  const updateField = (
    field: keyof ProjectForm,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const inputClass =
    'w-full border border-stone-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-600';

  const labelClass =
    'block text-sm font-medium text-stone-700';

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-amber-700 font-medium">
            PCJ PROPERTY CONSULTANTS
          </p>

          <h1 className="text-3xl font-bold text-stone-900 mt-2">
            Projects
          </h1>

          <p className="text-stone-500 mt-2">
            View and manage your development projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddNew}
            disabled={saving || deletingProjectId !== null}
            className="bg-amber-700 text-white px-5 py-3 rounded-lg hover:bg-amber-800 disabled:opacity-50"
          >
            + Add New Project
          </button>

          <button
            onClick={fetchProjects}
            disabled={loading || saving || deletingProjectId !== null}
            className="bg-stone-900 text-white px-5 py-3 rounded-lg hover:bg-stone-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh Projects'}
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      {(editingProjectId || isAddingProject) && (
        <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-7 space-y-5">

          <div>
            <p className="text-sm text-amber-700 font-medium">
              {isAddingProject ? 'ADD NEW PROJECT' : 'EDIT EXISTING PROJECT'}
            </p>

            <h2 className="text-xl font-bold text-stone-900 mt-1">
              {isAddingProject
                ? 'Add Project Information'
                : 'Update Project Information'}
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              Details will be saved directly to your Supabase database.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg whitespace-pre-line">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">

            <div>
              <label className={labelClass}>Project Title *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={inputClass}
                rows={4}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe the project"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="e.g. Dhikuli"
                />
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="e.g. Ramnagar"
                />
              </div>

              <div>
                <label className={labelClass}>Year / Period</label>
                <input
                  className={inputClass}
                  value={form.year_or_period}
                  onChange={(e) => updateField('year_or_period', e.target.value)}
                  placeholder="e.g. 2026 or Recent Years"
                />
              </div>

              <div>
                <label className={labelClass}>Project Status</label>
                <input
                  className={inputClass}
                  value={form.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  placeholder="e.g. Completed"
                />
              </div>

              <div>
                <label className={labelClass}>Role Type</label>
                <input
                  className={inputClass}
                  value={form.role_type}
                  onChange={(e) => updateField('role_type', e.target.value)}
                  placeholder="e.g. Land Acquisition"
                />
              </div>

            </div>

            <div>
              <label className={labelClass}>Role Description</label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.role_description}
                onChange={(e) => updateField('role_description', e.target.value)}
                placeholder="Describe PCJ's role in this project"
              />
            </div>

            <div>
              <label className={labelClass}>Project Significance</label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.significance}
                onChange={(e) => updateField('significance', e.target.value)}
                placeholder="What makes this project significant?"
              />
            </div>

            <div>
              <label className={labelClass}>Current Status Note</label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.current_status_note}
                onChange={(e) => updateField('current_status_note', e.target.value)}
                placeholder="Optional additional status information"
              />
            </div>

            {/* PROJECT IMAGES */}
            <div className="border border-stone-200 rounded-xl p-4 sm:p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900">
                  Project Images
                </h3>

                <p className="text-sm text-stone-500 mt-1">
                  Upload multiple images for this project. The first image
                  will appear on the public Projects page.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Select Project Images
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelection}
                  disabled={saving}
                  className="block w-full text-sm text-stone-600 mt-2
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-amber-50 file:text-amber-800
                    hover:file:bg-amber-100
                    disabled:opacity-50"
                />

                <p className="text-xs text-stone-500 mt-2">
                  Supported image formats. Maximum size: 5 MB per image.
                </p>
              </div>

              {existingImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-stone-700">
                    Existing Images
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {existingImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative group rounded-lg overflow-hidden border border-stone-200"
                      >
                        <img
                          src={image}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-28 object-cover"
                        />

                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-stone-900/80 text-white text-[10px] px-2 py-1 rounded">
                            Main Image
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          disabled={saving}
                          className="absolute top-1 right-1 bg-red-600 text-white w-7 h-7 rounded-full hover:bg-red-700 disabled:opacity-50"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedImageFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-stone-700">
                    New Image Previews
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {selectedImageFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative rounded-lg overflow-hidden border border-amber-200"
                      >
                        <img
                          src={newImagePreviews[index]}
                          alt={file.name}
                          className="w-full h-28 object-cover"
                        />

                        <span className="absolute bottom-1 left-1 right-1 bg-stone-900/80 text-white text-[10px] px-2 py-1 rounded truncate">
                          {file.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeSelectedImage(index)}
                          disabled={saving}
                          className="absolute top-1 right-1 bg-red-600 text-white w-7 h-7 rounded-full hover:bg-red-700 disabled:opacity-50"
                          title="Remove selected image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {existingImages.length === 0 &&
                selectedImageFiles.length === 0 && (
                  <p className="text-sm text-stone-400 text-center py-4">
                    No project images selected.
                  </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Latitude</label>
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={form.latitude}
                  onChange={(e) => updateField('latitude', e.target.value)}
                  placeholder="e.g. 29.4316"
                />
              </div>

              <div>
                <label className={labelClass}>Longitude</label>
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={form.longitude}
                  onChange={(e) => updateField('longitude', e.target.value)}
                  placeholder="e.g. 79.1362"
                />
              </div>

            </div>

            <div>
              <label className={labelClass}>Google Maps Search Query</label>
              <input
                className={inputClass}
                value={form.google_maps_query}
                onChange={(e) => updateField('google_maps_query', e.target.value)}
                placeholder="Optional Google Maps search query"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="project-published"
                checked={form.is_published}
                onChange={(e) => updateField('is_published', e.target.checked)}
                className="h-4 w-4 accent-amber-700"
              />

              <label htmlFor="project-published" className="text-sm text-stone-700">
                Publish this project on the public website
              </label>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">

              <button
                type="submit"
                disabled={saving || deletingProjectId !== null}
                className="bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-700 disabled:opacity-50"
              >
                {saving
                  ? 'Saving...'
                  : isAddingProject
                    ? 'Add Project'
                    : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving || deletingProjectId !== null}
                className="border border-stone-300 text-stone-700 px-6 py-3 rounded-lg hover:bg-stone-50 disabled:opacity-50"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-stone-200">
          <h2 className="font-semibold text-stone-900">
            All Development Projects
          </h2>

          <p className="text-sm text-stone-500 mt-1">
            {projects.length} projects found
          </p>
        </div>

        {error && !editingProjectId && !isAddingProject && (
          <div className="p-5 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-stone-500">
            Loading projects...
          </div>
        ) : error && !editingProjectId && !isAddingProject ? null : projects.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            No projects found in your database yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-stone-50 text-stone-600">
                <tr>
                  <th className="px-5 py-4">Project</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Visibility</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-stone-50">

                    <td className="px-5 py-4">
                      <p className="font-medium text-stone-900">
                        {project.title}
                      </p>

                      {project.description && (
                        <p className="text-xs text-stone-500 mt-1 max-w-sm">
                          {project.description}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-stone-600">
                      {[project.location, project.city]
                        .filter(Boolean)
                        .join(', ') || 'Not specified'}
                    </td>

                    <td className="px-5 py-4 text-stone-600 capitalize">
                      {project.status || 'Not specified'}
                    </td>

                    <td className="px-5 py-4">
                      {project.is_published ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          Published
                        </span>
                      ) : (
                        <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => handleEdit(project)}
                          disabled={deletingProjectId !== null || saving}
                          className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(project)}
                          disabled={deletingProjectId !== null || saving}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          {deletingProjectId === project.id ? 'Deleting...' : 'Delete'}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
};

export default ProjectsManagement;
