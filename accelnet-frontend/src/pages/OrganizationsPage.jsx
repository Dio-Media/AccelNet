import React, { useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import { Card } from "../componets/ui/card";
import { Input } from "../componets/ui/input";
import { Badge } from "../componets/ui/badge";

const OrganizationsPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchOrgs = async () => {
      setLoading(true);
      try {
        const response = await api.get("/organizations", {
          params: {
            search: search || undefined,
            org_type: type || undefined,
            page: 1,
            limit: 200,
          },
        });
        if (!cancelled) setOrgs(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch organizations", error);
        if (!cancelled) setOrgs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // small debounce so typing doesn't spam
    const t = setTimeout(fetchOrgs, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [search, type]);

  const typeOptions = useMemo(() => {
    const set = new Set(orgs.map((o) => o.org_type).filter(Boolean));
    return Array.from(set).sort();
  }, [orgs]);

  if (loading) return <div className="text-center py-20">Loading partners...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-blue-950 mb-8 text-center">
          Partner Organizations
        </h1>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organizations…"
              className="bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setType("")}
              className={`px-3 py-1.5 rounded-md text-sm border bg-white ${
                type === "" ? "border-blue-600 text-blue-700" : "border-gray-200 text-gray-700"
              }`}
            >
              All
            </button>

            {typeOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-md text-sm border bg-white ${
                  type === t ? "border-blue-600 text-blue-700" : "border-gray-200 text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgs.map((org) => (
            <Card
              key={org.org_id}
              className="p-6 hover:shadow-lg transition-all bg-white flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-gray-900 leading-snug">
                  {org.org_name}
                </h3>
                <Badge variant="secondary" className="shrink-0">
                  {org.org_type || "unknown"}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                {Number(org.participant_count || 0)} participant{Number(org.participant_count || 0) === 1 ? "" : "s"}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Org ID:</span> {org.org_id}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;