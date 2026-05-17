const API_BASE_URL = '/api';

export async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Auth
  login: (email, password, role) => fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  }),
  signup: (userData) => fetchApi('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Users
  getUsers: () => fetchApi('/users'),
  getUser: (id) => fetchApi(`/users/${id}`),
  updateProfile: (id, data) => fetchApi(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Admin
  getAdminStats: () => fetchApi('/admin/stats'),
  getAdminClasses: () => fetchApi('/admin/classes'),
  getAdminCertificates: () => fetchApi('/admin/certificates'),
  approveCertificate: (id) => fetchApi(`/admin/certificates/${id}/approve`, {
    method: 'POST',
  }),
  updateCompanyStars: (id, stars) => fetchApi(`/admin/companies/${id}/stars`, {
    method: 'PUT',
    body: JSON.stringify({ stars }),
  }),

  // Lecturer
  getLecturerSelectedClasses: (lecturerId) => fetchApi(`/lecturer/${lecturerId}/selected-classes`),
  updateLecturerSelectedClasses: (lecturerId, classIds) => fetchApi(`/lecturer/${lecturerId}/selected-classes`, {
    method: 'POST',
    body: JSON.stringify({ classIds }),
  }),
  getLecturerAvailableClasses: (lecturerId) => fetchApi(`/lecturer/${lecturerId}/available-classes`),
  getClassStudents: (classId) => fetchApi(`/class/${classId}/students`),
  getClassGroups: (classId) => fetchApi(`/class/${classId}/groups`),
  createGroup: (data) => fetchApi('/groups', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getLecturerReports: (lecturerId) => fetchApi(`/lecturer/${lecturerId}/reports`),
  postReport: (data) => fetchApi('/reports', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Internships
  getInternships: () => fetchApi('/internships'),
  postInternship: (data) => fetchApi('/internships', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Applications
  getApplications: (companyId) => {
    const query = companyId ? `?companyId=${companyId}` : '';
    return fetchApi(`/applications${query}`);
  },
  applyForInternship: (data) => fetchApi('/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Groups & Activities
  getStudentGroup: (studentId) => fetchApi(`/student/${studentId}/group`),
  getGroupActivities: (groupId) => fetchApi(`/group/${groupId}/activities`),

  // Projects
  getStudentProjects: (studentId) => fetchApi(`/student/${studentId}/projects`),
  postProject: (data) => fetchApi('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Certificates
  getStudentCertificates: (studentId) => fetchApi(`/student/${studentId}/certificates`),

  // AI
  generateAIRoadmap: (prompt) => fetchApi('/ai/generate-roadmap', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  }),

  // Feed & Communication
  getPosts: (userId) => fetchApi(`/posts${userId ? `?userId=${userId}` : ''}`),
  createPost: (postData) => fetchApi('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
};
