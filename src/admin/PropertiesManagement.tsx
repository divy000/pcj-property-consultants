
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Property {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  property_type: string | null;
  listing_type: string | null;
  price: number | null;
  price_label: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  area_unit: string | null;
  images: string[] | null;
  featured: boolean;
  is_published: boolean;
  latitude: number | null;
  longitude: number | null;
}

interface PropertyForm {
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  price: string;
  price_label: string;
  location: string;
  city: string;
  state: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  area_unit: string;
  images: string;
  featured: boolean;
  is_published: boolean;
  latitude: string;
  longitude: string;
}

const BUCKET_NAME = 'property-images';

const emptyForm: PropertyForm = {
  title: '',
  description: '',
  property_type: 'Residential',
  listing_type: 'Sale',
  price: '',
  price_label: '',
  location: '',
  city: '',
  state: 'Uttarakhand',
  bedrooms: '',
  bathrooms: '',
  area: '',
  area_unit: 'sq.ft.',
  images: '',
  featured: false,
  is_published: false,
  latitude: '',
  longitude: '',
};

export const PropertiesManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyForm>(emptyForm);

  // Newly selected image files and their local previews
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  // Create temporary previews for selected files
  useEffect(() => {
    const previews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFilePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setProperties([]);
    } else {
      setProperties((data ?? []) as Property[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateField = (
    field: keyof PropertyForm,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const createSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Get image URLs currently entered in the form
  const getImageUrls = () => {
    return form.images
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedFiles([]);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const openEditForm = (property: Property) => {
    setEditingId(property.id);

    setForm({
      title: property.title || '',
      description: property.description || '',
      property_type: property.property_type || 'Residential',
      listing_type: property.listing_type || 'Sale',
      price: property.price?.toString() || '',
      price_label: property.price_label || '',
      location: property.location || '',
      city: property.city || '',
      state: property.state || 'Uttarakhand',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      area: property.area?.toString() || '',
      area_unit: property.area_unit || 'sq.ft.',
      images: (property.images || []).join('\n'),
      featured: property.featured,
      is_published: property.is_published,
      latitude: property.latitude?.toString() || '',
      longitude: property.longitude?.toString() || '',
    });

    setSelectedFiles([]);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  // Select multiple image files from the computer
  const handleImageSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith('image/')
    );

    if (invalidFiles.length > 0) {
      setError('Please select image files only.');
      event.target.value = '';
      return;
    }

    setError('');
    setSelectedFiles((previous) => [...previous, ...files]);

    // Allow selecting the same file again later
    event.target.value = '';
  };

  // Remove an existing image URL from the property form
  const removeImageUrl = (indexToRemove: number) => {
    const updatedUrls = getImageUrls().filter(
      (_, index) => index !== indexToRemove
    );

    updateField('images', updatedUrls.join('\n'));
  };

  // Remove a newly selected image before uploading
  const removeSelectedFile = (indexToRemove: number) => {
    setSelectedFiles((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  };

  // Upload selected files and return their public URLs
  const uploadImages = async (): Promise<{
    urls: string[];
    paths: string[];
  }> => {
    const uploadedUrls: string[] = [];
    const uploadedPaths: string[] = [];

    for (const file of selectedFiles) {
      const safeFileName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '-');

      const filePath = `${crypto.randomUUID()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        // Remove files uploaded earlier in this batch
        if (uploadedPaths.length > 0) {
          await supabase.storage
            .from(BUCKET_NAME)
            .remove(uploadedPaths);
        }

        throw new Error(
          `Image upload failed for "${file.name}": ${uploadError.message}`
        );
      }

      uploadedPaths.push(filePath);

      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return {
      urls: uploadedUrls,
      paths: uploadedPaths,
    };
  };

  const handleSave = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.title.trim() || !form.location.trim()) {
      setError('Property title and location are required.');
      return;
    }

    // Validate optional coordinates
    const latitude = form.latitude.trim()
      ? Number(form.latitude)
      : null;

    const longitude = form.longitude.trim()
      ? Number(form.longitude)
      : null;

    if (
      (latitude !== null &&
        (!Number.isFinite(latitude) ||
          latitude < -90 ||
          latitude > 90)) ||
      (longitude !== null &&
        (!Number.isFinite(longitude) ||
          longitude < -180 ||
          longitude > 180))
    ) {
      setError('Please enter valid latitude and longitude values.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    let uploadedPaths: string[] = [];

    try {
      // Upload new images first
      const uploaded = await uploadImages();
      uploadedPaths = uploaded.paths;

      // Combine existing URLs and newly uploaded image URLs
      const imageArray = [
        ...getImageUrls(),
        ...uploaded.urls,
      ];

      const propertyData = {
        title: form.title.trim(),
        slug: createSlug(form.title),
        description: form.description.trim() || null,
        property_type: form.property_type,
        listing_type: form.listing_type,
        price: form.price ? Number(form.price) : null,
        price_label: form.price_label.trim() || null,
        location: form.location.trim(),
        city: form.city.trim() || null,
        state: form.state.trim() || null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        area: form.area ? Number(form.area) : null,
        area_unit: form.area_unit,
        latitude,
        longitude,
        images: imageArray,
        featured: form.featured,
        is_published: form.is_published,
        updated_at: new Date().toISOString(),
      };

      const { error: saveError } = editingId
        ? await supabase
            .from('properties')
            .update(propertyData)
            .eq('id', editingId)
        : await supabase
            .from('properties')
            .insert([propertyData]);

      if (saveError) {
        // Clean up newly uploaded files if saving the property fails
        if (uploadedPaths.length > 0) {
          await supabase.storage
            .from(BUCKET_NAME)
            .remove(uploadedPaths);
        }

        throw new Error(saveError.message);
      }

      setSuccess(
        editingId
          ? 'Property updated successfully!'
          : 'Property added successfully!'
      );

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setSelectedFiles([]);

      await fetchProperties();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Something went wrong while saving the property.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (property: Property) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${property.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError('');
    setSuccess('');

    const { error: deleteError } = await supabase
      .from('properties')
      .delete()
      .eq('id', property.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess('Property deleted successfully!');
    await fetchProperties();
  };

  const toggleStatus = async (
    property: Property,
    field: 'is_published' | 'featured'
  ) => {
    setError('');
    setSuccess('');

    const { error: updateError } = await supabase
      .from('properties')
      .update({
        [field]: !property[field],
        updated_at: new Date().toISOString(),
      })
      .eq('id', property.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess('Property status updated successfully!');
    await fetchProperties();
  };

  const inputClass =
    'w-full border border-stone-300 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600';

  const labelClass =
    'block text-sm font-medium text-stone-700 mb-2';

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-amber-700 font-medium">
            PCJ PROPERTY CONSULTANTS
          </p>

          <h1 className="text-3xl font-bold text-stone-900 mt-2">
            Properties Management
          </h1>

          <p className="text-stone-500 mt-2">
            Add, edit, publish and manage your property listings.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchProperties}
            disabled={loading}
            className="border border-stone-300 px-4 py-3 rounded-lg hover:bg-stone-100 disabled:opacity-50"
          >
            Refresh
          </button>

          <button
            onClick={openAddForm}
            className="bg-stone-900 text-white px-5 py-3 rounded-lg hover:bg-stone-700"
          >
            + Add Property
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border border-stone-200 rounded-xl p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-stone-900">
              {editingId ? 'Edit Property' : 'Add New Property'}
            </h2>

            <button
              onClick={() => {
                setShowForm(false);
                setSelectedFiles([]);
              }}
              type="button"
              className="text-stone-500 hover:text-red-600 text-xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">

            <div>
              <label className={labelClass}>Property Title *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Example: Luxury Mountain Villa"
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
                placeholder="Describe the property..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Property Type</label>
                <select
                  className={inputClass}
                  value={form.property_type}
                  onChange={(e) => updateField('property_type', e.target.value)}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Farmhouse">Farmhouse</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Listing Type</label>
                <select
                  className={inputClass}
                  value={form.listing_type}
                  onChange={(e) => updateField('listing_type', e.target.value)}
                >
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                  <option value="Lease">For Lease</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Price (Numeric)</label>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="Example: 7500000"
                />
              </div>

              <div>
                <label className={labelClass}>Price Display Label</label>
                <input
                  className={inputClass}
                  value={form.price_label}
                  onChange={(e) => updateField('price_label', e.target.value)}
                  placeholder="Example: ₹75 Lakh"
                />
              </div>

              <div>
                <label className={labelClass}>Location *</label>
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Example: Near Naini Lake"
                  required
                />
              </div>

              {/* Latitude */}
              <div>
                <label className={labelClass}>Latitude</label>
                <input
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  className={inputClass}
                  value={form.latitude}
                  onChange={(e) => updateField('latitude', e.target.value)}
                  placeholder="Example: 29.6437"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Optional. Must be between -90 and 90.
                </p>
              </div>

              {/* Longitude */}
              <div>
                <label className={labelClass}>Longitude</label>
                <input
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  className={inputClass}
                  value={form.longitude}
                  onChange={(e) => updateField('longitude', e.target.value)}
                  placeholder="Example: 79.4281"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Optional. Must be between -180 and 180.
                </p>
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="Example: Nainital"
                />
              </div>

              <div>
                <label className={labelClass}>State</label>
                <input
                  className={inputClass}
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Area</label>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  placeholder="Example: 2500"
                />
              </div>

              <div>
                <label className={labelClass}>Area Unit</label>
                <select
                  className={inputClass}
                  value={form.area_unit}
                  onChange={(e) => updateField('area_unit', e.target.value)}
                >
                  <option value="sq.ft.">Square Feet</option>
                  <option value="sq.yd.">Square Yards</option>
                  <option value="sq.m.">Square Metres</option>
                  <option value="acre">Acres</option>
                  <option value="nali">Nali</option>
                  <option value="bigha">Bigha</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Bedrooms</label>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.bedrooms}
                  onChange={(e) => updateField('bedrooms', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Bathrooms</label>
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.bathrooms}
                  onChange={(e) => updateField('bathrooms', e.target.value)}
                />
              </div>

            </div>

            {/* Image Upload Section */}
            <div className="border border-stone-200 rounded-xl p-5 space-y-4">

              <div>
                <h3 className="font-semibold text-stone-900">
                  Property Images
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  Select multiple photographs from your computer.
                  They will upload when you save the property.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Upload New Images
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelection}
                  disabled={saving}
                  className="block w-full text-sm text-stone-600 file:mr-4 file:rounded-lg file:border-0 file:bg-stone-900 file:px-4 file:py-3 file:text-white hover:file:bg-stone-700"
                />
              </div>

              {/* Existing image URL previews */}
              {getImageUrls().length > 0 && (
                <div>
                  <p className="text-sm font-medium text-stone-700 mb-3">
                    Existing / Added Images
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {getImageUrls().map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="relative group"
                      >
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-stone-200"
                        />

                        <button
                          type="button"
                          onClick={() => removeImageUrl(index)}
                          disabled={saving}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 hover:bg-red-700 disabled:opacity-50"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newly selected local image previews */}
              {selectedFiles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-stone-700 mb-3">
                    New Images ({selectedFiles.length})
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative"
                      >
                        <img
                          src={filePreviews[index]}
                          alt={file.name}
                          className="w-full h-32 object-cover rounded-lg border border-stone-200"
                        />

                        <button
                          type="button"
                          onClick={() => removeSelectedFile(index)}
                          disabled={saving}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 hover:bg-red-700 disabled:opacity-50"
                          aria-label="Remove selected image"
                        >
                          ×
                        </button>

                        <p className="text-xs text-stone-500 mt-1 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getImageUrls().length === 0 && selectedFiles.length === 0 && (
                <p className="text-sm text-stone-400">
                  No images selected yet.
                </p>
              )}

              <div>
                <label className={labelClass}>
                  Or add image URLs manually
                </label>

                <textarea
                  className={inputClass}
                  rows={2}
                  value={form.images}
                  onChange={(e) => updateField('images', e.target.value)}
                  placeholder="Paste one image URL per line"
                  disabled={saving}
                />
              </div>

              <p className="text-xs text-stone-500">
                Supported image formats depend on your selected files.
                Newly selected images are uploaded to your Supabase
                property-images bucket when you save.
              </p>

            </div>

            <div className="flex flex-wrap gap-6">

              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                />
                Mark as Featured
              </label>

              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => updateField('is_published', e.target.checked)}
                />
                Publish on Website
              </label>

            </div>

            <div className="flex flex-wrap gap-3 pt-4">

              <button
                type="submit"
                disabled={saving}
                className="bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-700 disabled:opacity-50"
              >
                {saving
                  ? 'Uploading images and saving...'
                  : editingId
                    ? 'Update Property'
                    : 'Save Property'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedFiles([]);
                }}
                disabled={saving}
                className="border border-stone-300 px-6 py-3 rounded-lg hover:bg-stone-100 disabled:opacity-50"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Property Listings */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-stone-200">
          <h2 className="font-semibold text-stone-900">
            All Property Listings
          </h2>

          <p className="text-sm text-stone-500 mt-1">
            {properties.length} properties found
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-stone-500">
            Loading properties...
          </div>
        ) : error && properties.length === 0 ? (
          <div className="p-8 text-center text-red-600">
            Unable to load properties: {error}
          </div>
        ) : properties.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            No properties found. Click Add Property to create your first listing.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-stone-50 text-stone-600">
                <tr>
                  <th className="px-5 py-4">Property</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Published</th>
                  <th className="px-5 py-4">Featured</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-stone-50">

                    <td className="px-5 py-4">
                      <p className="font-medium text-stone-900">
                        {property.title}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-stone-600">
                      {[property.location, property.city]
                        .filter(Boolean)
                        .join(', ') || 'Not specified'}
                    </td>

                    <td className="px-5 py-4 text-stone-600">
                      {property.property_type || '-'}
                    </td>

                    <td className="px-5 py-4 text-stone-600">
                      {property.price_label || '-'}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleStatus(property, 'is_published')}
                        className={`px-3 py-1 rounded-full text-xs ${
                          property.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {property.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleStatus(property, 'featured')}
                        className={`px-3 py-1 rounded-full text-xs ${
                          property.featured
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {property.featured ? 'Featured' : 'No'}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEditForm(property)}
                          className="text-blue-700 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(property)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
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

export default PropertiesManagement;
