"use client";

import { useRef, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

import ProfileHeader from "@/components/pages/dashboard/profile/ProfileHeader";
import ProfileTabs from "@/components/pages/dashboard/profile/ProfileTabs";
import ProfileOverview from "@/components/pages/dashboard/profile/ProfileOverview";
import ProfileComingSoon from "@/components/pages/dashboard/profile/ProfileComingSoon";
import PageHeader from "@/components/common/PageHeader";
import SaveToast from "@/components/common/SaveToast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const INITIAL_FORM_DATA = {
  firstName: "Digvijay",
  lastName: "Karande",
  username: "digvijaykarande",
  dob: "13 dec 2003",
  gender: "male",
  phone: "+91 8010503097",
  email: "karandedigvijay2@gmail.com",
  location: "Pune, Maharashtra",
  address: "Pune, Maharashtra, India",
  internId: "LYX-INT-2026-001",
  headline: "Full Stack Development Intern",
  company: "Tech Solutions",
  internshipStatus: "Active",
  internshipDuration: "6 Months",
  joinDate: "August 2026",
  bio: "Passionate Computer Applications student & Frontend Development Intern focused on building sleek, accessible, and high-performance modern web platforms using React, Next.js, and Tailwind CSS.",
  careerInterests: "Frontend Engineering, UI/UX and Full-Stack Development",
  areasOfInterest: "Web Development, Artificial Intelligence, Cloud Computing",
  professionalGoals: "To become a skilled full-stack developer and build scalable, user-focused digital products.",
  linkedin: "linkedin.com/in/digvijaykarande",
  github: "github.com/digvijaykarande",
  portfolio: "digvijaykarande.dev",
  website: "digvijaykarande.dev",
  otherLinks: [],
};

const INITIAL_SKILLS = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "Git & GitHub", "REST APIs"];

function useProfileForm(onSaveSuccess) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [initialState, setInitialState] = useState(INITIAL_FORM_DATA);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [initialSkills, setInitialSkills] = useState(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState("");
  const [newProfessionalLink, setNewProfessionalLink] = useState({ name: "", url: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill || skills.includes(skill)) return;
    setSkills((prev) => [...prev, skill]);
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => setSkills((prev) => prev.filter((s) => s !== skillToRemove));

  const handleProfessionalLinkChange = (field, value) =>
    setNewProfessionalLink((prev) => ({ ...prev, [field]: value }));

  const handleAddProfessionalLink = () => {
    const { name, url } = newProfessionalLink;
    if (!name.trim() || !url.trim()) return;
    setFormData((prev) => ({ ...prev, otherLinks: [...(prev.otherLinks || []), { name: name.trim(), url: url.trim() }] }));
    setNewProfessionalLink({ name: "", url: "" });
  };

  const handleRemoveProfessionalLink = (indexToRemove) =>
    setFormData((prev) => ({ ...prev, otherLinks: prev.otherLinks.filter((_, idx) => idx !== indexToRemove) }));

  const handleCancel = () => {
    setFormData(initialState);
    setSkills(initialSkills);
    setIsEditing(false);
    setNewProfessionalLink({ name: "", url: "" });
  };

  const handleSave = () => {
    setInitialState(formData);
    setInitialSkills(skills);
    setIsEditing(false);
    setNewProfessionalLink({ name: "", url: "" });
    onSaveSuccess?.();
  };

  return {
    formData,
    skills,
    newSkill,
    setNewSkill,
    isEditing,
    setIsEditing,
    newProfessionalLink,
    handleChange,
    handleAddSkill,
    handleRemoveSkill,
    handleProfessionalLinkChange,
    handleAddProfessionalLink,
    handleRemoveProfessionalLink,
    handleCancel,
    handleSave,
  };
}

export default function ProfilePage() {
  const avatarInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSaveSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const profile = useProfileForm(handleSaveSuccess);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  return (
    <div className="relative mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      <SaveToast
        show={showToast}
        title="Profile updated"
        description="Your profile changes were saved successfully."
        onClose={() => setShowToast(false)}
      />

      <PageHeader title="Profile Management" subtitle="Manage your personal profile and public presence">
        {profile.isEditing ? (
          <>
            <Button type="button" variant="outline" size="sm" onClick={profile.handleCancel} className="gap-1.5">
              <X className="h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={profile.handleSave} className="gap-1.5 bg-blue-600 text-white hover:bg-blue-700">
              <Check className="h-3.5 w-3.5" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="sm"
            onClick={() => profile.setIsEditing(true)}
            className="gap-1.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit Profile
          </Button>
        )}
      </PageHeader>

      <ProfileHeader formData={profile.formData} avatarUrl={avatarUrl} avatarInputRef={avatarInputRef} handleAvatarUpload={handleAvatarUpload} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-5">
        <ProfileTabs />

        <TabsContent value="overview">
          <ProfileOverview
            formData={profile.formData}
            isEditing={profile.isEditing}
            handleChange={profile.handleChange}
            skills={profile.skills}
            newSkill={profile.newSkill}
            setNewSkill={profile.setNewSkill}
            handleAddSkill={profile.handleAddSkill}
            handleRemoveSkill={profile.handleRemoveSkill}
            newProfessionalLink={profile.newProfessionalLink}
            handleProfessionalLinkChange={profile.handleProfessionalLinkChange}
            handleAddProfessionalLink={profile.handleAddProfessionalLink}
            handleRemoveProfessionalLink={profile.handleRemoveProfessionalLink}
          />
        </TabsContent>

        <TabsContent value="details"><ProfileComingSoon label="Details" /></TabsContent>
        <TabsContent value="settings"><ProfileComingSoon label="Settings" /></TabsContent>
        <TabsContent value="share"><ProfileComingSoon label="Share" /></TabsContent>
      </Tabs>
    </div>
  );
}
