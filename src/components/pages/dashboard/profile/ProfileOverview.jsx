"use client";

import AboutSection from "./AboutSection";
import SkillsCard from "./SkillsCard";
import InternshipCard from "./InternshipCard";
import ConnectionsCard from "./ConnectionsCard";

export default function ProfileOverview({
  formData,
  isEditing,
  handleChange,
  skills,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleRemoveSkill,
  newProfessionalLink,
  handleProfessionalLinkChange,
  handleAddProfessionalLink,
  handleRemoveProfessionalLink,
}) {
  return (
    <div className="space-y-5">
      <AboutSection
        isEditing={isEditing}
        formData={formData}
        handleChange={handleChange}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <InternshipCard formData={formData} />
        <SkillsCard
          skills={skills}
          isEditing={isEditing}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
        />
      </div>

      <ConnectionsCard
        formData={formData}
        isEditing={isEditing}
        handleChange={handleChange}
        newLink={newProfessionalLink}
        onLinkFieldChange={handleProfessionalLinkChange}
        onAddLink={handleAddProfessionalLink}
        onRemoveLink={handleRemoveProfessionalLink}
      />
    </div>
  );
}

// Details, education, and certifications intentionally live in the Details tab.
// Keeping them out of Overview prevents the page from becoming one very long card stack.
