import { Card } from '../../../componets/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../componets/ui/tabs';

export function ResearchMethodology() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2  className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-4">Join Us</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Ever thought of contributing to groundbreaking research in movement, music, and brain health?
          We're always looking for passionate individuals to join our team. Whether you're a researcher, artist, or enthusiast,
          there's a place for you in our community. Explore our current opportunities and find out how you can get involved!
        <img
        src="/QRCodeforAnalysisofAccelNet(WEBSITE)1.png"
        alt="Join Us QR Code"
        className="mx-auto w-96 h-96"
        />
        </p>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">QR Code is not working properly? Please try the link below
        <a
          href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=vboLF_CikEytSw6PDwxCWZXdNLLzg6xEqEIhtxz_Bu9URFE5SVRUTVJaSUk2MUNLUEtRRTRMMU45WS4u&route=shorturl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-blue-600 underline mb-12 max-w-2xl mx-auto block"
        >
          Analysis of AccelNet (WEBSITE)
        </a>
        </p>
      </div>
    </section>
  );
}