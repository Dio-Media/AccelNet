import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Card } from "../componets/ui/card";
import { Badge } from "../componets/ui/badge";
import { Calendar, DollarSign } from "lucide-react";

const GrantsPage = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const response = await api.get("/grants");
        setGrants(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch grants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrants();
  }, []);

  if (loading) return <div className="text-center py-20">Loading funding opportunities...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-950 mb-8 text-center">
          Funding Opportunities
        </h1>

        <div className="grid gap-6">
          {grants.map((grant) => (
            <Card key={grant.grant_id} className="p-6 hover:shadow-md transition-shadow bg-white border-l-4 border-l-blue-600">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{grant.title}</h3>
                  <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {grant.grant_type}
                  </Badge>
                </div>
                {grant.funding_amount && (
                  <div className="flex items-center text-green-700 font-semibold mt-2 md:mt-0 bg-green-50 px-3 py-1 rounded-full">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {Number(grant.funding_amount).toLocaleString()}
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {grant.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 border-t pt-4">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Application Deadline:</span>
                <span className="ml-2">
                  {new Date(grant.application_deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrantsPage;