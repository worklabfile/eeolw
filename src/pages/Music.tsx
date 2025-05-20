
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const Music = () => {
  const albums = [
    {
      id: 1,
      title: "ТЕМНАЯ АНДЖЕЛА",
      year: "2025",
      cover: "/album1.svg",
      type: "Альбом",
      tracks: [
        { id: 1, title: "ЗАПОМНИ", duration: "2:14" },
        { id: 2, title: "ИНВЕРСИЯ (feat. gu1vazZ)", duration: "2:33" },
        { id: 3, title: "ПРОСТО", duration: "2:17" },
        { id: 4, title: "МОДЕЛЬ (feat. 3pleOpium)", duration: "2:31" }
      ]
    },
    {
      id: 2,
      title: "HANDYCAM",
      year: "2025",
      cover: "/album2.svg",
      type: "Сингл",
      tracks: [
        { id: 1, title: "HANDYCAM (feat. gu1vazZ, Lonewj)", duration: "2:19" }
      ]
    },
    {
      id: 3,
      title: "ИНСТИНКТ",
      year: "2025",
      cover: "/album3.svg",
      type: "Сингл",
      tracks: [
        { id: 1, title: "ИНСТИНКТ", duration: "1:43" }
      ]
    }
  ];

  const [selectedAlbum, setSelectedAlbum] = useState(albums[0]);

  return (
    <MainLayout>
      <div className="pt-16 bg-black noise-bg">
        <Section>
          <SectionTitle subtitle="Исследуйте музыку eeolw">
            МУЗЫКА
          </SectionTitle> 
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {albums.map((album) => (
              <button
                key={album.id}
                className={`group text-left hover-glow transition-all ${
                  selectedAlbum.id === album.id 
                    ? "ring-1 ring-white" 
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedAlbum(album)}
              >
                <div className="aspect-square bg-black mb-4">
                  <img 
                    src={album.cover} 
                    alt={`${album.title} cover`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-mono text-lg font-bold group-hover:text-white transition-colors">
                  {album.title}
                </h3>
                <p className="text-gray-400">
                  {album.type} • {album.year}
                </p>
              </button>
            ))}
          </div>
          
          <div className="bg-secondary p-6 text-left">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                <div className="aspect-square bg-black hover-glow">
                  <img 
                    src={selectedAlbum.cover} 
                    alt={`${selectedAlbum.title} cover`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="font-mono text-xl font-bold">{selectedAlbum.title}</h3>
                  <p className="text-gray-400">
                    {selectedAlbum.type} • {selectedAlbum.year}
                  </p>
                  
                  <div className="mt-4 flex space-x-3">
                    <a href="https://vk.com/artist/8853322076400198659" className="text-white hover:text-gray-300 transition-colors">VK Музыка</a>
                    <a href="https://music.yandex.ru/artist/21742277?utm_medium=copy_link" className="text-white hover:text-gray-300 transition-colors">Яндекс Музыка</a>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-mono text-lg mb-4">Трэклист</h4>
                <div className="space-y-1">
                  {selectedAlbum.tracks.map((track) => (
                    <div 
                      key={track.id} 
                      className="track-item flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{track.id}.</span>
                        <span>{track.title}</span>
                      </div>
                      <span className="text-gray-400">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
};

export default Music;
