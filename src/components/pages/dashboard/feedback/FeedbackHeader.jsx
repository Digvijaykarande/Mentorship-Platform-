"use client";

import { MessageSquarePlus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

export default function FeedbackHeader({ totalFeedback = 0, onRequestFeedback }) {
  return (
    <PageHeader
      title="Feedback"
      subtitle={`${totalFeedback} mentor ${totalFeedback === 1 ? "review" : "reviews"} to learn from. Track what to improve next.`}
    >
    </PageHeader>
  );
}
