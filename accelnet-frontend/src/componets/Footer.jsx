const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <h4 className="text-lg font-bold mb-4">About AccelNet</h4>
            <p className="text-blue-200">
              Accelerating research networks for brain-inspired computing and
              brain health.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#" className="hover:text-white transition">
                  Working Groups
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Publications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Connect */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <p className="text-blue-200">
              Join our global network of researchers and innovators.
            </p>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-300">
          <p>&copy; 2025 AccelNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;