import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Card } from "../componets/ui/card";
import { Globe } from "lucide-react";

const OrganizationsPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await api.get("/organizations");
        setOrgs(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch organizations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrgs();
  }, []);

  if (loading) return <div className="text-center py-20">Loading partners...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-blue-950 mb-8 text-center">
          Partner Organizations
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgs.map((org) => (
            <Card key={org.org_id} className="p-6 hover:shadow-lg transition-all bg-white flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100 p-4">
                {org.logo_url ? (
                  <img src={org.logo_url} alt={org.org_name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <Globe className="w-10 h-10 text-blue-300" />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{org.org_name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{org.org_type} • {org.country}</p>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {org.org_description}
              </p>
              
              {org.website_url && (
                <a 
                  href={org.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Visit Website
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;