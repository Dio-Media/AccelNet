import { ImageWithFallback } from '../../../componets/ImageWithFallback';

export function ResearchHero() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1672841703218-2d1ef214e59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Njb3clMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyNTMxMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Moscow cafe interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-white mb-4">
              Moscow Center Cafe Research Project
            </h1>
            <p className="text-white/90 mb-6">
              A comprehensive study of cafe culture, consumer behavior, and urban development in Moscow's central districts
            </p>
            <div className="flex gap-4 text-white/80">
              <div>
                <div className="text-white">250+</div>
                <div>Cafes Studied</div>
              </div>
              <div className="border-l border-white/30 pl-4">
                <div className="text-white">2,500+</div>
                <div>Survey Responses</div>
              </div>
              <div className="border-l border-white/30 pl-4">
                <div className="text-white">18 Months</div>
                <div>Research Period</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
