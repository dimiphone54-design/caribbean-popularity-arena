"use client";

import { useState } from "react";
import {
  eldersTableGameQuestions,
  eldersTableGameResponses,
  type EldersTableFeaturedPanelId,
  type EldersTableGameQuestionId
} from "@/lib/the-elders-table";
import type { EldersTableVersionConfig } from "@/lib/the-elders-table-versions";

type TheEldersTableQuestionsPanelProps = {
  config?: Pick<EldersTableVersionConfig, "optionsItems">;
  items?: "all" | EldersTableFeaturedPanelId[];
};

export function TheEldersTableQuestionsPanel({
  config,
  items = config?.optionsItems ?? "all"
}: TheEldersTableQuestionsPanelProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<EldersTableGameQuestionId | null>(null);

  const panelQuestions =
    items === "all"
      ? [...eldersTableGameQuestions]
      : eldersTableGameQuestions.filter((question) =>
          items.includes(question.id as EldersTableFeaturedPanelId)
        );

  return (
    <aside
      className="elders-table-noir-panel elders-table-noir-questions-panel mx-4 mb-6 max-h-[52vh] overflow-y-auto rounded-2xl px-4 py-4 sm:mx-6 sm:max-h-[58vh] sm:px-5 sm:py-5 lg:mx-0 lg:mb-0 lg:mr-6 lg:mt-auto lg:max-h-[min(78vh,44rem)] lg:w-[min(26rem,38vw)] lg:shrink-0 lg:self-end lg:rounded-3xl lg:px-5 lg:py-6"
      aria-label="Games and activities"
    >
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[rgba(212,175,55,0.78)]">
        Games & activities
      </p>
      <ul className="space-y-2.5">
        {panelQuestions.map((question) => {
          const active = selectedQuestion === question.id;

          return (
            <li key={question.id}>
              <button
                type="button"
                onClick={() => setSelectedQuestion(active ? null : question.id)}
                className={`elders-table-noir-plate w-full px-4 py-3 text-left sm:px-5 sm:py-3.5${
                  active ? " elders-table-noir-plate-active" : ""
                }`}
                aria-expanded={active}
              >
                <span className="elders-table-noir-plate-text">{question.label}</span>
              </button>

              {active ? (
                <p className="elders-table-noir-reply mt-2 px-4 py-3 text-sm leading-7 sm:px-5">
                  {eldersTableGameResponses[question.id]}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
