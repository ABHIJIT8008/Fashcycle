import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useContent, DEFAULT_CONTENT } from '../../contexts/ContentContext';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, deleteDoc, writeBatch } from 'firebase/firestore';
import {
  Image as ImageIcon, LayoutDashboard, Users, Store, BarChart3,
  Phone, LogOut, ChevronRight, ChevronLeft, Plus, ClipboardList,
  Trash2, Upload, Check, Loader2, Link as LinkIcon
} from 'lucide-react';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

/* ── Image input: file → base64 DataURL, or paste a URL ── */
function ImageInput({ value, onChange, label }) {
  const [urlMode, setUrlMode] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [reading, setReading] = useState(false);
  const fileRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (IMGBB_API_KEY === 'REPLACE_WITH_YOUR_IMGBB_API_KEY') {
      alert("Please add your free ImgBB API Key at the top of AdminPanel.jsx first.");
      e.target.value = '';
      return;
    }

    setReading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        onChange(data.data.url); // Use the permanent ImgBB URL
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert('Could not upload image. Check console for details.');
    } finally {
      setReading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>}
      {value && (
        <div className="w-full h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={reading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1b3226] text-white text-xs rounded-lg hover:bg-[#2d5a3d] transition-colors disabled:opacity-50"
        >
          {reading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
          {reading ? 'Reading…' : 'Upload Image'}
        </button>
        <button
          type="button"
          onClick={() => setUrlMode(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-gray-200 transition-colors"
        >
          <LinkIcon size={13} /> Use URL
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {urlMode && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlDraft}
            onChange={e => setUrlDraft(e.target.value)}
            placeholder="https://…"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3226]"
          />
          <button
            type="button"
            onClick={() => { onChange(urlDraft); setUrlMode(false); setUrlDraft(''); }}
            className="px-3 py-2 bg-[#1b3226] text-white text-xs rounded-lg hover:bg-[#2d5a3d]"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Shared save button ── */
function SaveBtn({ saving, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 px-6 py-2.5 bg-[#1b3226] text-white rounded-lg font-medium hover:bg-[#2d5a3d] transition-colors disabled:opacity-50"
    >
      {saving
        ? <><Loader2 size={16} className="animate-spin" /> Saving…</>
        : <><Check size={16} /> Save Changes</>
      }
    </button>
  );
}

/* ══════════════════════════════════════
   SECTION EDITORS
══════════════════════════════════════ */

function HeroEditor({ data, onSave }) {
  const [img, setImg] = useState(data?.backgroundImage || '');
  const [saving, setSaving] = useState(false);
  async function save() { setSaving(true); await onSave({ backgroundImage: img }); setSaving(false); }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Hero Section</h2>
        <p className="text-sm text-gray-500 mt-1">Full-screen background image on the landing page.</p>
      </div>
      <ImageInput value={img} onChange={setImg} label="Background Image" />
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

function HowItWorksEditor({ data, onSave }) {
  const [phones, setPhones] = useState({
    phone1Image: data?.phone1Image || '',
    phone2Image: data?.phone2Image || '',
    phone3Image: data?.phone3Image || ''
  });
  const [saving, setSaving] = useState(false);
  async function save() { setSaving(true); await onSave(phones); setSaving(false); }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">How Fashcycle Works</h2>
        <p className="text-sm text-gray-500 mt-1">The three phone mockup images shown in this section.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['phone1Image', 'Phone 1 — Discover'],
          ['phone2Image', 'Phone 2 — Book'],
          ['phone3Image', 'Phone 3 — Return']
        ].map(([key, label]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <ImageInput
              value={phones[key]}
              onChange={v => setPhones(p => ({ ...p, [key]: v }))}
              label={label}
            />
          </div>
        ))}
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

function CategoriesEditor({ data, onSave }) {
  const [items, setItems] = useState(data?.items || DEFAULT_CONTENT.categories.items);
  const [saving, setSaving] = useState(false);

  const update = (idx, field, val) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  async function save() { setSaving(true); await onSave({ items }); setSaving(false); }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Category Images</h2>
          <p className="text-sm text-gray-500 mt-1">Edit names and images for "Find Your Perfect Look".</p>
        </div>
        <button
          onClick={() => setItems(prev => [...prev, { id: Date.now().toString(), title: 'New Category', img: '' }])}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1b3226]/10 text-[#1b3226] rounded-lg text-sm font-medium hover:bg-[#1b3226]/20 transition-colors"
        >
          <Plus size={15} /> Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((cat, idx) => (
          <div key={cat.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
            <button
              onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}
              className="absolute top-3 right-3 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={13} />
            </button>
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Name</label>
              <input
                type="text"
                value={cat.title}
                onChange={e => update(idx, 'title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]"
              />
            </div>
            <ImageInput value={cat.img} onChange={v => update(idx, 'img', v)} label="Category Image" />
          </div>
        ))}
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

function PartnersEditor({ data, onSave }) {
  const [items, setItems] = useState(data?.items || []);
  const [saving, setSaving] = useState(false);

  const update = (idx, field, val) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  async function save() { setSaving(true); await onSave({ items }); setSaving(false); }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Our Trusted Partners</h2>
          <p className="text-sm text-gray-500 mt-1">Add partner logos. Placeholder tiles show when empty.</p>
        </div>
        <button
          onClick={() => setItems(prev => [...prev, { id: Date.now().toString(), name: '', logo: '' }])}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1b3226]/10 text-[#1b3226] rounded-lg text-sm font-medium hover:bg-[#1b3226]/20 transition-colors"
        >
          <Plus size={15} /> Add Partner
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Store size={28} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No partners yet. Click "Add Partner" to get started.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((partner, idx) => (
          <div key={partner.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
            <button
              onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}
              className="absolute top-3 right-3 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={13} />
            </button>
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Partner Name</label>
              <input
                type="text"
                value={partner.name}
                onChange={e => update(idx, 'name', e.target.value)}
                placeholder="Store name"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]"
              />
            </div>
            <ImageInput value={partner.logo} onChange={v => update(idx, 'logo', v)} label="Partner Logo" />
          </div>
        ))}
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

function StoreOwnerSlidesEditor({ data, onSave }) {
  const [items, setItems] = useState(data?.items || []);
  const [saving, setSaving] = useState(false);

  const update = (idx, field, val) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  async function save() { setSaving(true); await onSave({ items }); setSaving(false); }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Store Owner — Image Slider</h2>
          <p className="text-sm text-gray-500 mt-1">
            Each slide shows a product image with revenue info, auto-cycling every 4.5 s.
          </p>
        </div>
        <button
          onClick={() => setItems(prev => [...prev, { id: Date.now().toString(), image: '', productName: '', revenue: '', caption: '' }])}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1b3226]/10 text-[#1b3226] rounded-lg text-sm font-medium hover:bg-[#1b3226]/20 transition-colors"
        >
          <Plus size={15} /> Add Slide
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <ImageIcon size={28} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No slides yet. A placeholder will show on the site until you add some.</p>
        </div>
      )}

      <div className="space-y-4">
        {items.map((slide, idx) => (
          <div key={slide.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#1b3226] text-white rounded-full flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              <span className="font-semibold text-gray-700 text-sm">Slide {idx + 1}</span>
              <button
                onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}
                className="ml-auto p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageInput value={slide.image} onChange={v => update(idx, 'image', v)} label="Slide Image" />
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Product Name</label>
                  <input type="text" value={slide.productName} onChange={e => update(idx, 'productName', e.target.value)}
                    placeholder="Red Bridal Lehenga"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Revenue Earned</label>
                  <input type="text" value={slide.revenue} onChange={e => update(idx, 'revenue', e.target.value)}
                    placeholder="₹3,200"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Caption (optional)</label>
                  <input type="text" value={slide.caption} onChange={e => update(idx, 'caption', e.target.value)}
                    placeholder="Rented 12 times this month"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

function TestimonialsEditor({ data, onSave }) {
  const [items, setItems] = useState(data?.items || DEFAULT_CONTENT.testimonials.items);
  const [saving, setSaving] = useState(false);

  const update = (idx, field, val) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  async function save() { setSaving(true); await onSave({ items }); setSaving(false); }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Testimonials</h2>
          <p className="text-sm text-gray-500 mt-1">Edit the "What F-Cians Are Saying" section.</p>
        </div>
        <button
          onClick={() => setItems(prev => [...prev, { id: Date.now().toString(), name: '', role: '', text: '', img: '' }])}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1b3226]/10 text-[#1b3226] rounded-lg text-sm font-medium hover:bg-[#1b3226]/20 transition-colors"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      <div className="space-y-4">
        {items.map((t, idx) => (
          <div key={t.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative">
            <button
              onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}
              className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={13} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImageInput value={t.img} onChange={v => update(idx, 'img', v)} label="Profile Photo" />
              <div className="md:col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Name</label>
                    <input type="text" value={t.name} onChange={e => update(idx, 'name', e.target.value)}
                      placeholder="Priya Sharma"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Role</label>
                    <input type="text" value={t.role} onChange={e => update(idx, 'role', e.target.value)}
                      placeholder="Regular Renter, Indore"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Testimonial</label>
                  <textarea value={t.text} onChange={e => update(idx, 'text', e.target.value)}
                    rows={3} placeholder="Share their experience…"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226] resize-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

function ContactEditor({ data, onSave }) {
  const [form, setForm] = useState({
    whatsapp:  data?.whatsapp  || '',
    email:     data?.email     || '',
    instagram: data?.instagram || '',
    facebook:  data?.facebook  || '',
    twitter:   data?.twitter   || '',
    youtube:   data?.youtube   || ''
  });
  const [saving, setSaving] = useState(false);
  async function save() { setSaving(true); await onSave(form); setSaving(false); }

  const fields = [
    { key: 'whatsapp',  label: 'WhatsApp Number',  placeholder: '918085676103',                hint: 'Digits only, no + or spaces — used for wa.me/…' },
    { key: 'email',     label: 'Contact Email',     placeholder: 'support@fashcycle.com',       hint: '' },
    { key: 'instagram', label: 'Instagram URL',     placeholder: 'https://www.instagram.com/…', hint: '' },
    { key: 'facebook',  label: 'Facebook URL',      placeholder: 'https://www.facebook.com/…',  hint: '' },
    { key: 'twitter',   label: 'Twitter / X URL',   placeholder: 'https://x.com/…',             hint: '' },
    { key: 'youtube',   label: 'YouTube URL',       placeholder: 'https://www.youtube.com/…',   hint: '' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Contact Info & Social Links</h2>
        <p className="text-sm text-gray-500 mt-1">Used in the Contact Us modal and footer social icons.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder, hint }) => (
          <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
            <input
              type="text"
              value={form[key]}
              onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3226] bg-white"
            />
          </div>
        ))}
      </div>
      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

/* ══════════════════════════════════════
   ADMIN PANEL SHELL
══════════════════════════════════════ */
function StoreApplicationsEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const leadsRef = collection(db, 'storeLeads');
    const unsubscribe = onSnapshot(leadsRef, (snapshot) => {
      const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by submittedAt descending
      fetchedItems.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      setItems(fetchedItems);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function removeItem(id) {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteDoc(doc(db, 'storeLeads', id));
    } catch (e) {
      console.error("Error deleting lead", e);
      alert("Failed to delete lead. Are you logged in as Admin?");
    }
  }

  async function clearAll() {
    if (!window.confirm("Are you sure you want to delete ALL leads? This cannot be undone.")) return;
    try {
      const batch = writeBatch(db);
      items.forEach(item => {
        batch.delete(doc(db, 'storeLeads', item.id));
      });
      await batch.commit();
    } catch (e) {
      console.error("Error clearing leads", e);
      alert("Failed to clear leads.");
    }
  }

  if (loading) {
    return <div className="py-12 flex justify-center text-[#1b3226]"><Loader2 size={32} className="animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Store Listing Requests</h2>
          <p className="text-sm text-gray-500 mt-1">Submissions from the "List Your Store" form on the website.</p>
        </div>
        {items.length > 0 && (
          <button onClick={clearAll} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <ClipboardList size={28} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No store requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{item.storeName || 'Unnamed Store'}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Submitted: {item.submittedAt ? new Date(item.submittedAt).toLocaleString() : 'N/A'}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p><span className="font-semibold text-gray-700">Owner:</span> {item.ownerName || '-'}</p>
                <p><span className="font-semibold text-gray-700">Phone:</span> {item.phone || '-'}</p>
                <p><span className="font-semibold text-gray-700">Email:</span> {item.email || '-'}</p>
                <p><span className="font-semibold text-gray-700">City:</span> {item.city || '-'}</p>
                <p className="md:col-span-2"><span className="font-semibold text-gray-700">Address:</span> {item.address || '-'}</p>
                <p className="md:col-span-2"><span className="font-semibold text-gray-700">Products:</span> {item.productTypes || '-'}</p>
                <p><span className="font-semibold text-gray-700">Inventory Size:</span> {item.inventorySize || '-'}</p>
                <p><span className="font-semibold text-gray-700">Price Range:</span> {item.priceRange || '-'}</p>
                <p className="md:col-span-2"><span className="font-semibold text-gray-700">Notes:</span> {item.notes || '-'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: 'hero',              label: 'Hero Image',         icon: <ImageIcon size={17} /> },
  { id: 'howItWorks',        label: 'How It Works',       icon: <LayoutDashboard size={17} /> },
  { id: 'categories',        label: 'Categories',         icon: <LayoutDashboard size={17} /> },
  { id: 'partners',          label: 'Partners',           icon: <Store size={17} /> },
  { id: 'storeOwnerSlides',  label: 'Store Owner Slider', icon: <BarChart3 size={17} /> },
  { id: 'testimonials',      label: 'Testimonials',       icon: <Users size={17} /> },
  { id: 'contact',           label: 'Contact & Socials',  icon: <Phone size={17} /> },
  { id: 'storeApplications', label: 'Store Leads',        icon: <ClipboardList size={17} /> }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { content, updateSection } = useContent();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  const save = section => data => updateSection(section, data);

  function renderEditor() {
    switch (activeTab) {
      case 'hero':             return <HeroEditor             data={content.hero}             onSave={save('hero')} />;
      case 'howItWorks':       return <HowItWorksEditor       data={content.howItWorks}       onSave={save('howItWorks')} />;
      case 'categories':       return <CategoriesEditor       data={content.categories}       onSave={save('categories')} />;
      case 'partners':         return <PartnersEditor         data={content.partners}         onSave={save('partners')} />;
      case 'storeOwnerSlides': return <StoreOwnerSlidesEditor data={content.storeOwnerSlides} onSave={save('storeOwnerSlides')} />;
      case 'testimonials':     return <TestimonialsEditor     data={content.testimonials}     onSave={save('testimonials')} />;
      case 'contact':          return <ContactEditor          data={content.contact}          onSave={save('contact')} />;
      case 'storeApplications':return <StoreApplicationsEditor />;
      default:                 return null;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 font-body overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-14'} bg-[#1b3226] text-white flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-3 border-b border-white/10 flex items-center gap-3 min-h-[64px]">
          {sidebarOpen && (
            <div className="flex items-center gap-2 flex-1 overflow-hidden">
              <img src="/LOGO1.png" alt="Fashcycle" className="h-7 bg-white/10 p-0.5 rounded flex-shrink-0" />
              <span className="font-heading font-bold text-sm truncate">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto flex-shrink-0"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0">{tab.icon}</span>
              {sidebarOpen && <span className="truncate">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-white/10">
          {sidebarOpen && (
            <p className="text-xs text-white/40 px-3 pb-2 truncate">{currentUser?.email}</p>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={17} className="flex-shrink-0" />
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {renderEditor()}
          </div>
        </div>
      </main>
    </div>
  );
}
