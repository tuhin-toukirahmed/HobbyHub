import React from 'react';
import Marquee from 'react-fast-marquee';

// Top tech brand logos - replace with your actual brand logos or appropriate hobby brands
const brandLogos1 = [
  { id: 1, name: 'Nike', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Nike' },
  { id: 2, name: 'Adidas', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Adidas' },
  { id: 3, name: 'Under Armour', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Under+Armour' },
  { id: 4, name: 'Puma', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Puma' },
  { id: 5, name: 'New Balance', logo: 'https://placehold.co/200x80/f5f5f5/333?text=New+Balance' },
  { id: 6, name: 'Reebok', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Reebok' },
];

// More brand logos for second row
const brandLogos2 = [
  { id: 7, name: 'Canon', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Canon' },
  { id: 8, name: 'Nikon', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Nikon' },
  { id: 9, name: 'Sony', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Sony' },
  { id: 10, name: 'Fujifilm', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Fujifilm' },
  { id: 11, name: 'Leica', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Leica' },
  { id: 12, name: 'Olympus', logo: 'https://placehold.co/200x80/f5f5f5/333?text=Olympus' },
];

export function LogoCarousel() {
  return (
    <div className="space-y-5 overflow-hidden">
      <Marquee 
        gradient={true}
        gradientColor={[255, 255, 255]}
        gradientWidth={50}
        speed={30}
        pauseOnHover={true}
        direction="left"
        // className="py-4"
      >
        {brandLogos1.map((brand) => (
          <div 
            key={brand.id} 
            className="flex items-center justify-center mx-8"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-14 w-auto object-contain transition-transform hover:scale-110" 
            />
          </div>
        ))}
      </Marquee>
      
      <Marquee 
        gradient={true}
        gradientColor={[255, 255, 255]}
        gradientWidth={50}
        speed={40}
        pauseOnHover={true}
        direction="right"
        // className="py-4"
      >
        {brandLogos2.map((brand) => (
          <div 
            key={brand.id} 
            className="flex items-center justify-center mx-8"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-14 w-auto object-contain transition-transform hover:scale-110" 
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
