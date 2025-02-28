import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Import signOut for Firebase logout
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { motion } from "framer-motion"; // Import motion from framer-motion
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, getDocs } from "firebase/firestore"; // Import Firestore functions
import { PulseLoader } from "react-spinners"; // Import PulseLoader from react-spinners

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false); // State for delete operations
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch submissions from Firestore in real-time
    const q = query(collection(db, "employmentForms"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Firestore snapshot data:", snapshot.docs); // Debug: Log snapshot data
      const submissionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Processed submissions:", submissionsData); // Debug: Log processed data
      setSubmissions(submissionsData);
      setLoading(false);
      setFetchError(""); // Clear any previous errors
    }, (error) => {
      console.error("Error fetching submissions:", error.message, error.stack); // Enhanced error logging
      setFetchError("Failed to fetch submissions. Please check your connection or try again later.");
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [db]);

  const handleDeleteSubmission = async (submissionId) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      setDeleteLoading(true);
      try {
        await deleteDoc(doc(db, "employmentForms", submissionId));
        console.log("Submission deleted with ID: ", submissionId);
        setDeleteLoading(false);
      } catch (error) {
        console.error("Error deleting submission:", error.message, error.stack);
        setFetchError("Failed to delete submission. Please try again later.");
        setDeleteLoading(false);
      }
    }
  };

  const handleDeleteAllSubmissions = async () => {
    if (window.confirm("Are you sure you want to delete ALL submissions? This action cannot be undone.")) {
      setDeleteLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "employmentForms"));
        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log("All submissions deleted");
        setSubmissions([]); // Clear local state
        setDeleteLoading(false);
      } catch (error) {
        console.error("Error deleting all submissions:", error.message, error.stack);
        setFetchError("Failed to delete all submissions. Please try again later.");
        setDeleteLoading(false);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/adminlogin"); // Navigate back to the login page after successful logout
      })
      .catch((error) => {
        console.error("Logout error:", error); // Log any errors during logout
      });
  };

  return (
    <div className="min-h-screen bg-[#013220] text-white p-2 md:p-6">
      <motion.div
        className="w-full max-w-4xl mx-auto p-2 md:p-6 bg-[#001F14] rounded-2xl border border-white/10 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-green-400">
          Admin Dashboard
        </h1>

        {loading || deleteLoading ? (
          <div className="flex justify-center">
            <PulseLoader color="#00ff00" size={12} md:size={15} />
          </div>
        ) : fetchError ? (
          <p className="text-red-400 text-xs md:text-sm text-center">{fetchError}</p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center! justify-center! mb-2 md:mb-4">
              <p className="text-sm md:text-lg text-center! w-full md:w-auto mb-2 md:mb-0">
  
              </p>
              <motion.button
                onClick={handleDeleteAllSubmissions}
                className="ml-auto mt-2 md:mt-0 px-2 md:px-4 py-1 md:py-2 border-2 border-red-500! rounded-lg text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition text-xs md:text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                disabled={submissions.length === 0}
              >
                Delete All
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              {/* Desktop Table (md and up) */}
              <div className="hidden md:block">
                <table className="w-full border-collapse border border-white/20">
                  <thead>
                    <tr className="bg-[#013220] border-b border-white/20">
                      <th className="p-2 md:p-3 text-left text-green-400 border-r border-white/20">Name</th>
                      <th className="p-2 md:p-3 text-left text-green-400 border-r border-white/20">Email</th>
                      <th className="p-2 md:p-3 text-left text-green-400 border-r border-white/20">Service</th>
                      <th className="p-2 md:p-3 text-left text-green-400 border-r border-white/20">Requirements</th>
                      <th className="p-2 md:p-3 text-left text-green-400 border-r border-white/20">Timestamp</th>
                      <th className="p-2 md:p-3 text-left text-green-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length > 0 ? (
                      submissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-white/20 hover:bg-[#001F14]/50">
                          <td className="p-2 md:p-3 border-r border-white/20">{submission.name || "N/A"}</td>
                          <td className="p-2 md:p-3 border-r border-white/20">{submission.email || "N/A"}</td>
                          <td className="p-2 md:p-3 border-r border-white/20">{submission.service || "N/A"}</td>
                          <td className="p-2 md:p-3 border-r border-white/20">{submission.message || "N/A"}</td>
                          <td className="p-2 md:p-3 border-r border-white/20">
                            {submission.timestamp?.toDate().toLocaleString() || "N/A"}
                          </td>
                          <td className="p-2 md:p-3">
                            <motion.button
                              onClick={() => handleDeleteSubmission(submission.id)}
                              className="px-2 md:px-2 py-1 border-2 border-red-500! rounded-lg text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition text-xs md:text-sm"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              Delete
                            </motion.button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-2 md:p-3 text-center text-gray-400">
                          No submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout (below md, i.e., <768px) */}
              <div className="block md:hidden">
                {submissions.length > 0 ? (
                  submissions.map((submission) => (
                    <div key={submission.id} className="mb-2 p-2 bg-[#013220] rounded-lg border border-white/20 hover:bg-[#001F14]/50">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-400">Name:</span>
                          <span className="text-xs">{submission.name || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-400">Email:</span>
                          <span className="text-xs">{submission.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-400">Service:</span>
                          <span className="text-xs">{submission.service || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-green-400">Requirements:</span>
                          <span className="text-xs">{submission.message || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-400">Timestamp:</span>
                          <span className="text-xs">
                            {submission.timestamp?.toDate().toLocaleString() || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-end mt-1">
                          <motion.button
                            onClick={() => handleDeleteSubmission(submission.id)}
                            className="px-1 py-1 border-2 border-red-500 rounded-lg text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition text-xs"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-center text-gray-400 text-xs">
                    No submissions found.
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-2 md:mt-6">
              <motion.button
                onClick={handleLogout}
                className="px-2 md:px-4 py-1 md:py-2 border-2 border-white! rounded-lg text-white bg-transparent hover:bg-white hover:text-[#013220] transition text-xs md:text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;