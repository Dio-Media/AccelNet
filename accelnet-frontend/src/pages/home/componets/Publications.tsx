import { useEffect, useState } from 'react';
import { Card } from '../../../componets/ui/card';
import { Badge } from '../../../componets/ui/badge';
import { ExternalLink, Download } from 'lucide-react';
import { Button } from '../../../componets/ui/button';
import api from '../../../lib/api'; // ⬅️ adjust this path if your api.js is elsewhere

type Publication = {
  publication_id: number;
  title: string;
  publication_type: string;
  journal_name?: string | null;
  publication_date?: string | null;
  doi?: string | null;
  url?: string | null;
  abstract?: string | null;
  is_featured?: number | boolean | null;
};

export function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await api.get('/publications', {
          params: { page: 1, pageSize: 20 },
        });

        const data = res.data?.data ?? [];
        setPublications(data);
      } catch (err: any) {
        console.error('Error fetching publications', err);
        const msg =
          err?.response?.data?.message || 'Failed to load publications.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const formatYear = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '';
    return d.getFullYear().toString();
  };

  const formatJournalAndYear = (pub: Publication) => {
    const year = formatYear(pub.publication_date);
    if (pub.journal_name && year) return `${pub.journal_name} (${year})`;
    if (pub.journal_name) return pub.journal_name;
    if (year) return year;
    return '';
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Publications &amp; Outputs</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Academic publications and research outputs from the BRAIN Center and
          its collaborators.
        </p>

        {loading && (
          <p className="text-center text-gray-600">Loading publications…</p>
        )}

        {error && !loading && (
          <p className="text-center text-red-600 mb-6">{error}</p>
        )}

        {!loading && !error && (
          <div className="max-w-4xl mx-auto space-y-4">
            {publications.length === 0 && (
              <p className="text-center text-gray-500">
                No publications found.
              </p>
            )}

            {publications.map((pub) => (
              <Card
                key={pub.publication_id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="mb-2 font-medium">{pub.title}</div>

                    {formatJournalAndYear(pub) && (
                      <p className="text-gray-500 mb-2">
                        {formatJournalAndYear(pub)}
                      </p>
                    )}

                    {pub.abstract && (
                      <p className="text-gray-600 mb-3 line-clamp-3">
                        {pub.abstract}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {pub.publication_type || 'Publication'}
                      </Badge>
                      {pub.is_featured ? (
                        <Badge variant="default">Featured</Badge>
                      ) : null}
                      {pub.doi && (
                        <Badge variant="secondary">DOI: {pub.doi}</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {pub.url && (
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        aria-label="Open publication"
                      >
                        <a href={pub.url} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}

                    {/* Optional: keep download button only if you truly have a direct PDF URL somewhere */}
                    {pub.url && (
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Download (if available)"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
