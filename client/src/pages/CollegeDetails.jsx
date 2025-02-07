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
} from "lucide-react";
import { api } from "../api/mockData";

const NotificationModal = ({ isOpen, onClose, onSend }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const textareaRef = useRef(null);

  const emojis = ["😀", "😊", "👍", "❤️", "🎉", "✨", "🌟", "💡", "📝", "✅"];

  if (!isOpen) return null;

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };

  const modalClasses = `
    fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
    ${isMinimized ? "items-end" : ""}
  `;

  const contentClasses = `
    bg-notificationPopBg rounded-lg overflow-hidden transition-all duration-200 
    ${isMaximized ? "w-full h-full rounded-xl" : "w-[600px] rounded-xl"}
    ${isMinimized ? "w-[300px] h-auto mb-4 mx-4 rounded-xl" : "rounded-xl"}
  `;

  const wrapSelectedText = (prefix, suffix = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    const beforeText = description.substring(0, start);
    const afterText = description.substring(end);

    const newText = `${beforeText}${prefix}${selectedText}${suffix}${afterText}`;
    setDescription(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleBoldClick = () => {
    setIsBold(!isBold);
    wrapSelectedText("**");
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
    wrapSelectedText("_");
  };

  const handleEmojiClick = (emoji) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBefore = description.substring(0, cursorPos);
    const textAfter = description.substring(cursorPos);

    setDescription(`${textBefore}${emoji}${textAfter}`);
    setShowEmojiPicker(false);

    // Move cursor after emoji
    setTimeout(() => {
      textarea.focus();
      const newPosition = cursorPos + emoji.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleImageInsert = () => {
    if (imageUrl) {
      const imageMarkdown = `![image](${imageUrl})`;
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;
      const textBefore = description.substring(0, cursorPos);
      const textAfter = description.substring(cursorPos);

      setDescription(`${textBefore}${imageMarkdown}${textAfter}`);
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  const handleListClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const selectedText = description.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    let newText;
    if (selectedText.includes("\n")) {
      // Multi-line selection
      newText = selectedText
        .split("\n")
        .map((line) => (line.trim() ? `- ${line}` : line))
        .join("\n");
    } else {
      // Single line
      newText = `- ${selectedText}`;
    }

    const beforeText = description.substring(0, start);
    const afterText = description.substring(textarea.selectionEnd);
    setDescription(`${beforeText}${newText}${afterText}`);
  };

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className="flex items-center justify-between bg-[#4361ee] p-4 text-white rounded-xl">
          <h2 className="text-2xl font-semibold font-Montserrat">
            New Message
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="hover:bg-blue-600 p-1 rounded"
            >
              <span className="text-2xl">−</span>
            </button>
            <button
              onClick={handleMaximize}
              className="hover:bg-blue-600 p-1 rounded text-xl"
            >
              □
            </button>
            <button onClick={onClose} className="hover:bg-blue-600 p-1 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="p-6">
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-popTextCol w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <textarea
                ref={textareaRef}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`text-popTextCol w-full p-3 mb-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 ${
                  isMaximized ? "h-[calc(100vh-300px)]" : "h-32"
                }`}
              />

              {showEmojiPicker && (
                <div className="absolute bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleEmojiClick(emoji)}
                        className="hover:bg-gray-100 p-2 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showImageInput && (
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleImageInsert}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Insert
                  </button>
                </div>
              )}
            </div>

            <div className="bg-myBlue border-t border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBoldClick}
                  className={`p-2  rounded ${isBold ? "" : ""}`}
                >
                  <Bold className="h-5 w-5 text-white hover:text-black" />
                </button>
                <button
                  onClick={handleItalicClick}
                  className={`p-2  rounded ${
                    isItalic ? "bg-notificationPopBg" : ""
                  }`}
                >
                  <Italic className="h-5 w-5 text-white hover:text-black" />
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2  rounded"
                >
                  <Smile className="h-5 w-5 text-white hover:text-black" />
                </button>
                <button
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="p-2 rounded"
                >
                  <Image className="h-5 w-5 text-white hover:text-black" />
                </button>
                <button onClick={handleListClick} className="p-2 rounded">
                  <List className="h-5 w-5 text-white hover:text-black" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSend(subject, description);
                    setSubject("");
                    setDescription("");
                  }}
                  className="px-4 py-2 bg-[#4361ee] text-white rounded hover:bg-blue-600"
                >
                  Send
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Save
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
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
