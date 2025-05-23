import React from 'react';
import { LogoCarousel } from './prismui/logo-carousel';
import { Card, CardContent } from './ui/card';

const Brands = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-12"
          data-scroll
          data-scroll-speed="0.5"
        >
          <h2 
            className="text-4xl font-bold mb-4 reveal"
            data-scroll
            data-scroll-class="is-inview"
          >
            Our Trusted Partners
          </h2>
          <p 
            className="text-gray-600 max-w-2xl mx-auto reveal reveal-delay-200"
            data-scroll
            data-scroll-class="is-inview"
          >
            We collaborate with leading brands across various hobby categories to bring you the best experiences, tools, and resources for your passion.
          </p>
        </div>
          <div 
            className="max-w-6xl mx-auto overflow-hidden"
            data-scroll
            data-scroll-speed="0.3"
          >
          <Card 
            className="overflow-hidden border shadow-md reveal"
            data-scroll
            data-scroll-class="is-inview"
          >
            <CardContent className="pt-6 overflow-hidden">
              <LogoCarousel />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Brands;