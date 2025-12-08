import React, { useEffect, useState } from "react";
import api from "../lib/api"; // Using your configured API client
import { Card } from "../componets/ui/card";
import { Input } from "../componets/ui/input";
import { Button } from "../componets/ui/button";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // Fetch Data
  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query string
      const params = new URLSearchParams({
        page: page,
        limit: 12, // Show 12 cards per page
      });
      if (search) params.append("search", search);
      if (role && role !== "All") params.append("role", role);

      const response = await api.get(`/participants?${params.toString()}`);
      
      // Handle response structure based on your controller
      setParticipants(response.data.data || []);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error("Failed to fetch participants:", err);
      setError("Unable to load participants.");
    } finally {
      setLoading(false);
    }
  };

  // Refetch when page or filters change
  useEffect(() => {
    // Debounce search to prevent too many API calls
    const timeoutId = setTimeout(() => {
      fetchParticipants();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [page, search, role]);

  // Helper to generate initials
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-blue-950 tracking-tight">
            Meet the Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A diverse network of experts from neuroscience, humanities, engineering, 
            and ethics working together to accelerate research translation.
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by name..." 
              className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to page 1 on search
              }}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {["All", "PI", "Co-PI", "Researcher", "Student"].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${(role === r || (r === "All" && role === ""))
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 bg-white rounded-3xl border border-red-100">
            <p className="text-red-500 mb-2">{error}</p>
            <Button variant="outline" onClick={fetchParticipants}>Try Again</Button>
          </div>
        )}

        {/* Grid Content */}
        {!loading && !error && (
          <>
            {participants.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {participants.map((person) => (
                  <Card
                    key={person.id}
                    className="group flex flex-col items-center text-center p-6 rounded-3xl border-gray-100 bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Avatar / Initials */}
                    <div className="relative mb-6">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-blue-50 flex items-center justify-center">
                        {person.pfp ? (
                          <img 
                            src={person.pfp} 
                            alt={person.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = ""; // Trigger fallback if image fails
                            }}
                          />
                        ) : (
                          <span className="text-2xl font-bold text-blue-600 tracking-wider">
                            {getInitials(person.name)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 w-full">
                      <h3 className="font-bold text-lg text-gray-900 truncate" title={person.name}>
                        {person.name}
                      </h3>
                      
                      {person.role && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {person.role}
                        </span>
                      )}

                      <div className="pt-3 space-y-1 border-t border-gray-50 mt-3">
                        {person.affiliation && (
                          <p className="text-sm text-gray-600 font-medium truncate" title={person.affiliation}>
                            {person.affiliation}
                          </p>
                        )}
                        {person.specialty && (
                          <p className="text-xs text-gray-500 truncate" title={person.specialty}>
                            {person.specialty}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No participants found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.count > pagination.limit && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-full h-10 w-10 border-gray-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm font-medium text-gray-600">
                  Page {page} of {Math.ceil(pagination.count / pagination.limit)}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page * pagination.limit >= pagination.count}
                  className="rounded-full h-10 w-10 border-gray-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ParticipantsPage;