import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const ContentContext = createContext(null);
export const useContent = () => useContext(ContentContext);

const STORAGE_KEY = 'fashcycle_site_content';

export const DEFAULT_CONTENT = {
  hero: {
    backgroundImage: "https://fashcycle-official-media.s3.amazonaws.com/image/e67c5ee7-653c-428c-af81-8ea752adc26f.webp"
  },
  howItWorks: {
    phone1Image: "https://fashcycle-official-media.s3.amazonaws.com/image/c49087d6-575b-4924-9ab1-1fcb2ca03187.webp",
    phone2Image: "https://fashcycle-official-media.s3.amazonaws.com/image/ca87284d-15f5-474f-a2ba-729b4f5112ad.webp",
    phone3Image: "https://fashcycle-official-media.s3.amazonaws.com/image/8018e31e-e8bf-4992-bae9-1ac3a4b78ffb.webp"
  },
  categories: {
    items: [
      { id: "1",  title: "Lehengas",         img: "https://fashcycle-official-media.s3.amazonaws.com/image/e67c5ee7-653c-428c-af81-8ea752adc26f.webp" },
      { id: "2",  title: "Sarees",           img: "https://fashcycle-official-media.s3.amazonaws.com/image/391d38cd-3461-4536-bff5-e0ab59f17ed3.webp" },
      { id: "3",  title: "Gowns",            img: "https://fashcycle-official-media.s3.amazonaws.com/image/c2aa2ca5-acb6-468a-b1bb-0f447c96baf0.webp" },
      { id: "4",  title: "Anarkalis",        img: "https://fashcycle-official-media.s3.amazonaws.com/image/8018e31e-e8bf-4992-bae9-1ac3a4b78ffb.webp" },
      { id: "5",  title: "Sharara Sets",     img: "https://fashcycle-official-media.s3.amazonaws.com/image/5eb98e09-583f-4a1f-834e-75d2153a8b3a.webp" },
      { id: "6",  title: "Suits",            img: "https://fashcycle-official-media.s3.amazonaws.com/image/ca87284d-15f5-474f-a2ba-729b4f5112ad.webp" },
      { id: "7",  title: "Western Wear",     img: "https://fashcycle-official-media.s3.amazonaws.com/image/e6801b62-56a3-4b0e-80eb-88582d12313d.webp" },
      { id: "8",  title: "Crop Tops",        img: "https://fashcycle-official-media.s3.amazonaws.com/image/e6801b62-56a3-4b0e-80eb-88582d12313d.webp" },
      { id: "9",  title: "Sherwani",         img: "https://fashcycle-official-media.s3.amazonaws.com/image/e67c5ee7-653c-428c-af81-8ea752adc26f.webp" },
      { id: "10", title: "Azkan",            img: "https://fashcycle-official-media.s3.amazonaws.com/image/8018e31e-e8bf-4992-bae9-1ac3a4b78ffb.webp" },
      { id: "11", title: "Jacket",           img: "https://fashcycle-official-media.s3.amazonaws.com/image/ca87284d-15f5-474f-a2ba-729b4f5112ad.webp" },
      { id: "12", title: "Indo-Western Men", img: "https://fashcycle-official-media.s3.amazonaws.com/image/5eb98e09-583f-4a1f-834e-75d2153a8b3a.webp" },
      { id: "13", title: "Jodhpuri",         img: "https://fashcycle-official-media.s3.amazonaws.com/image/391d38cd-3461-4536-bff5-e0ab59f17ed3.webp" },
      { id: "14", title: "Blazer",           img: "https://fashcycle-official-media.s3.amazonaws.com/image/c2aa2ca5-acb6-468a-b1bb-0f447c96baf0.webp" }
    ]
  },
  partners: { items: [] },
  storeOwnerSlides: { items: [] },
  storeApplications: { items: [] },
  testimonials: {
    items: [
      { id: "1", name: "Priya Sharma", role: "Regular Renter, Indore",   text: "Rented a designer lehenga for a wedding — the process was seamless and saved a lot of money.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { id: "2", name: "Rahul Verma",  role: "Lender & Renter",          text: "Earns extra income listing clothes, reduces waste, loves the community.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { id: "3", name: "Ananya Patel", role: "Fashion Enthusiast",       text: "Can wear designer occasion wear affordably without contributing to fast fashion.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
    ]
  },
  contact: {
    whatsapp:  "918085676103",
    email:     "support@fashcycle.com",
    instagram: "https://www.instagram.com/fashcycle.official?igsh=NXhpYjRkZGw3Y21v&utm_source=qr",
    facebook:  "https://www.facebook.com/profile.php?id=61577640128490&sk=about",
    twitter:   "https://x.com/fashcycle19878",
    youtube:   "https://www.youtube.com/@fashcycle"
  }
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    const docRef = doc(db, 'siteData', 'content');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setContent({ ...DEFAULT_CONTENT, ...docSnap.data() });
      } else {
        setContent(DEFAULT_CONTENT);
      }
    }, (error) => {
      console.error("Error fetching content:", error);
    });

    return unsubscribe;
  }, []);

  async function updateSection(section, data) {
    const newContent = { ...content, [section]: data };
    
    // We update local state optimistically
    setContent(newContent);
    
    // And push to Firestore
    try {
      const docRef = doc(db, 'siteData', 'content');
      await setDoc(docRef, { [section]: data }, { merge: true });
    } catch (e) {
      console.error("Error updating document: ", e);
      alert("Failed to save changes to the database. Are you logged in as Admin?");
    }
  }

  return (
    <ContentContext.Provider value={{ content, updateSection }}>
      {children}
    </ContentContext.Provider>
  );
}
