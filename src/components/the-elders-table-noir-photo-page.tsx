"use client";

import { TheEldersTablePhotoBackdrop } from "@/components/the-elders-table-photo-backdrop";
import { TheEldersTableQuestionsPanel } from "@/components/the-elders-table-questions-panel";
import { TheEldersTableVersionPicker } from "@/components/the-elders-table-version-picker";
import { eldersTableNoirTagline } from "@/lib/the-elders-table";
import type { EldersTableVersionId } from "@/lib/the-elders-table-versions";

type TheEldersTableNoirPhotoPageProps = {
  version: EldersTableVersionId;
};

export function TheEldersTableNoirPhotoPage({ version }: TheEldersTableNoirPhotoPageProps) {
  return (
    <main className="elders-table-noir relative min-h-screen overflow-hidden pb-24" data-elders-version={version}>
      <TheEldersTablePhotoBackdrop />
      <TheEldersTableVersionPicker current={version} />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <div className="elders-table-noir-hero flex flex-1 flex-col px-5 pb-6 pt-8 sm:px-8 sm:pt-10 lg:pb-10 lg:pr-4">
          <header className="elders-table-noir-header mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="elders-table-noir-brand">{eldersTableNoirTagline}</p>
            <h1 className="elders-table-noir-title">THE ELDERS TABLE</h1>
            <p className="elders-table-noir-subbrand mt-2">LE MARRAKECH NOIR · TOKYO</p>
          </header>
        </div>

        <TheEldersTableQuestionsPanel items="all" />
      </div>
    </main>
  );
}
