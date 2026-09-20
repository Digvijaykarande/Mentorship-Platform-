"use client";

import AboutSection from "./AboutSection";
import PersonalDetailsCard from "./PersonalDetailsCard";
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
      <AboutSection isEditing={isEditing} formData={formData} handleChange={handleChange} />

      <div className="grid gap-5 lg:grid-cols-3">
        <PersonalDetailsCard formData={formData} isEditing={isEditing} handleChange={handleChange} className="lg:col-span-2" />
        <SkillsCard
          skills={skills}
          isEditing={isEditing}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
        />
      </div>

      <InternshipCard formData={formData} />

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
