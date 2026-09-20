"use client";

import { MessageSquareText, TrendingUp, AlertCircle, Star } from "lucide-react";
import MiniStatCard from "@/components/common/MiniStatCard";

export default function FeedbackSummary({ summary, onFilter }) {
  const { total = 0, newFeedback = 0, actionRequired = 0, average = "0.0" } = summary || {};

  const cards = [
    { icon: MessageSquareText, label: "Total Feedback", value: total, tone: "blue", onClick: () => onFilter("all") },
    { icon: TrendingUp, label: "In Review", value: newFeedback, tone: "indigo", onClick: () => onFilter("new") },
    { icon: AlertCircle, label: "Action Required", value: actionRequired, tone: "amber", onClick: () => onFilter("action") },
    { icon: Star, label: "Avg Rating", value: `${average}/5`, tone: "emerald" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map(({ onClick, ...card }) => (
        <button
          key={card.label}
          type="button"
          onClick={onClick}
          disabled={!onClick}
          className="text-left disabled:cursor-default"
        >
          <MiniStatCard {...card} />
        </button>
      ))}
    </div>
  );
}
