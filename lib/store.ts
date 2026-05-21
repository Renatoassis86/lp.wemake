"use client";

import { create } from "zustand";

/* ============================================================
   Global UI state — kept intentionally minimal.
   Zustand store handles cross-section concerns: nav state,
   active section tracking, command palette / contact modal.
   ============================================================ */

type UiState = {
  navOpen: boolean;
  contactOpen: boolean;
  activeSection: string | null;
  scrolled: boolean;
  setNavOpen: (open: boolean) => void;
  setContactOpen: (open: boolean) => void;
  setActiveSection: (id: string | null) => void;
  setScrolled: (v: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  navOpen: false,
  contactOpen: false,
  activeSection: null,
  scrolled: false,
  setNavOpen: (navOpen) => set({ navOpen }),
  setContactOpen: (contactOpen) => set({ contactOpen }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setScrolled: (scrolled) => set({ scrolled }),
}));
