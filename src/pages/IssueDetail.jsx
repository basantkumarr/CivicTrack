import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // Mock API call to fetch issue details
    const mockIssue = {
      id: parseInt(id),
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues and potential damage to vehicles. The hole is approximately 2 feet wide and 6 inches deep. Water collects in it during rain, making it even more dangerous.',
      category: 'Roads',
      status: 'In Progress',
      location: 'Main Street, Downtown',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
      reportedAt: '2025-08-01T10:30:00Z',
      reportedBy: 'Anonymous',
      photos: [
        'https://via.placeholder.com/800x600',
        'https://via.placeholder.com/800x600',
        'https://via.placeholder.com/800x600'
      ],
      distance: 0.5,
      statusHistory: [
        {
          status: 'Reported',
          timestamp: '2025-08-01T10:30:00Z',
          note: 'Issue reported by citizen',
          updatedBy: 'System'
        },
        {
          status: 'Acknowledged',
          timestamp: '2025-08-01T14:20:00Z',
          note: 'Issue has been acknowledged by city maintenance team',
          updatedBy: 'City Maintenance'
        },
        {
          status: 'In Progress',
          timestamp: '2025-08-02T09:15:00Z',
          note: 'Repair crew has been assigned. Work expected to begin within 48 hours.',
          updatedBy: 'Maintenance Supervisor'
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Sarah Johnson',
          content: 'I drive by this every day. It\'s getting worse and I\'ve seen several cars get damaged.',
          timestamp: '2025-08-01T16:45:00Z',
          isOfficial: false
        },
        {
          id: 2,
          author: 'City Maintenance Team',
          content: 'Thank you for reporting this issue. We have scheduled repairs for this week.',
          timestamp: '2025-08-02T10:30:00Z',
          isOfficial: true
        }
      ]
    };

    setTimeout(() => {
      setIssue(mockIssue);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const comment = {
      id: issue.comments.length + 1,
      author: 'John Doe', // Current user
      content: newComment,
      timestamp: new Date().toISOString(),
      isOfficial: false
    };

    setIssue(prev => ({
      ...prev,
      comments: [...prev.comments, comment]
    }));

    setNewComment('');
    setIsSubmittingComment(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported':
        return 'bg-yellow-100 text-yellow-800';
      case 'Acknowledged':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Roads': '🛣️',
      'Lighting': '💡',
      'Water Supply': '💧',
      'Cleanliness': '🗑️',
      'Public Safety': '⚠️',
      'Obstructions': '🚧',
    };
    return icons[category] || '📍';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Issue not found</h2>
        <p className="mt-2 text-gray-600">The issue you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{getCategoryIcon(issue.category)}</span>
                <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {issue.location}
                </span>
                <span className="flex items-center">
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(issue.reportedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {issue.reportedBy}
                </span>
                <span className="flex items-center">
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {issue.distance}km away
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                {issue.status}
              </span>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{issue.description}</p>
          </div>

          {/* Photos */}
          {issue.photos && issue.photos.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {issue.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Issue photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => window.open(photo, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
            <div className="space-y-4">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${comment.isOfficial ? 'text-primary-600' : 'text-gray-900'}`}>
                        {comment.author}
                      </span>
                      {comment.isOfficial && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                          Official
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Add a comment
              </label>
              <textarea
                id="comment"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Share additional information or updates..."
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmittingComment}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingComment ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Posting...
                    </>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status Timeline</h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {issue.statusHistory.map((status, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== issue.statusHistory.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(status.status)} border-2 border-white`}>
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{status.status}</p>
                            <p className="text-xs text-gray-500">{status.updatedBy}</p>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-gray-700">{status.note}</p>
                          </div>
                          <div className="mt-1">
                            <time className="text-xs text-gray-500">
                              {new Date(status.timestamp).toLocaleString()}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Issue Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Issue
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                Report Issue
              </button>
            </div>
          </div>

          {/* Similar Issues */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Similar Issues Nearby</h2>
            <div className="space-y-3">
              <div className="text-sm">
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  Street light flickering on Oak St
                </a>
                <p className="text-gray-500">0.3km away • Reported 2 days ago</p>
              </div>
              <div className="text-sm">
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  Road repair needed on Elm St
                </a>
                <p className="text-gray-500">0.7km away • In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
