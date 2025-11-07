import { Mail, Globe, FileText } from 'lucide-react';

export function ResearchFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="mb-4">Moscow Cafe Research</h3>
            <p className="text-gray-400">
              A collaborative research project examining urban cafe culture and social infrastructure in Moscow's central districts.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>research@moscowcafes.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>www.moscowcafestudy.org</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4">Resources</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                <FileText className="w-4 h-4" />
                <span>Research Protocols</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                <FileText className="w-4 h-4" />
                <span>Data Access Request</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                <FileText className="w-4 h-4" />
                <span>Ethics Approval</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 Moscow Center Cafe Research Project. All rights reserved.</p>
          <p className="mt-2">Funded by the Russian Science Foundation (Grant #23-18-00245)</p>
        </div>
      </div>
    </footer>
  );
}
