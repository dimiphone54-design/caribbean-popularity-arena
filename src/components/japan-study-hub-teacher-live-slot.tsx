"use client";

import { useState } from "react";
import {
  EMPTY_JAPAN_TEACHER_APPLICATION,
  JAPAN_TEACHER_LEVELS,
  JAPAN_TEACHER_SLOTS,
  JAPAN_TEACHER_SUBJECTS,
  japanTeacherSlotMeta,
  type JapanTeacherApplicationForm,
  type JapanTeacherProfile,
} from "@/lib/japan-study-hub-teacher-slot";

/* Public free campus · gifts/payout frozen in Command Center FREEZE COMING SOON */
const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif';

const STEPS = ["本人情報", "学歴", "指導"] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black border transition
              ${i < current ? "border-[#fca5a5] bg-[#2d0a14] text-[#fca5a5]" :
                i === current ? "border-[#ff4466] bg-[#ff4466] text-[#fff0f3]" :
                "border-[#3d1520] bg-transparent text-[#374151]"}`}
          >
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-[0.1em] hidden sm:inline
            ${i === current ? "text-[#ff4466]" : "text-[#374151]"}`}>
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span className={`mx-1 text-[10px] ${i < current ? "text-[#ff4466]" : "text-[#3d1520]"}`}>—</span>
          )}
        </div>
      ))}
    </div>
  );
}

function FieldInput({
  id, label, placeholder, value, onChange, type = "text", required = true,
}: {
  id: string; label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={id} type={type} required={required} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[#3d1520] bg-[#0a0408] px-3 py-2 text-sm text-[#fff0f3] placeholder-[#374151] outline-none focus:border-[#ff4466]/50"
      />
    </div>
  );
}

function TeacherApplyForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<JapanTeacherApplicationForm>(EMPTY_JAPAN_TEACHER_APPLICATION);

  const set = (key: keyof JapanTeacherApplicationForm) => (val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#ff4466]/30 bg-[#1a0810]/90 p-5 text-center space-y-3" lang="ja" style={{ fontFamily: JA_FONT }}>
        <p className="text-3xl">🎓</p>
        <p className="text-sm font-black text-[#fff0f3]">応募を受け付けました！</p>
        <p className="text-xs leading-5 text-[#fca5a5]/80">
          プロフィールを確認し、日本学習ハブのライブ枠に追加します。
          無料で教えられます — この公開キャンパスレーンではお支払いは不要です。
        </p>
        <button type="button" onClick={onClose}
          className="mt-2 rounded-lg border border-[#ff4466]/30 px-4 py-1.5 text-xs font-bold text-[#ff4466] transition hover:border-[#ff4466]/60">
          閉じる
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}
      className="rounded-2xl border border-[#ff4466]/25 bg-[#1a0810]/90 p-5 space-y-4"
      aria-label="日本学習ハブ講師応募"
      lang="ja"
      style={{ fontFamily: JA_FONT }}>

      <header>
        <p className="text-[9px] font-black tracking-[0.18em] text-[#ff4466]">
          日本学習ハブ · 講師応募
        </p>
        <h3 className="mt-1 text-base font-black text-[#fff0f3]">ライブ配信に応募</h3>
        <p className="mt-1 text-xs leading-5 text-[#94a3b8]">
          応募も配信開始も無料。生徒も無料参加。この公開パネルにカードや振込フォームはありません。
        </p>
      </header>

      <StepIndicator current={step} />

      {step === 0 && (
        <div className="space-y-3">
          <FieldInput id="jf-name" label="氏名" placeholder="例: 田中 ゆき"
            value={form.fullName} onChange={set("fullName")} />
          <FieldInput id="jf-email" label="メールアドレス" placeholder="you@example.com"
            type="email" value={form.email} onChange={set("email")} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <FieldInput id="jf-uni" label="在学・卒業した大学 / 学校"
            placeholder="例: 東京大学" value={form.university} onChange={set("university")} />
          <FieldInput id="jf-degree" label="専攻科目"
            placeholder="例: 日本語 · 教育学"
            value={form.degreeSubject} onChange={set("degreeSubject")} />
          <FieldInput id="jf-years-study" label="修学年数"
            placeholder="例: 3年 · または現在2年次"
            value={form.yearsOfStudy} onChange={set("yearsOfStudy")} />
          <div className="flex items-center gap-2">
            <input id="jf-currently-studying" type="checkbox"
              checked={form.isCurrentlyStudying}
              onChange={(e) => set("isCurrentlyStudying")(e.target.checked)}
              className="h-4 w-4 rounded border-[#3d1520] accent-[#ff4466]" />
            <label htmlFor="jf-currently-studying" className="text-xs text-[#94a3b8]">
              現在在学中です
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="jf-level" className="text-[10px] font-bold tracking-[0.1em] text-[#94a3b8]">
              指導レベル<span className="text-red-400 ml-0.5">*</span>
            </label>
            <select id="jf-level" required
              value={form.teacherLevel}
              onChange={(e) => set("teacherLevel")(e.target.value)}
              className="rounded-lg border border-[#3d1520] bg-[#0a0408] px-3 py-2 text-sm text-[#fff0f3] outline-none focus:border-[#ff4466]/50">
              <option value="">レベルを選択…</option>
              {JAPAN_TEACHER_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="jf-subject" className="text-[10px] font-bold tracking-[0.1em] text-[#94a3b8]">
              教えたい科目<span className="text-red-400 ml-0.5">*</span>
            </label>
            <select id="jf-subject" required
              value={form.subjectToTeach}
              onChange={(e) => set("subjectToTeach")(e.target.value)}
              className="rounded-lg border border-[#3d1520] bg-[#0a0408] px-3 py-2 text-sm text-[#fff0f3] outline-none focus:border-[#ff4466]/50">
              <option value="">科目を選択…</option>
              {JAPAN_TEACHER_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>
              ))}
            </select>
          </div>
          <FieldInput id="jf-years-teach" label="指導経験年数"
            placeholder="例: 2年 · または初年度チューター"
            value={form.yearsTeaching} onChange={set("yearsTeaching")} />
          <FieldInput id="jf-availability" label="配信できる時間帯"
            placeholder="例: 平日夜 · 土曜午前"
            value={form.availability} onChange={set("availability")} />
          <div className="flex flex-col gap-1">
            <label htmlFor="jf-bio" className="text-[10px] font-bold tracking-[0.1em] text-[#94a3b8]">
              短い自己紹介
            </label>
            <textarea id="jf-bio" rows={3}
              placeholder="例: JLPT N1講師 · 初心者向けアニメ日本語。"
              value={form.shortBio}
              onChange={(e) => set("shortBio")(e.target.value)}
              className="rounded-lg border border-[#3d1520] bg-[#0a0408] px-3 py-2 text-sm text-[#fff0f3] placeholder-[#374151] outline-none focus:border-[#ff4466]/50 resize-none" />
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-[#3d1520] px-4 py-2.5 text-xs font-bold text-[#64748b] transition hover:border-[#5b2130]">
            ← 戻る
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)}
            className="flex-1 rounded-xl border border-[#ff4466]/40 bg-gradient-to-r from-[#2d0a14]/90 to-[#4a1020]/60 py-2.5 text-xs font-black tracking-[0.1em] text-[#ff4466] transition hover:border-[#ff4466]/70">
            次へ →
          </button>
        ) : (
          <button type="submit"
            className="flex-1 rounded-xl border border-[#ff4466]/50 bg-gradient-to-r from-[#2d0a14]/90 to-[#4a1020]/60 py-2.5 text-xs font-black tracking-[0.1em] text-[#ff4466] transition hover:border-[#ff4466]/80">
            無料応募を送信 🎓
          </button>
        )}
        <button type="button" onClick={onClose}
          className="rounded-xl border border-[#3d1520] px-4 py-2.5 text-xs font-bold text-[#64748b] transition hover:border-[#5b2130]">
          キャンセル
        </button>
      </div>
    </form>
  );
}

function TeacherCard({ teacher }: { teacher: JapanTeacherProfile }) {
  const isOpenSlot = teacher.subject === "オープンスロット";

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#ff4466]/40 bg-gradient-to-br from-[#1a0810]/90 to-[#0a0408]/80 p-4 shadow-[0_0_24px_rgba(255,68,102,0.08)] transition hover:border-[#ff4466]/70" lang="ja" style={{ fontFamily: JA_FONT }}>
      {teacher.isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          <span className="text-[9px] font-black tracking-[0.12em] text-red-400">配信中</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#ff4466]/50 bg-[#1a0810] text-xl font-black text-[#ff4466]">
          {teacher.avatarInitials}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="truncate text-sm font-black tracking-wide text-[#fff0f3]">{teacher.name}</p>
          <p className="truncate text-[10px] font-bold tracking-[0.12em] text-[#ff4466]/70">{teacher.subject}</p>
          {teacher.title !== "担当科目をここに" && (
            <p className="truncate text-[10px] text-[#64748b]">{teacher.title}</p>
          )}
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-[#94a3b8]">{teacher.bio}</p>

      {teacher.isLive && teacher.viewers > 0 && (
        <p className="mt-1 text-[10px] font-bold text-[#ff4466]">
          👁 {teacher.viewers.toLocaleString("ja-JP")} 視聴中
        </p>
      )}

      {!isOpenSlot ? (
        <div className="mt-3 space-y-2">
          {teacher.isLive ? (
            <button type="button"
              className="w-full rounded-xl border border-[#ff4466]/40 bg-gradient-to-r from-[#2d0a14]/90 to-[#4a1020]/60 py-2.5 text-xs font-black tracking-[0.1em] text-[#ff4466]">
              🔴 無料ライブに参加
            </button>
          ) : (
            <p className="rounded-xl border border-[#3d1520] py-2 text-center text-[10px] font-bold text-[#374151]">
              いまは配信していません
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-[#ff4466]/30 bg-[#ff4466]/5 py-3 text-center">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#ff4466]/60">
            🎓 枠オープン · 無料
          </p>
          <p className="mt-0.5 text-[9px] text-[#64748b]">日本人教育者を待っています</p>
        </div>
      )}
    </article>
  );
}

export function JapanStudyHubTeacherLiveSlot() {
  const [showApply, setShowApply] = useState(false);
  const meta = japanTeacherSlotMeta;

  return (
    <section className="japan-study-hub-teacher-slot space-y-4" aria-label={meta.title} lang="ja" style={{ fontFamily: JA_FONT }}>
      <header className="text-center">
        <p className="text-[9px] font-black tracking-[0.18em] text-[#ff4466]">{meta.kicker}</p>
        <h2 className="mt-2 text-2xl font-black tracking-wide text-[#eef6ff] sm:text-3xl">
          {meta.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">{meta.description}</p>
        <p className="mx-auto mt-1.5 max-w-md text-[11px] font-semibold text-[#ff4466]/90">
          {meta.hostFreeNote}
          {meta.applyHint ? ` · ${meta.applyHint}` : null}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {JAPAN_TEACHER_SLOTS.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {!showApply ? (
        <div className="text-center pt-2">
          <button type="button" onClick={() => setShowApply(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ff4466]/35 bg-[#2d0a14]/60 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#ff4466] transition hover:border-[#ff4466]/65">
            🎓 {meta.applyLabel}
          </button>
        </div>
      ) : (
        <TeacherApplyForm onClose={() => setShowApply(false)} />
      )}
    </section>
  );
}
