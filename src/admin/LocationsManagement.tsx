
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Location {
  id: string;
  name: string;
  slug: string;
  district: string | null;
  state: string | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  altitude: string | null;
  tagline: string | null;
  latitude: number | null;
  longitude: number | null;
  has_available_properties: boolean | null;
  associated_properties: string[] | null;
  highlights: string[] | null;
}

interface LocationForm {
  name: string;
  slug: string;
  district: string;
  state: string;
  description: string;
  image_url: string;
  altitude: string;
  tagline: string;
  latitude: string;
  longitude: string;
  has_available_properties: boolean;
  associated_properties: string;
  highlights: string;
  is_active: boolean;
}

const emptyForm: LocationForm = {
  name: '',
  slug: '',
  district: '',
  state: 'Uttarakhand',
  description: '',
  image_url: '',
  altitude: '',
  tagline: '',
  latitude: '',
  longitude: '',
  has_available_properties: false,
  associated_properties: '',
  highlights: '',
  is_active: true,
};

export const LocationsManagement: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [form, setForm] = useState<LocationForm>(emptyForm);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchLocations = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setLocations((data || []) as Location[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleInputChange = (
    field: keyof LocationForm,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleEdit = (location: Location) => {
    setEditingLocationId(location.id);

    setForm({
      name: location.name || '',
      slug: location.slug || '',
      district: location.district || '',
      state: location.state || '',
      description: location.description || '',
      image_url: location.image_url || '',
      altitude: location.altitude || '',
      tagline: location.tagline || '',
      latitude: location.latitude?.toString() || '',
      longitude: location.longitude?.toString() || '',
      has_available_properties: location.has_available_properties ?? false,
      associated_properties: (location.associated_properties || []).join('\n'),
      highlights: (location.highlights || []).join('\n'),
      is_active: location.is_active,
    });

    setError('');
    setSuccessMessage('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancel = () => {
    setEditingLocationId(null);
    setForm(emptyForm);
    setError('');
    setSuccessMessage('');
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingLocationId) return;

    setError('');
    setSuccessMessage('');

    const latitudeValue =
      form.latitude.trim() === '' ? null : Number(form.latitude);

    const longitudeValue =
      form.longitude.trim() === '' ? null : Number(form.longitude);

    if (
      latitudeValue !== null &&
      (!Number.isFinite(latitudeValue) ||
        latitudeValue < -90 ||
        latitudeValue > 90)
    ) {
      setError('Latitude must be a valid number between -90 and 90.');
      return;
    }

    if (
      longitudeValue !== null &&
      (!Number.isFinite(longitudeValue) ||
        longitudeValue < -180 ||
        longitudeValue > 180)
    ) {
      setError('Longitude must be a valid number between -180 and 180.');
      return;
    }

    if (
      (latitudeValue === null && longitudeValue !== null) ||
      (latitudeValue !== null && longitudeValue === null)
    ) {
      setError('Please enter both latitude and longitude, or leave both empty.');
      return;
    }

    if (!form.name.trim() || !form.slug.trim()) {
      setError('Location name and slug are required.');
      return;
    }

    const locationData = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      district: form.district.trim() || null,
      state: form.state.trim() || null,
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      altitude: form.altitude.trim() || null,
      tagline: form.tagline.trim() || null,
      latitude: latitudeValue,
      longitude: longitudeValue,
      has_available_properties: form.has_available_properties,
      associated_properties: form.associated_properties
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      highlights: form.highlights
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      is_active: form.is_active,
    };

    setSaving(true);

    const { error } = await supabase
      .from('locations')
      .update(locationData)
      .eq('id', editingLocationId);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccessMessage('Location updated successfully.');

    setEditingLocationId(null);
    setForm(emptyForm);

    await fetchLocations();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d6d3d1',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '6px',
    color: '#44403c',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '16px',
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Locations Management</h1>
      <p>Manage the destinations and locations featured on your website.</p>

      {successMessage && (
        <p
          style={{
            color: '#166534',
            background: '#dcfce7',
            padding: '12px',
            borderRadius: '8px',
          }}
        >
          {successMessage}
        </p>
      )}

      {error && (
        <p
          style={{
            color: '#b91c1c',
            background: '#fee2e2',
            padding: '12px',
            borderRadius: '8px',
          }}
        >
          Error: {error}
        </p>
      )}

      {/* EDIT LOCATION FORM */}
      {editingLocationId && (
        <form
          onSubmit={handleSave}
          style={{
            background: '#ffffff',
            border: '1px solid #e7e5e4',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '25px',
            marginBottom: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>
            Edit Location
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Location Name *</label>
              <input
                style={inputStyle}
                value={form.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Slug *</label>
              <input
                style={inputStyle}
                value={form.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>District</label>
              <input
                style={inputStyle}
                value={form.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>State</label>
              <input
                style={inputStyle}
                value={form.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Altitude</label>
              <input
                style={inputStyle}
                value={form.altitude}
                onChange={(e) => handleInputChange('altitude', e.target.value)}
                placeholder="e.g. 1,869 metres"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Tagline</label>
              <input
                style={inputStyle}
                value={form.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                placeholder="Short destination tagline"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Latitude</label>
              <input
                type="number"
                step="any"
                style={inputStyle}
                value={form.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                placeholder="e.g. 29.6437"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Longitude</label>
              <input
                type="number"
                step="any"
                style={inputStyle}
                value={form.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                placeholder="e.g. 79.4281"
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Image URL</label>
            <input
              style={inputStyle}
              value={form.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              placeholder="/images/location-image.jpg"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Associated Properties</label>
            <textarea
              style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
              value={form.associated_properties}
              onChange={(e) =>
                handleInputChange('associated_properties', e.target.value)
              }
              placeholder={'One property name per line'}
            />
            <small style={{ color: '#78716c' }}>
              Enter each property name on a separate line.
            </small>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Highlights</label>
            <textarea
              style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
              value={form.highlights}
              onChange={(e) => handleInputChange('highlights', e.target.value)}
              placeholder={'One highlight per line'}
            />
            <small style={{ color: '#78716c' }}>
              Enter each highlight on a separate line.
            </small>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '22px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={form.has_available_properties}
                onChange={(e) =>
                  handleInputChange('has_available_properties', e.target.checked)
                }
              />
              <span>Current Property Opportunities Available</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
              />
              <span>Active on Website</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '11px 22px',
                background: '#14532d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              style={{
                padding: '11px 22px',
                background: '#e7e5e4',
                color: '#292524',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <button
        onClick={fetchLocations}
        disabled={loading}
        style={{
          padding: '10px 16px',
          border: '1px solid #d6d3d1',
          borderRadius: '8px',
          background: '#ffffff',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Refreshing...' : 'Refresh Locations'}
      </button>

      {loading && <p>Loading locations...</p>}

      {!loading && error && !editingLocationId && (
        <p style={{ color: 'red' }}>Error: {error}</p>
      )}

      {!loading && locations.length === 0 && !error && (
        <p>No locations found in your database.</p>
      )}

      {!loading && locations.length > 0 && (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              marginTop: '25px',
              borderCollapse: 'collapse',
              minWidth: '700px',
            }}
          >
            <thead>
              <tr style={{ background: '#f5f5f4' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>District</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>State</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Opportunities</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {locations.map((location) => (
                <tr
                  key={location.id}
                  style={{ borderBottom: '1px solid #e7e5e4' }}
                >
                  <td style={{ padding: '12px' }}>{location.name}</td>
                  <td style={{ padding: '12px' }}>{location.district || '-'}</td>
                  <td style={{ padding: '12px' }}>{location.state || '-'}</td>
                  <td style={{ padding: '12px' }}>
                    {location.is_active ? 'Active' : 'Inactive'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {location.has_available_properties ? 'Available' : 'No'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleEdit(location)}
                      style={{
                        padding: '7px 14px',
                        background: '#14532d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LocationsManagement;
