import { ImageWithFallback } from '../../../componets/ImageWithFallback';

export function ResearchHero() {
  return (
    <div className="relative h-13 overflow-hidden">
      <ImageWithFallback
        src="/backgroundacn.jpg"
        alt="Moscow cafe interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-white mb-4">
              Advancing Brain-Inspired Computing
            </h1>
            <p className="text-white/90 mb-6">
              A collaborative network accelerating research in neuroscience, artificial intelligence, 
              and brain-computer interfaces to improve brain health through art and science.
            </p>
            <div className="flex gap-4 text-white/80">
              <div>
                <div className="text-white">50+</div>
                <div>Researches across the globe</div>
              </div>
              <div className="border-l border-white/30 pl-4">
                <div className="text-white">35+</div>
                <div>Skilled professonals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
