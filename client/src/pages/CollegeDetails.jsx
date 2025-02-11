import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  Upload,
  Send,
  X,
  Plus,
  School2,
  Download,
  Edit,
  Bold,
  Italic,
  Smile,
  Image,
  List,
  Paperclip,
  AlignLeft,
  AlignCenter, AlignRight, AlignJustify,
  Trash
} from "lucide-react";
import { api } from "../api/mockData";

export function NotificationModal  ({ isOpen, onClose, onSend })  {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textAlign, setTextAlign] = useState("left"); // Default alignment
  const [attachments, setAttachments] = useState([]);
  const [images, setImages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // ── TEXT ALIGNMENT HANDLER ───────────────────────────
  const toggleTextAlignment = () => {
    const alignments = ["left", "center", "right", "justify"];
    const nextIndex = (alignments.indexOf(textAlign) + 1) % alignments.length;
    setTextAlign(alignments[nextIndex]);
  };

  // ── APPLY TEXT FORMATTING (Bold & Italic) ───────────────────────────
  const handleTextChange = (e) => {
    let formattedText = e.target.value;
    if (isBold) formattedText = `**${formattedText}**`;
    if (isItalic) formattedText = `_${formattedText}_`;
    setDescription(formattedText);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-[600px] max-h-[90vh] flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between bg-blue-600 p-4 text-white rounded-t-xl">
          <h2 className="text-2xl font-semibold">New Message</h2>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-grow" style={{ maxHeight: "60vh" }}>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* TEXTAREA WITH ALIGNMENT FIX */}
          <textarea
            value={description}
            onChange={handleTextChange}
            placeholder="Type your message here..."
            className="w-full p-3 mb-4 border border-gray-200 rounded-lg min-h-[100px] focus:outline-none focus:border-blue-500"
            style={{
              textAlign: textAlign, // Apply correct alignment
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
            }}
          />

          {/* IMAGES */}
          <div className="flex flex-wrap gap-2">
            {images.map((img) => (
              <div key={img.id} className="relative">
                <img src={img.url} alt="Uploaded" className="w-24 h-24 object-cover rounded-lg" />
                <button onClick={() => setImages(images.filter((i) => i.id !== img.id))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* ATTACHMENTS */}
          {attachments.length > 0 && (
            <div className="mt-2">
              {attachments.map((file) => (
                <div key={file.id} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                  📎 {file.name}
                  <button onClick={() => setAttachments(attachments.filter((a) => a.id !== file.id))} className="text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Hidden Inputs */}
          <input type="file" accept="image/*" ref={imageInputRef} style={{ display: "none" }} onChange={(e) => setImages([...images, { id: Date.now(), url: URL.createObjectURL(e.target.files[0]) }])} />
          <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} style={{ display: "none" }} onChange={(e) => setAttachments([...attachments, { id: Date.now(), name: e.target.files[0].name }])} />
        </div>

        {/* FOOTER */}
        <div className="bg-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsBold(!isBold)} className={`p-2 rounded ${isBold ? "bg-gray-300" : ""}`}>
              <Bold className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
            <button onClick={() => setIsItalic(!isItalic)} className={`p-2 rounded ${isItalic ? "bg-gray-300" : ""}`}>
              <Italic className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 rounded">
              <Smile className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
            <button onClick={() => imageInputRef.current.click()} className="p-2 rounded">
              <Image className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
            <button onClick={() => fileInputRef.current.click()} className="p-2 rounded">
              <Paperclip className="h-5 w-5 text-gray-600 hover:text-black" />
            </button>
            
            {/* TEXT ALIGNMENT TOGGLE BUTTON */}
            <button onClick={toggleTextAlignment} className="p-2 rounded">
              {textAlign === "left" && <AlignLeft className="h-5 w-5 text-gray-600 hover:text-black" />}
              {textAlign === "center" && <AlignCenter className="h-5 w-5 text-gray-600 hover:text-black" />}
              {textAlign === "right" && <AlignRight className="h-5 w-5 text-gray-600 hover:text-black" />}
              {textAlign === "justify" && <AlignJustify className="h-5 w-5 text-gray-600 hover:text-black" />}
            </button>
          </div>

          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export function CollegeDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [college, setCollege] = useState();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCollege, setEditedCollege] = useState(college);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await api.getCollege("CL-0178");
        setCollege(data);
        setEditedCollege(data);
      } catch (error) {
        console.error("Error fetching college data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, []);

  const removeProgram = async (code) => {
    if (!college) return;
    try {
      const updatedPrograms = await api.removeProgram(college.id, code);
      setCollege((prev) =>
        prev ? { ...prev, programs: updatedPrograms } : null
      );
    } catch (error) {
      console.error("Error removing program:", error);
    }
  };

  const handleUploadMOU = async () => {
    if (!college) return;
    try {
      await api.uploadMOU(college.id, null);
      alert("MOU uploaded successfully");
    } catch (error) {
      console.error("Error uploading MOU:", error);
    }
  };

  const handleDownloadMOU = async () => {
    if (!college) return;
    try {
      await api.downloadMOU(college.id);
      alert("MOU downloaded successfully");
    } catch (error) {
      console.error("Error downloading MOU:", error);
    }
  };

  const handleSendNotification = async (subject, description) => {
    if (!college) return;
    try {
      await api.sendNotification(college.id, `${subject}\n\n${description}`);
      setIsNotificationModalOpen(false);
      alert("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!college || !editedCollege) return;
    try {
      await api.updateCollege(college.id, editedCollege);
      setCollege(editedCollege);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating college:", error);
    }
  };

  const handleCancel = () => {
    setEditedCollege(college);
    setIsEditing(false);
  };

  const filteredAdmins =
    college?.admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        College not found
      </div>
    );
  }

  return (
    <div className="font-montserrat min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-collegeDetailsBlack">
          College Management
        </h1>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <span>Apply Filters</span>
          </button>
        </div>

        {/* College Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-sb text-black mb-2">
                {college.name}
              </h2>
              <p className="text-lg font-light text-black">
                College Code: {college.id}
              </p>
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? "Save" : "Edit"}</span>
            </button>
          </div>

          <div className="flex gap-8 mb-8">
            <img
              src={college.logo}
              alt={college.name}
              className="w-48 h-auto object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-medium font-base text-currcol mb-1">
                    LOCATION
                  </h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedCollege?.location}
                      onChange={(e) =>
                        setEditedCollege((prev) =>
                          prev ? { ...prev, location: e.target.value } : null
                        )
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-xl font-bold text-black">
                      {college.location}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-medium font-base text-currcol mb-1">
                    CONTACT INFORMATION
                  </h3>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedCollege?.email}
                      onChange={(e) =>
                        setEditedCollege((prev) =>
                          prev ? { ...prev, email: e.target.value } : null
                        )
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-xl font-bold text-black">
                      {college.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-medium font-base text-currcol mb-1">
                  NUMBER OF REGISTERED STUDENTS
                </h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedCollege?.registeredStudents}
                    onChange={(e) =>
                      setEditedCollege((prev) =>
                        prev
                          ? {
                              ...prev,
                              registeredStudents: parseInt(e.target.value),
                            }
                          : null
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-xl font-bold text-black">
                    {college.registeredStudents}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleUploadMOU}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center space-x-2 hover:bg-blue-50"
            >
              <Upload className="h-4 w-4" />
              <span>Upload MOU</span>
            </button>
            <button
              onClick={handleDownloadMOU}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center space-x-2 hover:bg-blue-50"
            >
              <Download className="h-4 w-4" />
              <span>Download MOU</span>
            </button>
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              <span>Send Notification</span>
            </button>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-programsBlack mb-4">
            PROGRAMS ASSIGNED
          </h3>
          <div className="flex flex-wrap gap-2">
            {college.programs.map((program) => (
              <div
                key={program.code}
                className="flex items-center bg-blue-50 ext-base font-bold text-programsBlack px-3 py-1 rounded-full border border-blue-200"
              >
                <span title={program.fullName} className="font-bold">
                  {program.name}
                </span>
                <button
                  onClick={() => removeProgram(program.code)}
                  className="ml-2 hover:text-blue-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>ADD</span>
            </button>
          </div>
        </div>

        {/* Admins Table */}
        <div className="bg-collegeDetailsTableBackground rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  College Admin
                </th>
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  College ID
                </th>
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  Mail ID
                </th>
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAdmins.map((admin, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-black">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-black">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-sb text-black italic underline">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-black">
                    {admin.dateAdded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          onSend={handleSendNotification}
        />
      </main>
    </div>
  );
}

export default CollegeDetails;
