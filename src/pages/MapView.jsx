import React, { useState, useEffect, useRef } from 'react';

const MapView = () => {
  const mapRef = useRef(null);
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    distance: 5
  });
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Mock issues data
  const mockIssues = [
    {
      id: 1,
      title: 'Pothole on Main Street',
      category: 'Roads',
      status: 'Reported',
      location: { lat: 40.7128, lng: -74.0060 },
      distance: 0.5,
      reportedAt: '2025-08-01T10:30:00Z'
    },
    {
      id: 2,
      title: 'Broken Street Light',
      category: 'Lighting',
      status: 'In Progress',
      location: { lat: 40.7130, lng: -74.0055 },
      distance: 1.2,
      reportedAt: '2025-07-31T14:20:00Z'
    },
    {
      id: 3,
      title: 'Water Leak on Pine Street',
      category: 'Water Supply',
      status: 'Resolved',
      location: { lat: 40.7125, lng: -74.0065 },
      distance: 2.1,
      reportedAt: '2025-07-30T09:15:00Z'
    },
    {
      id: 4,
      title: 'Overflowing Garbage Bin',
      category: 'Cleanliness',
      status: 'Reported',
      location: { lat: 40.7135, lng: -74.0058 },
      distance: 0.8,
      reportedAt: '2025-08-02T08:45:00Z'
    }
  ];

  useEffect(() => {
    setIssues(mockIssues);
    initializeMap();
  }, []);

  const initializeMap = () => {
    // Mock map initialization
    // In a real implementation, you would use Leaflet or Google Maps
    console.log('Map initialized');
  };

  const filteredIssues = issues.filter(issue => {
    if (filters.status !== 'all' && issue.status.toLowerCase().replace(' ', '-') !== filters.status) {
      return false;
    }
    if (filters.category !== 'all' && issue.category.toLowerCase().replace(' ', '-') !== filters.category) {
      return false;
    }
    if (issue.distance > filters.distance) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported':
        return 'bg-yellow-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Map View</h1>
            <p className="mt-1 text-sm text-gray-600">
              Visualize civic issues in your area on an interactive map
            </p>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredIssues.length} of {issues.length} issues
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All</option>
              <option value="reported">Reported</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All</option>
              <option value="roads">Roads</option>
              <option value="lighting">Lighting</option>
              <option value="water-supply">Water Supply</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="public-safety">Public Safety</option>
              <option value="obstructions">Obstructions</option>
            </select>
          </div>

          {/* Distance Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Distance:</label>
            <select
              value={filters.distance}
              onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
              className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={1}>1 km</option>
              <option value={3}>3 km</option>
              <option value={5}>5 km</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => setFilters({ status: 'all', category: 'all', distance: 5 })}
            className="text-sm text-primary-600 hover:text-primary-500 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Issues List */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Issues List</h2>
            <div className="space-y-3">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedIssue?.id === issue.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(issue.category)}</span>
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {issue.title}
                      </h3>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(issue.status)}`}></div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <span>{issue.category}</span>
                    <span>{issue.distance}km away</span>
                    <span>{new Date(issue.reportedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      issue.status === 'Reported' ? 'bg-yellow-100 text-yellow-800' :
                      issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Mock Map */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-4">
                In a full implementation, this would show an interactive map with issue markers
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(issue.status)}`}></div>
                      <div className="text-lg">{getCategoryIcon(issue.category)}</div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                      {issue.title}
                    </h4>
                    <p className="text-xs text-gray-500">{issue.distance}km away</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-2">
              <button className="block w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="block w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Current Location Button */}
          <div className="absolute bottom-4 right-4">
            <button className="bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Issue Detail Popup */}
      {selectedIssue && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getCategoryIcon(selectedIssue.category)}</span>
              <h3 className="text-sm font-medium text-gray-900">
                {selectedIssue.title}
              </h3>
            </div>
            <button
              onClick={() => setSelectedIssue(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                selectedIssue.status === 'Reported' ? 'bg-yellow-100 text-yellow-800' :
                selectedIssue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {selectedIssue.status}
              </span>
              <span>{selectedIssue.category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{selectedIssue.distance}km away</span>
              <span>{new Date(selectedIssue.reportedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => window.location.href = `/issue/${selectedIssue.id}`}
              className="flex-1 bg-primary-600 text-white text-sm font-medium py-2 px-3 rounded hover:bg-primary-700"
            >
              View Details
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded hover:bg-gray-200">
              Get Directions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
