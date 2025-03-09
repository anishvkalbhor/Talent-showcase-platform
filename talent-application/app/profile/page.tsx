"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function CreateProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    major: "",
    year: "",
    bio: "",
    profilePic: null,
    linkedIn: "",
    github: "",
    resume: null,
    skills: [],
  });
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const addSkill = () => {
    if (newSkill.trim() !== "" && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    router.push("/dashboard")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-10">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <label className="cursor-pointer mb-4">
            {formData.profilePic ? (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
                Upload
              </div>
            )}
            <input type="file" name="profilePic" onChange={handleFileChange} className="hidden" />
          </label>
          <input type="file" name="resume" onChange={handleFileChange} className="w-full p-2 bg-gray-700 rounded" />
          <div className="flex items-center gap-2 mt-2">
            <input name="linkedIn" placeholder="LinkedIn Username" value={formData.linkedIn} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
            {formData.linkedIn && (
              <a href={`https://www.linkedin.com/in/${formData.linkedIn}`} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-500 text-2xl" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input name="github" placeholder="GitHub Username" value={formData.github} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
            {formData.github && (
              <a href={`https://github.com/${formData.github}`} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-400 text-2xl" />
              </a>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-1/2 p-2 bg-gray-700 rounded" />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-1/2 p-2 bg-gray-700 rounded" />
            </div>
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
            <input name="university" placeholder="University" value={formData.university} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
            <input name="major" placeholder="Major" value={formData.major} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
            <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
            <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded"></textarea>
            
            {/* Skills Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="p-2 bg-gray-700 rounded"
                />
                <button type="button" onClick={addSkill} className="p-2 bg-blue-500 rounded">Add</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="bg-blue-500 px-3 py-1 rounded flex items-center">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-red-400">x</button>
                  </div>
                ))}
              </div>
            </div>
            
            <button type="submit" className="w-full p-2 bg-green-500 rounded">Save Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
